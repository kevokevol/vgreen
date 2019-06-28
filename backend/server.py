from flask import Flask, g
from flask_cors import CORS
import json

import time
from sqlconnector import DB_Connector
import preprocess

app = Flask(__name__)
CORS(app)

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'mysql_db'):
        g.mysql_db = DB_Connector("root", "ca$hm0ney", "roketto-dan.c0k9vwwy6vyu.us-west-1.rds.amazonaws.com", "roketto_dan")
    return g.mysql_db

@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'mysql_db'):
        g.mysql_db.close_connection()

@app.route("/")
def hello():
    db_con = get_db()
    renewable = preprocess.get_renewable_output(db_con)
    power = preprocess.get_total_power(db_con)
    total_emission, rows = preprocess.get_each_emission(db_con)

    data = {}
    data['power'] = power + int(time.perf_counter()) % 40
    data['renewable'] = renewable
    data['emissions'] = total_emission
    data['data_centers'] = rows
    
    return json.dumps(data)

if __name__ == '__main__':
    con = DB_Connector("root", "ca$hm0ney", "roketto-dan.c0k9vwwy6vyu.us-west-1.rds.amazonaws.com", "roketto_dan")
    app.run('0.0.0.0')