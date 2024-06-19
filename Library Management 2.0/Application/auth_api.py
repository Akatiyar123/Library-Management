from Application.a_models import Users, Roles
from a_database import db
from Application.security import user_datastore as datastore
from werkzeug.security import check_password_hash    


from flask import make_response, jsonify, request
from flask_restful import Resource
from flask_security import auth_token_required, roles_required, utils, hash_password,login_required

class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        if not email:
            return make_response(jsonify({"message":"Email is required"}),400)
        user = datastore.find_user(email=email)
        if not user:
            return make_response(jsonify({"message":"User not found"}),404)
        if utils.verify_password(data.get('password'),user.password):
            roles = [role.name for role in user.roles]
            utils.login_user(user)
            response = {
                "message":"User logged in successfully",
                "user":{
                    "username":user.username,  
                    "email":user.email,
                    "roles":roles,
                    "token":user.get_auth_token(),
                }
            }
            # Need to work on this
            return make_response(jsonify(response),200)
        else:
            return make_response(jsonify({"message":"Invalid Credentials"}),400)
        

class UserLogout(Resource):
    @auth_token_required
    def post(self):
        utils.logout_user()
        return make_response(jsonify({"message":"User logged out successfully"}),200)
    
class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')

        if not email or not username:
            return make_response(jsonify({"message":"username and email is required"}),400)
        
        user = Users.query.filter_by(email=email).first() or Users.query.filter_by(username=username).first()

        if user:
            return make_response(jsonify({"message":"User already exists"}),400)
        
        try:
            user_role = datastore.find_role("user")
            user = datastore.create_user(username=username,email=email,password=hash_password(data.get('password')),roles=[user_role])
            db.session.commit()
            response = {
                "message":"User created successfully",
                "user":{
                    "username":user.username,
                    "email":user.email,
                    "roles":[role.name for role in user.roles],
                    "token":user.get_auth_token(),
                }
            }
            return make_response(jsonify(response),200)
        except Exception as e:
            return make_response(jsonify({"message":str(e)}),500)