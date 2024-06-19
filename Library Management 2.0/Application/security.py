from flask_security import SQLAlchemyUserDatastore
from a_database import db
from Application.a_models import Users, Roles


user_datastore = SQLAlchemyUserDatastore(db, Users, Roles)