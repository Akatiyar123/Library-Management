from flask_restful import fields
from datetime import datetime

def format_date(date):
    return date.strftime('%Y-%m-%d') if date else None


user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
}

feedback_fields = {
    'id': fields.Integer,
    'book_id': fields.Integer,
    'feedback': fields.String,
    'ratings': fields.Integer,
    'user': fields.Nested(user_fields),
}

book_fields = {
    'id': fields.Integer,
    'book_name': fields.String,
    'book_content': fields.String,
    'book_authors': fields.String,
    'feedback': fields.List(fields.Nested(feedback_fields))
}

section_fields = {
    'id': fields.Integer,
    'section_name': fields.String,
    'section_description': fields.String,
    'books': fields.List(fields.Nested(book_fields))
}

issue_fields = {
    'id': fields.Integer,
    'book_id': fields.Integer,
    'user_id': fields.Integer,
    'issue_date': fields.DateTime,
    'return_date': fields.DateTime,
    'status': fields.String,
    'books': fields.Nested(book_fields),
    'user': fields.Nested(user_fields)
}


admin_view_user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'issues': fields.List(fields.Nested(issue_fields))
}

user_viewed_book_fields = {
    'id': fields.Integer,
    'book_name': fields.String,
    # 'book_content': fields.String,
    'book_authors': fields.String,
    'feedback': fields.List(fields.Nested(feedback_fields))
}

user_viewed_section_fields = {
    'id': fields.Integer,
    'section_name': fields.String,
    'section_description': fields.String,
    'books': fields.List(fields.Nested(user_viewed_book_fields))
}
