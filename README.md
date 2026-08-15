# ⚡ GreenLedger

> **Industrial Energy & Carbon Intelligence Platform**  
> Designed for Small & Medium Manufacturing Enterprises (MSMEs) in Coimbatore, Tamil Nadu.

GreenLedger transforms raw industrial electricity bills into real-time energy insights, Scope 2 carbon accounting, and actionable cost-saving recommendations without relying on fake estimates or unverified dashboard numbers.

---

## 🔄 Step-by-Step Process: How GreenLedger Works

```
 ┌──────────────┐      ┌────────────────────────┐      ┌─────────────────────────┐
 │ 1. Team      │ ───► │ 2. Upload Electricity  │ ───► │ 3. Automated Extraction │
 │    Login     │      │    Bill (PDF/PNG)      │      │    & OCR Processing     │
 └──────────────┘      └────────────────────────┘      └─────────────────────────┘
                                                                    │
 ┌─────────────────────────┐      ┌─────────────────────────┐       ▼
 │ 6. Pre-Audit &          │ ◄─── │ 5. Carbon Emissions &   │ ◄─── ┌──────────────────┐
 │    ESG Reports          │      │    Cost Recommendations │      │ 4. Human Data    │
 └─────────────────────────┘      └─────────────────────────┘      │    Verification  │
                                                                   └──────────────────┘
```

### **Step 1: Role-Based Team Login**
Select a pre-configured team persona card or log in with user credentials:
- 👤 **Rithvi** (Team Leader & Admin) – Full facility control, user management, and settings access.
- 👤 **Kiruthika** (Compliance Verifier) – Uploads bills, verifies OCR data accuracy, and tracks audit trails.
- 👤 **Sheeba I** (Auditor & ESG Specialist) – Reviews carbon metrics, compliance evidence, and generates pre-audit reports.
- 👤 **Saruhashini P** (Data Analyst) – Analyzes monthly energy trends, cost savings, and chart analytics.

### **Step 2: Upload Electricity Bills**
- Drag & drop or browse factory electricity bills (PDF, JPG, PNG format from TANGEDCO/TNEB).
- Support for uploading both **Previous Month (Baseline)** and **Current Month** bills.

### **Step 3: Automated Bill Data Extraction**
- GreenLedger automatically parses and extracts critical bill fields:
  - **Units Consumed (kWh)**
  - **Maximum Demand (kVA)**
  - **Power Factor (PF)**
  - **Tariff Rates & Surcharges**
  - **Total Bill Amount & Billing Cycle**

### **Step 4: Human Data Verification**
- A side-by-side verification interface compares the uploaded bill document with extracted fields.
- The user reviews, edits if needed, and confirms the data before saving—guaranteeing **100% data integrity** and zero AI hallucination.

### **Step 5: Energy, Carbon & Cost Analysis**
- **Month-over-Month Comparison:** Instantly view consumption deltas, peak demand charges, and power factor penalty occurrences.
- **Scope 2 Carbon Footprint:** Computes equivalent $CO_2$ emissions using local grid emission factors.
- **Human-Readable Alerts:** Displays straightforward notifications (e.g., *"Power factor dropped to 0.82 — capacitor maintenance required"*).
- **Ask GreenLedger:** Embedded AI assistant answers questions regarding billing variations, tariff rules, and energy efficiency.

### **Step 6: Pre-Audit & Compliance Reporting**
- Generate downloadable, audit-ready ESG reports and evidence logs for stakeholders, banking partners, and auditors.

---

## 🛠️ Key Features

- 📄 **Real Bill Processing:** Zero fabricated historical numbers—dashboard data relies strictly on verified bill uploads.
- 🏢 **MSME Focused:** Designed specifically for manufacturing plants (e.g., ABC Steel Components, Coimbatore).
- 🔒 **Role-Based Access Control (RBAC):** Tailored interfaces and permissions per team role.
- 📊 **Energy Analytics & Visualization:** Interactive charts for consumption, demand, power factor, and carbon footprint.
- 🌿 **Carbon Management:** Seamless translation of kWh metrics into Scope 2 GHG emissions.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended) or [Bun](https://bun.sh/)

### Installation & Running Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rithvi-m/greenledger-private.git
   cd greenledger-private
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure Environment Variables**
   Copy `.env.example` to `.env` and set up your Supabase or API credentials:
   ```bash
   cp .env.example .env
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open Application**
   Navigate to `http://localhost:5173` in your web browser.

---

## 🧰 Tech Stack

- **Frontend:** React 19, TypeScript, TanStack Router (Start), Tailwind CSS v4, Lucide Icons, Recharts
- **Backend / Database:** Supabase, Nitro, Vite
- **UI Components:** Radix UI primitives, shadcn/ui

---

## 📜 License

Private Repository – All Rights Reserved.
