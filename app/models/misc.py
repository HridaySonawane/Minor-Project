from app.extensions import db
from datetime import datetime

class Alert(db.Model):
    __tablename__ = 'alerts'
    
    alert_id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100))
    message = db.Column(db.Text, nullable=False)
    severity = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class Report(db.Model):
    __tablename__ = 'reports'
    
    report_id = db.Column(db.Integer, primary_key=True)
    report_type = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    file_path = db.Column(db.String(500))
