from flask import Flask,redirect,url_for,render_template
from a_database import db
from flask_security import  Security,hash_password
from Application.security import user_datastore as data
from a_config import DevelopmentConfig
from flask_restful import Api
from Application.a_resources import *
from Application.auth_api import *
from flask_cors import CORS


from werkzeug.security import generate_password_hash

def create_app():
    app = Flask(__name__,template_folder='template',static_folder='template/static')
    app.config.from_object(DevelopmentConfig)
    api = Api(app,prefix = '/api')
    db.init_app(app)
    app.security = Security(app, data)
    with app.app_context():
        db.create_all()
        data.find_or_create_role(id = 1, name='admin', description='User is a librarian')
        data.find_or_create_role(id = 2, name='user', description='User is a user')
        db.session.commit()
        if not data.find_user(email = "admin@gmail.com"):
            data.create_user(username = 'admin', email = "admin@gmail.com", password = hash_password("admin"), roles = ["admin"])
        if not data.find_user(email = "user1@gmail.com"):
            data.create_user(username = 'user1',email = "user1@gmail.com", password = hash_password("user1"), roles = ["user"])

        db.session.commit()
    return app, api

app, api = create_app()
CORS(app, resources={r"/*": {"origins": "*"}})


@app.get('/')
def home():
    return(render_template("index.html"))


api.add_resource(SectionResource, '/section','/section/<int:id>' )
api.add_resource(AllSections, '/sections')
api.add_resource(AllBooks, '/books')
api.add_resource(BookResource, '/book','/book/<int:id>')
api.add_resource(feedbackResource, '/feedback')
api.add_resource(Books_Section,'/book-section')
api.add_resource(UncategorisedBooks, '/uncategorised-books')

# api.add_resource(IssueResource, '/user-issued-books', '/user-issued-books/<int:issue_id>')
api.add_resource(BookIssueRequest, '/issue-book/<int:book_id>')
api.add_resource(BookIssueApprove,'/approve-issue/<int:issue_id>')

api.add_resource(ShowIssuedBooks, '/show-issued-books')
api.add_resource(ShowPendingIssueRequest, '/show-pending-issue-request')

api.add_resource(AllUsers, '/users')   

api.add_resource(UserViewSections, '/user-sections')
api.add_resource(UserViewBooks, '/user-books')
api.add_resource(UserIssuedBooks, '/user-issued-books')
api.add_resource(UserRequests,'/user-requests')

# User Authentication Resources
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogout, '/logout')
api.add_resource(UserRegister, '/register')

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)