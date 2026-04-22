from app.extensions import db
from sqlalchemy import text

#Create Shift
def create_shift(start_time, end_time, location, supervisor_id):
    query = text("""
        INSERT INTO shifts (id, start_time, end_time, location, created_by)
        VALUES (gen_random_uuid(), :start_time, :end_time, :location, :created_by)
        RETURNING id
    """)
    result = db.session.execute(query, {
        "start_time": start_time,
        "end_time": end_time,
        "location": location,
        "created_by": supervisor_id
    }).fetchone()

    db.session.commit()
    return result[0]


#Get Shifts
def get_shifts(user_id, role):
    if role == "supervisor":
        query = text("""
            SELECT * FROM shifts
            WHERE created_by = :user_id
        """)
        result = db.session.execute(query, {"user_id": user_id}).fetchall()

    else:
        query = text("""
            SELECT s.*
            FROM shifts s
            JOIN shift_assignments sa ON s.id = sa.shift_id
            WHERE sa.user_id = :user_id
        """)
        result = db.session.execute(query, {"user_id": user_id}).fetchall()

    return [dict(row._mapping) for row in result]


# Assign Workers
def assign_workers(shift_id, user_ids):
    for uid in user_ids:
        db.session.execute(text("""
            INSERT INTO shift_assignments (shift_id, user_id)
            VALUES (:shift_id, :user_id)
            ON CONFLICT DO NOTHING
        """), {"shift_id": shift_id, "user_id": uid})

    db.session.commit()


#Remove Worker
def remove_worker(shift_id, user_id):
    db.session.execute(text("""
        DELETE FROM shift_assignments
        WHERE shift_id = :shift_id AND user_id = :user_id
    """), {"shift_id": shift_id, "user_id": user_id})

    db.session.commit()


#Update Shift
def update_shift(shift_id, start_time, end_time, location, supervisor_id):
    db.session.execute(text("""
        UPDATE shifts
        SET start_time = :start_time,
            end_time = :end_time,
            location = :location
        WHERE id = :shift_id AND created_by = :created_by
    """), {
        "shift_id": shift_id,
        "start_time": start_time,
        "end_time": end_time,
        "location": location,
        "created_by": supervisor_id
    })

    db.session.commit()