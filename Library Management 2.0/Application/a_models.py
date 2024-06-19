from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
from a_database import db


class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('users.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('roles.id'))

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String, unique=False)
    fs_uniquifier = db.Column(db.String, unique=False)
    active = db.Column(db.Boolean)
    roles = db.relationship('Roles',secondary='roles_users' ,backref=db.backref('users', lazy='dynamic'))
    # issues = db.relationship('Issues', backref='users')


class Roles(db.Model, RoleMixin):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    description = db.Column(db.String(255))

class Section(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    section_name = db.Column(db.String(255), unique = True)
    section_description = db.Column(db.String(255), unique = False)
    books = db.relationship('Books',secondary='sectionbooks' ,backref=db.backref('sections', lazy='dynamic'))
    
    # books = db.relationship("Books", secondary="sectionbooks", backref="section")

class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_name = db.Column(db.String(255), unique = True)
    book_content = db.Column(db.Text, unique = False)
    book_authors = db.Column(db.String(255), unique = False)
    # section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    # sections = db.relationship("Section", secondary="sectionbooks", backref="books")
    # issues = db.relationship('Issues', backref='books')
    feedback = db.relationship('Feedback', backref='books')

class Sectionbooks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

class Issues(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    issue_date = db.Column(db.DateTime, unique = False)
    return_date = db.Column(db.DateTime, unique = False)
    status = db.Column(db.String(255), unique = False)
    # books = db.relationship('Books',secondary='sectionbooks' ,backref=db.backref('sections', lazy='dynamic'))
    user = db.relationship('Users', backref='issues')
    books = db.relationship('Books', backref='issues')

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    user = db.relationship('Users', backref='feedback')
    feedback = db.Column(db.Text, unique = False)
    ratings = db.Column(db.Integer, unique = False)