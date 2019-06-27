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
        returns all rows to the specified table
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

        sql = ("UPDATE roketto_dan.powercenters SET production ="+str(pwr)+" WHERE id = 0;")

        self.mycursor.execute(sql)
        self.cnx.commit()

    def populate_power_plant_table(self, table_name, path_to_power_plant_data):
        with open(path_to_power_plant_data, 'r') as f:
            power_plants = json.load(f)

            for index, plant in enumerate(power_plants):
                state = str(plant["state"])
                latitude = float(plant["lat"])
                longitude = float(plant["lng"])
                power_generation = float(plant["power_generation"])
                carbon_emission = float(plant["carbon_emission"])

                query = "INSERT INTO roketto_dan.{} VALUES({},{},{},{},{},{})".format(table_name, index, state. latitude, longitude, power_generation, carbon_emission)
                print(query)
                self.mycursor.execute(sql)

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
