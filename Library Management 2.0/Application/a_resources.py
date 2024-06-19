from flask_restful import Resource, reqparse, marshal_with, fields
from a_database import db
from flask import make_response, jsonify
from Application.marshals import *
from .a_models import *
from flask_security import auth_token_required, current_user, roles_required
from datetime import datetime, timedelta

class AllSections(Resource):
    @marshal_with(section_fields)
    def get(self):
        try:
            sections = Section.query.all()
            if sections:
                return sections
            return make_response(jsonify({"message": "No sections found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)
        
class UncategorisedBooks(Resource):
    @marshal_with(book_fields)
    def get(self):
        try:
            books = Books.query.filter(Books.sections == None).all()
            if books:
                return books
            return make_response(jsonify({"message": "No books found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)

class AllBooks(Resource):
    @marshal_with(book_fields)
    def get(self):
        try:
            books = Books.query.all()
            if books:
                return books
            return make_response(jsonify({"message": "No books found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)

class SectionResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('section_name', type=str, required=True)
        self.parser.add_argument('section_description', type=str, required=False)
    
    @marshal_with(section_fields)
    def get(self,id):
        try:
            section =  Section.query.filter_by(id=id).first()
            if section:
                return section
            return make_response(jsonify({"message": "Section not found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)

    @auth_token_required
    @roles_required('admin')
    def post(self):
        try: 
            args = self.parser.parse_args()
            if Section.query.filter_by(section_name=args['section_name']).first():
                return make_response(jsonify({"message":"Section already exists"}),400)
            section = Section(**args)
            db.session.add(section)
            db.session.commit()
            return make_response(jsonify({"message":"Section added successfully! Add books Now :)"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)
        
    @auth_token_required
    @roles_required('admin')
    def put(self,id):
        try:
            args = self.parser.parse_args()
            section = Section.query.filter_by(id=id).first()
            section.section_name = args['section_name']
            section.section_description = args['section_description']
            db.session.commit()
            return make_response(jsonify({"message":"Section updated successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)
        
    @auth_token_required
    @roles_required('admin')
    def delete(self,id):
        try:
            section = Section.query.filter_by(id=id).first()
            if not section:
                return make_response(jsonify({"message":"Section not found"}),404)
            db.session.delete(section)
            db.session.commit()
            return make_response(jsonify({"message":"Section deleted successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)


class BookResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('book_name', type=str, required=True)
        self.parser.add_argument('book_content', type=str, required=False)
        self.parser.add_argument('book_authors', type=str, required=True)
    
    @marshal_with(book_fields)
    def get(self,id):
        try:
            book =  Books.query.filter_by(id=id).first()
            if book:
                return book
            return make_response(jsonify({"message": "Book not found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)

    @auth_token_required
    @roles_required('admin')
    def post(self):
        try: 
            args = self.parser.parse_args()
            if Books.query.filter_by(book_name=args['book_name']).first():
                return make_response(jsonify({"message":"Book already exists"}),400)
            book = Books(**args)
            db.session.add(book)
            db.session.commit()
            return make_response(jsonify({"message":"Book added successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)
        
    @auth_token_required
    @roles_required('admin')
    def put(self,id):
        try:
            args = self.parser.parse_args()
            book = Books.query.filter_by(id=id).first()
            book.book_name = args['book_name']
            book.book_content = args['book_content']
            book.book_authors = args['book_authors']
            db.session.commit()
            return make_response(jsonify({"message":"Book updated successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)
        
    @auth_token_required
    @roles_required('admin')
    def delete(self,id):
        try:
            book = Books.query.filter_by(id=id).first()
            if not book:
                return make_response(jsonify({"message":"Book not found"}),404)
            db.session.delete(book)
            db.session.commit()
            return make_response(jsonify({"message":"Book deleted successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)
        

class feedbackResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('feedback', type=str, required=True)
        self.parser.add_argument('ratings', type=int, required=True)
        # self.parser.add_argument('user_id', type=int, required=True)
        self.parser.add_argument('book_id', type=int, required=True)

    @auth_token_required
    def post(self):
        try: 
            args = self.parser.parse_args()
            if Feedback.query.filter_by(user_id=current_user.id,book_id=args['book_id']).first():
                return make_response(jsonify({"message":"Feedback already provided for this particular book"}),400)
            feedback = Feedback(**args,user = current_user)
            db.session.add(feedback)
            db.session.commit()
            return make_response(jsonify({"message":"Feedback added successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)
        
class Books_Section(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('section_id', type=str, required=True)
        self.parser.add_argument('book_id', type=str, required=False)

    @auth_token_required
    @roles_required('admin')
    def post(self):
        try: 
            args = self.parser.parse_args()
            if Sectionbooks.query.filter_by(section_id=args['section_id'],book_id=args['book_id']).first():
                return make_response(jsonify({"message":"Book already added to this section"}),400)
            sectionbook = Sectionbooks(**args)
            db.session.add(sectionbook)
            db.session.commit()
            return make_response(jsonify({"message":"Book added to section successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)                
    
    @auth_token_required
    @roles_required('admin')
    def delete(self):
        try:
            args = self.parser.parse_args()
            sectionbook = Sectionbooks.query.filter_by(section_id=args['section_id'],book_id=args['book_id']).first()
            if not sectionbook:
                return make_response(jsonify({"message":"Book not found in the section"}),404)
            db.session.delete(sectionbook)
            db.session.commit()
            return make_response(jsonify({"message":"Book deleted from section successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)


class IssueResource(Resource):
    @auth_token_required
    @roles_required('user')
    @marshal_with(issue_fields)
    def get(self):
        try:
            issues = Issues.query.filter_by(user_id=current_user.id).all()
            if issues:
                return issues
            return make_response(jsonify({"message": "No issues found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)

    @auth_token_required
    @roles_required('user')
    def delete(self,issue_id):
        try:
            issue = Issues.query.filter_by(id=issue_id).first()
            if not issue:
                return make_response(jsonify({"message":"Issue request not found"}),404)
            issue.status = 'revoked'
            # db.session.delete(issue)
            db.session.commit()
            return make_response(jsonify({"message":"Issue request revoked successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)

class BookIssueRequest(Resource):
    @auth_token_required
    @roles_required('user')
    def post(self,book_id):
        try:
            issued_books = Issues.query.filter_by(user_id=current_user.id,status = 'issued').all()
            if len(issued_books) >= 5:
                return make_response(jsonify({"message":"You have already issued 5 books. Return some books to issue more"}),400)
            if not Books.query.filter_by(id=book_id).first():
                return make_response(jsonify({"message":"Book not found"}),404)
            if Issues.query.filter_by(book_id=book_id,user_id=current_user.id).first():
                issue = Issues.query.filter_by(book_id=book_id,user_id=current_user.id).first()
                if issue.status == 'pending':
                    return make_response(jsonify({"message":"Book issue request already sent"}),400)
                elif issue.status == 'revoked':
                    issue.status = 'pending'
                    issue.return_date = None
                    db.session.commit()
                    return make_response(jsonify({"message":"Book issue request sent successfully!"}),200)
            issue = Issues(book_id = book_id, user_id = current_user.id, issue_date = datetime.now(), status = 'pending')
            db.session.add(issue)
            db.session.commit()
            return make_response(jsonify({"message":"Book issue request sent successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)

class ShowPendingIssueRequest(Resource):
    @auth_token_required
    @roles_required('admin')
    @marshal_with(issue_fields)
    def get(self):
        try:
            issue_requests = Issues.query.filter_by(status = 'pending').all()
            # book_id = [issue.book_id for issue in issue_requests]
            # books = Books.query.filter(Books.id.in_(book_id)).all()
            if not issue_requests:
                return make_response(jsonify({"message":"No issue requests found"}),404)
            return issue_requests
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)

class ShowIssuedBooks(Resource):
    @auth_token_required
    @roles_required('admin')
    @marshal_with(issue_fields)
    def get(self):
        try:
            issued_books = Issues.query.filter_by(status = 'issued').all()
            # book_id = [issue.book_id for issue in issued_books]
            

            if not issued_books:
                return make_response(jsonify({"message":"No issued books found"}),404)
            return issued_books
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)

class BookIssueApprove(Resource):

    @auth_token_required
    @roles_required('admin')
    def post(self,issue_id):
        try:
            issue = Issues.query.filter_by(id=issue_id).first()
            if not issue:
                return make_response(jsonify({"message":"Issue request not found"}),404)
            issue.status = 'issued'
            issue.return_date = datetime.now() + timedelta(days=7)
            db.session.commit()
            return make_response(jsonify({"message":"Book issued successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)
        
    @auth_token_required
    @roles_required('admin')
    def delete(self,issue_id):
        try:
            issue = Issues.query.filter_by(id=issue_id).first()
            if not issue:
                return make_response(jsonify({"message":"Issue request not found"}),404)
            issue.status = 'revoked'
            db.session.commit()
            return make_response(jsonify({"message":"Issue request revoked successfully!"}),200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}),400)
        

class AllUsers(Resource):
    @auth_token_required
    @roles_required('admin')
    @marshal_with(admin_view_user_fields)
    def get(self):
        try:
            users = Users.query.all()
            if users:
                return users
            return make_response(jsonify({"message": "No users found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)
        

class UserViewSections(Resource):
    @marshal_with(user_viewed_section_fields)
    def get(self):
        try:
            sections = Section.query.all()
            if sections:
                return sections
            return make_response(jsonify({"message": "No sections found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)

class UserViewBooks(Resource):
    @marshal_with(user_viewed_book_fields)
    def get(self):
        try:
            books = Books.query.all()
            if books:
                return books
            return make_response(jsonify({"message": "No books found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)
        
class UserIssuedBooks(Resource):
    @auth_token_required
    @roles_required('user')
    @marshal_with(issue_fields)
    def get(self):
        try:
            book_issued = Issues.query.filter_by(user_id=current_user.id,status = 'issued').all()
            # # print(book_issued)
            # book_id = [issue.book_id for issue in book_issued]
            # books = Books.query.filter(Books.id.in_(book_id)).all()
            # print(book_issued)
            if book_issued:
                return book_issued
            return make_response(jsonify({"message": "No books found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)
        
class UserRequests(Resource):
    @auth_token_required
    @roles_required('user')
    @marshal_with(issue_fields)
    def get(self):
        try:
            book_issued = Issues.query.filter_by(user_id=current_user.id).all()
            # # print(book_issued)
            # book_id = [issue.book_id for issue in book_issued]
            # books = Books.query.filter(Books.id.in_(book_id)).all()
            # print(book_issued)
            if book_issued:
                return book_issued
            return make_response(jsonify({"message": "No books found"}),404)
        except Exception as e:
            return make_response(jsonify({"message": "Oops! Something went wrong"}),400)
        

