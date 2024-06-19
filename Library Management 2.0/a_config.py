class Config(object):
    Debug = False
    Testing = False
    # SQLAlCHEMY_DATABASE_URI = 'sqlite:///dev.db'

class DevelopmentConfig(Config):
    Debug = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///sqlite.db'
    SECRET_KEY = 'thisissecretkey'
    SECURITY_PASSWORD_SALT = 'thisissalt'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'