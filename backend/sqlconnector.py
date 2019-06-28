import os
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
    def SP_updateProd(self,pwr):
        """
        updates our solar panel production
        """

        sql = ("UPDATE roketto_dan.powercenters SET power_generation ="+str(pwr)+" WHERE id = 9999;")

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
    def getProduction(self,name):
        """
        returns the power production for a given power center(int)
        """
        word = "\"" +name+ "\""
        sql = ("SELECT production FROM roketto_dan.powercenters WHERE name = "+word+";")
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


    
    #for x in myresult:
    #    print(x)
    #
    #cnx.close()


if __name__ == "__main__":
    conn = DB_Connector("root", "ca$hm0ney", "roketto-dan.c0k9vwwy6vyu.us-west-1.rds.amazonaws.com", "roketto_dan")
    path = os.path.abspath(os.path.join(os.pardir, os.getcwd(), "../out/power_centers.json"))
    print(path)
    conn.populate_power_plant_table("powercenters", path)
