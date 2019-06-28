from sqlconnector import DB_Connector

# connect to DB
con = DB_Connector("root", "ca$hm0ney", "roketto-dan.c0k9vwwy6vyu.us-west-1.rds.amazonaws.com", "roketto_dan")
#rows = con.getPercentRenew("andrew's solar panel")
#for x in rows:
#    print(x)

# print size of table
# pow_rows = con.getTable("powercenters")
# print(len(pow_rows))

# test SP_updateProd
# con.SP_updateProd(10)

# test insertRelatioN()
con.insertRelation(10, 5, 9)
relations = con.queryRelation()

for row in relations:
    print(row)


#  con.SP_updateProd(20)

# query rows
rows = con.getTableInState("powercenters", "HI")

# print rows
for dc in rows:
    print(dc)


