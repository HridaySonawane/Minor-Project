from app.extensions import db
from app.models.user import User
from sqlalchemy import text
import uuid

#Get alerts for user
def get_alerts(user_id):
    query = text("""
        SELECT id, type, message, severity, is_read, created_at
        FROM alerts
        WHERE user_id = :user_id
        ORDER BY created_at DESC
    """)
    
    result = db.session.execute(query, {"user_id": user_id}).fetchall()

    return [dict(row._mapping) for row in result]


#Mark alert as read
def mark_alert_read(alert_id, user_id):
    query = text("""
        UPDATE alerts
        SET is_read = TRUE, updated_at = NOW()
        WHERE id = :alert_id AND user_id = :user_id
        RETURNING id
    """)
    
    result = db.session.execute(query, {
        "alert_id": alert_id,
        "user_id": user_id
    }).fetchone()

    db.session.commit()

    return result is not None


#Emergency alert (broadcast)
def create_emergency_alert(message, severity="high"):
    query = text("""
        INSERT INTO alerts (id, type, message, severity, user_id)
        SELECT gen_random_uuid(), 'emergency', :message, :severity, id
        FROM users
    """)

    db.session.execute(query, {
        "message": message,
        "severity": severity
    })

    db.session.commit()

    return True