from app.extensions import db

class Task(db.Model):
    __tablename__ = 'tasks'
    
    task_id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    priority = db.Column(db.String(50))
    status = db.Column(db.String(50), default='Pending')
    
    # Often tasks are assigned to workers or created by supervisors
    # assigned_to = db.Column(db.Integer, db.ForeignKey('workers.user_id'))
    # assigned_by = db.Column(db.Integer, db.ForeignKey('supervisors.user_id'))
