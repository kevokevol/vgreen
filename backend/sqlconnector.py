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

        sql = ("UPDATE roketto_dan.powercenters SET production ="+str(pwr)+" WHERE id = 0;")

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



    
    #for x in myresult:
    #    print(x)
    #
    #cnx.close()
