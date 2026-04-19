import os
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def generate_handover_report(handover_data, filename=None):
    if not filename:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"handover_report_{timestamp}.pdf"
    
    # Save in current directory for easy access
    filepath = os.path.abspath(filename)
    
    c = canvas.Canvas(filepath, pagesize=letter)
    width, height = letter
    
    # Title
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 50, "Mine Shift Handover Log (Statutory)")
    
    # Content
    c.setFont("Helvetica", 12)
    y_position = height - 100
    
    c.drawString(50, y_position, f"Shift ID: {handover_data.get('shift_id', 'N/A')}")
    y_position -= 20
    c.drawString(50, y_position, f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    y_position -= 40
    
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y_position, "1. Equipment & Operations Status:")
    c.setFont("Helvetica", 12)
    y_position -= 20
    c.drawString(60, y_position, str(handover_data.get('equipment_status', 'None reported')))

    y_position -= 40
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y_position, "2. Production Summary:")
    c.setFont("Helvetica", 12)
    y_position -= 20
    c.drawString(60, y_position, str(handover_data.get('production_summary', 'None reported')))

    y_position -= 40
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y_position, "3. Safety Observations / Red Flags:")
    c.setFillColor(colors.red)
    y_position -= 20
    c.drawString(60, y_position, str(handover_data.get('safety_red_flags', 'None reported')))

    c.setFillColor(colors.black)
    y_position -= 40
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y_position, "4. Actions Required Next Shift:")
    c.setFont("Helvetica", 12)
    y_position -= 20
    c.drawString(60, y_position, str(handover_data.get('actions_required', 'None reported')))
    
    c.save()
    return filepath
