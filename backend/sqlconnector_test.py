from sqlconnector import DB_Connector

# connect to DB
con = DB_Connector("root", "ca$hm0ney", "roketto-dan.c0k9vwwy6vyu.us-west-1.rds.amazonaws.com", "roketto_dan")
rows = con.getPercentRenew("andrew's solar panel")
for x in rows:
    print(x)
#  con.SP_updateProd(20)

# # query rows
# rows = con.getTable("datacenters")

# # print rows
# for dc in rows:
#     print(dc)


