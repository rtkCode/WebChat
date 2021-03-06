from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from chatapp.config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.jinja_env.auto_reload = True 
db = SQLAlchemy(app)

# create database
from chatapp import routes, models
# db.create_all()
