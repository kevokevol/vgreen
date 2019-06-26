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

    
    #for x in myresult:
    #    print(x)
    #
    #cnx.close()
