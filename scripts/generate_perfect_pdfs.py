import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_tangedco_pdf(filepath):
    doc = SimpleDocTemplate(filepath, pagesize=letter, leftMargin=36, rightMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()
    story = []

    # Title Banner
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=14,
        textColor=colors.HexColor('#065F46'),
        spaceAfter=4
    )
    story.append(Paragraph("TAMIL NADU GENERATION AND DISTRIBUTION CORPORATION (TANGEDCO)", title_style))
    
    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#374151'),
        spaceAfter=15
    )
    story.append(Paragraph("<b>HIGH TENSION ELECTRICITY CONSUMPTION BILL & INVOICE</b>", sub_style))

    # Header Meta Table
    meta_data = [
        ["Consumer Service No:", "HT-4290-004984", "Billing Month & Year:", "September 2026"],
        ["Consumer Name:", "M/S. ABC Steel Components Unit 4", "Bill Date:", "30-SEP-2026"],
        ["Tariff Category:", "HT Industry Category IA", "Due Date:", "15-OCT-2026"]
    ]
    meta_table = Table(meta_data, colWidths=[120, 180, 120, 120])
    meta_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1F2937')),
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F3F4F6')),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB'))
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 15))

    # Section 1 Header
    story.append(Paragraph("<b>1. METER READINGS & CONSUMPTION DETAILS</b>", ParagraphStyle('Sec1', parent=styles['Normal'], fontSize=10, textColor=colors.HexColor('#065F46'))))
    story.append(Spacer(1, 6))

    meter_data = [
        ["Meter Details", "Previous Reading", "Current Reading", "Multiplier", "Recorded Units (kWh)"],
        ["Main Grid Meter #1", "1,486,700", "1,540,900", "1.0000", "54,200 kWh"],
        ["Apparent Energy (kVAh)", "1,699,247", "1,755,700", "1.0000", "56,453 kVAh"]
    ]
    meter_table = Table(meter_data, colWidths=[130, 100, 100, 80, 130])
    meter_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#D1FAE5')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#065F46')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#10B981')),
        ('PADDING', (0, 0), (-1, -1), 6)
    ]))
    story.append(meter_table)
    story.append(Spacer(1, 15))

    # Section 2 Charges Breakdown
    story.append(Paragraph("<b>2. CHARGES BREAKDOWN & TOTAL PAYABLE</b>", ParagraphStyle('Sec2', parent=styles['Normal'], fontSize=10, textColor=colors.HexColor('#065F46'))))
    story.append(Spacer(1, 6))

    charges_data = [
        ["Billing Head Description", "Rate / Unit", "Amount (INR)"],
        ["Active Energy Charges (54,200 kWh)", "Rs. 6.00 / kWh", "Rs. 3,25,200.00"],
        ["Demand Charges (320 kVA)", "Rs. 350.00 / kVA", "Rs. 11,200.00"],
        ["Government Tax & Duty (3.5%)", "Tax Rate 3.5%", "Rs. 12,100.00"],
        ["Power Factor Incentive (PF: 0.96 > 0.90)", "High Efficiency Bonus", "- Rs. 4,500.00"],
        ["TOTAL PAYABLE INVOICE AMOUNT", "DUE DATE: 15-OCT-2026", "Rs. 3,48,500.00"]
    ]
    charges_table = Table(charges_data, colWidths=[240, 150, 150])
    charges_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E5E7EB')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#9CA3AF')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#D1FAE5')),
        ('TEXTCOLOR', (0, -1), (-1, -1), colors.HexColor('#065F46')),
        ('PADDING', (0, 0), (-1, -1), 6)
    ]))
    story.append(charges_table)
    story.append(Spacer(1, 20))

    # Audit Footer Notice
    story.append(Paragraph("<i>CEA India Grid Baseline Emission Factor Cited: 0.716 kg CO2e / kWh. Aligned for ISO 14064 & EU CBAM Exemption Filing.</i>", ParagraphStyle('Foot', parent=styles['Normal'], fontSize=8, textColor=colors.HexColor('#6B7280'))))

    doc.build(story)

