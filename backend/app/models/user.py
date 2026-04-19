from app.extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    # For polymorphic identity mapping (joined table inheritance)
    __mapper_args__ = {
        'polymorphic_on': role,
        'polymorphic_identity': 'user'
    }

class Worker(User):
    __tablename__ = 'workers'
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    health_status = db.Column(db.String(100))
    
    __mapper_args__ = {
        'polymorphic_identity': 'worker'
    }

class Supervisor(User):
    __tablename__ = 'supervisors'
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    team_size = db.Column(db.Integer)

    __mapper_args__ = {
        'polymorphic_identity': 'supervisor'
    }

class SafetyOfficer(User):
    __tablename__ = 'safety_officers'
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)

    __mapper_args__ = {
        'polymorphic_identity': 'safety_officer'
    }

class Administrator(User):
    __tablename__ = 'administrators'
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    access_level = db.Column(db.Integer)

    __mapper_args__ = {
        'polymorphic_identity': 'administrator'
    }
