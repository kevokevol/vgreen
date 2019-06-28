import os
import math
import json
import mysql.connector

class DB_Connector:

    def __init__(self, usr, pwd, url, db):
        """
        constructor to connect to a databse
        """

        # connect to the database
        config = {
                "user": usr,
                "password": pwd,
                "host": url,
                "database": db,
                "raise_on_warnings": True
                }
        
        self.cnx = mysql.connector.connect(**config)
        
        # intialize cursor
        self.mycursor = self.cnx.cursor()

    def getTable(self, table):
        """
        returns all rows to the specified table(tupule)
        """

        # SQL query
        sql = ("SELECT * FROM "+ table+";")
    
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchall()
   
        return myresult
    
    def getTableInState(self, table, state):
        """
        returns all rows matching state (two letter code) to the specified table
        """

        # SQL query
        sql = ("SELECT * FROM "+ table +" WHERE state=\""+state+"\";")
    
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchall()
   
        return myresult

    def SP_updateProd(self,pwr):
        """
        updates our solar panel production (id=9999)
        """

        sql = ("UPDATE roketto_dan.powercenters SET power_generation ="+str(pwr*1000)+" WHERE id = 9999;")

        self.mycursor.execute(sql)
        self.cnx.commit()

    def getLatLongData(self,cityName):
        """
        returns the latitude and longitude of a given data center(tupule)
        """

        word = "\"" + cityName + "\""
        sql = ("SELECT latitude,longitude FROM roketto_dan.datacenters WHERE name ="+word+";")
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchall()

        return myresult

    def getLatLongPower(self,name):
        """
        returns the latitude and longitude of a given power center(tupule)
        """

        word = "\"" + name + "\""
        sql = ("SELECT latitude,longitude FROM roketto_dan.powercenters WHERE name ="+word+";")
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchall()

        return myresult

    def getConsumption(self,name):
        """
        returns the power consumption for a given data center(int)
        """
        word = "\"" +name+ "\""
        sql = ("SELECT consumption FROM roketto_dan.datacenters WHERE name = "+word+";")
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchone()

        return myresult 
    def getProduction(self,id):
        """
        returns the power production for a given power center(int)
        """
        word = "\"" +str(id)+ "\""
        sql = ("SELECT power_generation FROM roketto_dan.powercenters WHERE id = "+word+";")
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchone()

        return myresult

    def getTotalConsumption(self):
        sql = ("select sum(consumption) from roketto_dan.datacenters;")
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchone()

        return myresult

    def getPercentRenew(self,name):
        """
        returns the percent renewable for a given power center(int)
        """
        word = "\"" +name+ "\""
        sql = ("SELECT percent_renewable FROM roketto_dan.powercenters WHERE name = "+word+";")
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchone()

        return myresult

    def insertRelation(self, datacenter_id, powercenter_id, c_footprint):
        """
        insert a <datacenter, powercenter> pair with an assoicated carbon footprint
        """
        sql = ("INSERT INTO roketto_dan.pairings (datacenter_id, powercenter_id, c_footprint)"
                "VALUES (" + str(datacenter_id) + ", " + str(powercenter_id) + ", " + str(c_footprint) + ")")

        self.mycursor.execute(sql)
        self.cnx.commit()

    def queryRelation(self):
        """
        return a <datacenter, powercenter> pair with an assoicated carbon footprint
        """
        sql = ("SELECT * FROM roketto_dan.pairings")

        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchall()

        return myresult


    def populate_power_plant_table(self, table_name, path_to_power_plant_data):
        with open(path_to_power_plant_data, 'r') as f:
            power_plants = json.load(f)

            for index, plant in enumerate(power_plants):
                state = str(plant["state"])
                latitude = float(plant["lat"])
                longitude = float(plant["lng"])
                power_generation = float(plant["power_generation"])
                carbon_emission = float(plant["carbon_emission"])

                query = "INSERT INTO roketto_dan.{} VALUES({},\"{}\",{},{},{},{})".format(table_name, index, state, latitude, longitude, power_generation, carbon_emission)
                print(query)
                self.mycursor.execute(query)

            self.cnx.commit()


    @staticmethod
    def _euclidean_distance(lat1, lng1, lat2, lng2):
        return math.sqrt((lat1 - lat2)**2 + (lng1 - lng2)**2)

    def populate_relations_table(self, rel_table_name, datacenter_table_name, plant_table_name):
        data_centers = self.getTable(datacenter_table_name)
        power_centers = self.getTable(plant_table_name)
        for data_center in data_centers:
            data_lat = data_center[2]
            data_lng = data_center[3]

            power_lat = power_centers[0][2]
            power_lng = power_centers[0][3]
            min_distance = self._euclidean_distance(data_lat, data_lng, power_lat, power_lng)
            associated_power_plant = power_centers[0]
            for power_center in power_centers:
                data_lat = data_center[2]
                data_lng = data_center[3]

                power_lat = power_center[2]
                power_lng = power_center[3]
                pot_min_distance = self._euclidean_distance(data_lat, data_lng, power_lat, power_lng)

                if pot_min_distance < min_distance:
                    min_distance = pot_min_distance
                    associated_power_plant = power_center

            footprint = associated_power_plant[5]/associated_power_plant[4]
            print("Footprint " + footprint)
            query = "INSERT INTO roketto_dan.{} VALUES({},{},{})".format(rel_table_name, data_center[0], associated_power_plant[0], footprint)
            print(query)
            self.mycursor.execute(query)

        self.cnx.commit()



if __name__ == "__main__":
    conn = DB_Connector("root", "ca$hm0ney", "roketto-dan.c0k9vwwy6vyu.us-west-1.rds.amazonaws.com", "roketto_dan")
    # path = os.path.abspath(os.path.join(os.pardir, os.getcwd(), "../out/power_centers.json"))
    # print(path)
    # conn.populate_power_plant_table("powercenters", path)

    conn.populate_relations_table("pairings", "datacenters", "powercenters")
