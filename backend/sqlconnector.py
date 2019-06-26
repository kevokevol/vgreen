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
        sql = ("SELECT * FROM "+ table)
    
        self.mycursor.execute(sql)
        myresult = self.mycursor.fetchall()
   
        return myresult
    
    #for x in myresult:
    #    print(x)
    #
    #cnx.close()
