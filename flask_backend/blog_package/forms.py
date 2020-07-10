from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from blog_package.models import User

class RegistrationForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField("Confirm Password", validators=[DataRequired(), EqualTo("password")])
    submit = SubmitField("Sign Up")

    def validate_username(self, username_to_validate):
        user = User.query.filter_by(username=username_to_validate.data).first()
        if user:
            raise ValidationError("\"" + username_to_validate.data + "\" is already taken. Please choose a different username." )
    
    def validate_email(self, email_to_validate):
        user = User.query.filter_by(email=email_to_validate.data).first()
        if user:
            raise ValidationError("\"" + email_to_validate.data + "\" is already registered. Please choose a different email." )



class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember = BooleanField("Remember Me")
    submit = SubmitField("Login")




















