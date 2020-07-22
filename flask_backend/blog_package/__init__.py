from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, AnonymousUserMixin
from flask_mail import Mail
from blog_package.config import Config


db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = "users.renderLogin"
login_manager.login_message_category = "info"
mail = Mail()


class Anonymous(AnonymousUserMixin):
    def __init__(self):
        self.username = 'Guest'
login_manager.anonymous_user = Anonymous


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    from blog_package.users.routes import users
    from blog_package.posts.routes import posts
    from blog_package.main.routes import main
    from blog_package.errors.handlers import errors
    app.register_blueprint(users)
    app.register_blueprint(posts)
    app.register_blueprint(main)
    app.register_blueprint(errors)

    return app

