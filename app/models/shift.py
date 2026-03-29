from app.extensions import db
from datetime import datetime

class Shift(db.Model):
    __tablename__ = 'shifts'
    
    shift_id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255))
    
    # Relationships
    attendances = db.relationship('Attendance', backref='shift', lazy=True)
    handovers = db.relationship('HandoverLog', backref='shift', lazy=True)

class Attendance(db.Model):
    __tablename__ = 'attendances'
    
    attendance_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    check_in_time = db.Column(db.DateTime)
    check_out_time = db.Column(db.DateTime)
    status = db.Column(db.String(50))
    
    # Foreign Keys
    worker_id = db.Column(db.Integer, db.ForeignKey('workers.user_id'), nullable=False)
    shift_id = db.Column(db.Integer, db.ForeignKey('shifts.shift_id'), nullable=False)

class HandoverLog(db.Model):
    """Digital Shift Handover Log as per mining statutory requirements."""
    __tablename__ = 'handover_logs'
    
    log_id = db.Column(db.Integer, primary_key=True)
    shift_id = db.Column(db.Integer, db.ForeignKey('shifts.shift_id'), nullable=False)
    
    # Equipment and Operations
    equipment_status = db.Column(db.Text)          # e.g., "Excavator 3: Breakdown, Dumper 1: OK"
    production_summary = db.Column(db.Text)        # Targets met vs unmet
    
    # Safety Information
    safety_red_flags = db.Column(db.Text)          # Highlighted safety issues found during shift
    actions_required = db.Column(db.Text)          # Critical info for the next shift

    # Tracking
    outgoing_supervisor_id = db.Column(db.Integer, db.ForeignKey('supervisors.user_id'))
    incoming_supervisor_id = db.Column(db.Integer, db.ForeignKey('supervisors.user_id'))
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)
