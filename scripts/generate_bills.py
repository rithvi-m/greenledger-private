import os

def create_tangedco_september_pdf(filename):
    content = """%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<< /Length 1200 >>
stream
BT
/F1 16 Tf
50 740 Td
(TAMIL NADU GENERATION AND DISTRIBUTION CORPORATION) Tj
/F1 12 Tf
50 720 Td
(TANGEDCO HIGH TENSION ELECTRICITY CONSUMPTION BILL & INVOICE) Tj
0 -25 Td
/F2 10 Tf
(Consumer Service No: HT-4290-004984   |   Tariff: HT Industry Category IA) Tj
0 -15 Td
(Consumer Name: M/S. ABC STEEL COMPONENTS UNIT 4, SIDCO Industrial Estate) Tj
0 -15 Td
(Billing Month: September 2026         |   Bill Date: 30-SEP-2026) Tj
0 -30 Td
/F1 11 Tf
(CONSUMPTION & METER DETAILS) Tj
0 -18 Td
/F2 10 Tf
(Main Grid Meter ID: MTR-TN-9842) Tj
0 -15 Td
(Previous Reading: 1,486,700 kWh       |   Current Reading: 1,540,900 kWh) Tj
0 -15 Td
(RECORDED UNITS CONSUMED: 54,200 kWh) Tj
0 -30 Td
/F1 11 Tf
(BILLING HEAD & CHARGES BREAKDOWN) Tj
0 -18 Td
/F2 10 Tf
(Active Energy Charges 54,200 kWh @ Rs 6.00/kWh: Rs 3,25,200.00) Tj
0 -15 Td
(Demand Charges 320 kVA @ Rs 350/kVA: Rs 11,200.00) Tj
0 -15 Td
(Government Duty Tax 3.5%: Rs 12,100.00) Tj
0 -15 Td
(Power Factor PF: 0.9600 [High Efficiency Incentive Applied]) Tj
0 -25 Td
/F1 13 Tf
(TOTAL NET PAYABLE INVOICE AMOUNT: Rs 3,48,500.00) Tj
0 -18 Td
/F2 10 Tf
(DUE DATE: 15-OCT-2026   |   CEA Grid Emission Factor: 0.716 kg CO2e/kWh) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000262 00000 n 
0000000345 00000 n 
0000000423 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1675
%%EOF"""
    with open(filename, 'wb') as f:
        f.write(content.encode('utf-8'))

def create_iocl_diesel_pdf(filename):
    content = """%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<< /Length 1200 >>
stream
BT
/F1 16 Tf
50 740 Td
(INDIAN OIL CORPORATION LIMITED - IOCL) Tj
/F1 12 Tf
50 720 Td
(COMMERCIAL DIESEL FUEL SUPPLY INVOICE) Tj
0 -25 Td
/F2 10 Tf
(Invoice No: IOCL-CB-2026-9041          |   Invoice Date: 12-SEP-2026) Tj
0 -15 Td
(Customer Name: M/S. ABC STEEL COMPONENTS UNIT 4) Tj
0 -15 Td
(Delivery Location: SIDCO Industrial Estate, Kurichi, Coimbatore) Tj
0 -30 Td
/F1 11 Tf
(FUEL QUANTITY & PRICE DETAILS) Tj
0 -18 Td
/F2 10 Tf
(Item Description: High Speed Commercial Diesel [HSD]) Tj
0 -15 Td
(DELIVERED DIESEL QUANTITY: 2,150 LITRES) Tj
0 -15 Td
(Unit Rate: Rs 95.00 / Litre) Tj
0 -15 Td
(Base Fuel Cost: Rs 2,04,250.00) Tj
0 -15 Td
(GST @ 18%: Rs 36,765.00) Tj
0 -25 Td
/F1 13 Tf
(TOTAL INVOICE PAYABLE: Rs 2,41,015.00) Tj
0 -18 Td
/F2 10 Tf
(IPCC Diesel Emission Factor: 2.68 kg CO2e / Litre   |   Scope 1 Addition: 5.76 tCO2e) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000262 00000 n 
0000000345 00000 n 
0000000423 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1650
%%EOF"""
    with open(filename, 'wb') as f:
        f.write(content.encode('utf-8'))

os.makedirs('C:/Users/RITHVI/OneDrive/Documents/greenledger-private/public', exist_ok=True)
create_tangedco_september_pdf('C:/Users/RITHVI/OneDrive/Documents/greenledger-private/public/TANGEDCO_September_2026_High_Tension_Bill.pdf')
create_iocl_diesel_pdf('C:/Users/RITHVI/OneDrive/Documents/greenledger-private/public/IOCL_Commercial_Diesel_Fuel_Invoice.pdf')

create_tangedco_september_pdf('C:/Users/RITHVI/OneDrive/Documents/greenledger/TANGEDCO_September_2026_High_Tension_Bill.pdf')
create_iocl_diesel_pdf('C:/Users/RITHVI/OneDrive/Documents/greenledger/IOCL_Commercial_Diesel_Fuel_Invoice.pdf')

print("SUCCESS: 2 NEW TEST BILL PDFS CREATED!")
