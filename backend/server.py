from flask import Flask
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run('0.0.0.0')