def generate_iocl_pdf(filepath):
    doc = SimpleDocTemplate(filepath, pagesize=letter, leftMargin=36, rightMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()
    story = []

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=14,
        textColor=colors.HexColor('#B91C1C'),
        spaceAfter=4
    )
    story.append(Paragraph("INDIAN OIL CORPORATION LIMITED (IOCL)", title_style))
    
    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#374151'),
        spaceAfter=15
    )
    story.append(Paragraph("<b>COMMERCIAL DIESEL FUEL SUPPLY INVOICE</b>", sub_style))

    meta_data = [
        ["Invoice Number:", "IOCL-CB-2026-9041", "Invoice Date:", "12-SEP-2026"],
        ["Customer Name:", "M/S. ABC Steel Components Unit 4", "Payment Terms:", "Net 15 Days"],
        ["Delivery Location:", "SIDCO Industrial Estate, Kurichi, Coimbatore", "Supply Tanker:", "TN-37-BY-8841"]
    ]
    meta_table = Table(meta_data, colWidths=[120, 180, 120, 120])
    meta_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#FEF2F2')),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#FCA5A5'))
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 15))

    story.append(Paragraph("<b>FUEL SUPPLY & PRICING SUMMARY</b>", ParagraphStyle('Sec1', parent=styles['Normal'], fontSize=10, textColor=colors.HexColor('#B91C1C'))))
    story.append(Spacer(1, 6))

    fuel_data = [
        ["Item Description", "Delivered Qty", "Unit Price", "Total Amount (INR)"],
        ["High Speed Commercial Diesel (HSD)", "2,150 Litres", "Rs. 95.00 / Litre", "Rs. 2,04,250.00"],
        ["GST Tax @ 18%", "Tax Amount", "18.00%", "Rs. 36,765.00"],
        ["TOTAL INVOICE AMOUNT PAYABLE", "2,150 L Diesel", "DUE: 27-SEP-2026", "Rs. 2,41,015.00"]
    ]
    fuel_table = Table(fuel_data, colWidths=[200, 110, 110, 120])
    fuel_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#FEE2E2')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#991B1B')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#EF4444')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#FEE2E2')),
        ('TEXTCOLOR', (0, -1), (-1, -1), colors.HexColor('#991B1B')),
        ('PADDING', (0, 0), (-1, -1), 6)
    ]))
    story.append(fuel_table)
    story.append(Spacer(1, 20))

    story.append(Paragraph("<i>IPCC Diesel Combustion Emission Factor: 2.68 kg CO2e / Litre. Scope 1 Addition: 5.76 tCO2e.</i>", ParagraphStyle('Foot', parent=styles['Normal'], fontSize=8, textColor=colors.HexColor('#6B7280'))))

    doc.build(story)

p1 = 'C:/Users/RITHVI/OneDrive/Documents/greenledger-private/public/TANGEDCO_September_2026_High_Tension_Bill.pdf'
p2 = 'C:/Users/RITHVI/OneDrive/Documents/greenledger-private/public/IOCL_Commercial_Diesel_Fuel_Invoice.pdf'

generate_tangedco_pdf(p1)
generate_iocl_pdf(p2)

generate_tangedco_pdf('C:/Users/RITHVI/OneDrive/Documents/greenledger/TANGEDCO_September_2026_High_Tension_Bill.pdf')
generate_iocl_pdf('C:/Users/RITHVI/OneDrive/Documents/greenledger/IOCL_Commercial_Diesel_Fuel_Invoice.pdf')

generate_tangedco_pdf('C:/Users/RITHVI/OneDrive/Documents/TANGEDCO_September_2026_High_Tension_Bill.pdf')
generate_iocl_pdf('C:/Users/RITHVI/OneDrive/Documents/IOCL_Commercial_Diesel_Fuel_Invoice.pdf')

print("PERFECT REPORTLAB PDFS GENERATED SUCCESSFULLY!")
