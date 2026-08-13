# GreenLedger Insights

Build a complete, real-working web application called "GreenLedger".



GreenLedger is an industrial electricity, energy-intelligence and carbon-management platform specifically designed for small and medium-scale manufacturing industries (MSMEs) in Coimbatore, Tamil Nadu.



IMPORTANT:

This is NOT a generic AI dashboard.

This is NOT a static UI prototype.

This is NOT a website filled with fake dashboard numbers.



Build it as a realistic working product where the user uploads REAL electricity bills and the application extracts, verifies, stores, compares and analyzes the actual data.



========================================================

CORE PRODUCT IDEA

========================================================



GreenLedger helps a small manufacturing industry understand its electricity usage using the electricity bills it already receives.



The complete flow must be:



LOGIN

↓

UPLOAD PREVIOUS ELECTRICITY BILL

↓

EXTRACT BILL DATA

↓

HUMAN VERIFICATION

↓

STORE VERIFIED DATA

↓

UPLOAD CURRENT ELECTRICITY BILL

↓

EXTRACT BILL DATA

↓

HUMAN VERIFICATION

↓

COMPARE PREVIOUS VS CURRENT MONTH

↓

IDENTIFY HIGH CONSUMPTION / EXCESS CONSUMPTION

↓

CALCULATE CARBON EMISSIONS

↓

SHOW SIMPLE ALERTS

↓

PROVIDE DATA-BASED RECOMMENDATIONS

↓

SHOW POTENTIAL COST / ENERGY SAVINGS

↓

ASK GREENLEDGER

↓

GENERATE PRE-AUDIT REPORT



The most important principle:



NEVER invent monthly electricity values.



NEVER hard-code June/July numbers into the actual dashboard.



NEVER display fake historical charts.



All monthly electricity values must come from bills uploaded by the user and verified by the user.



========================================================

TARGET USERS

========================================================



Target:



Small and medium-scale manufacturing industries in Tamil Nadu.



Primary demonstration location:



Coimbatore, Tamil Nadu.



Do NOT use Bangalore, Bengaluru or other cities in the interface.



Example company:



ABC Steel Components



Location:



Coimbatore, Tamil Nadu



Industry:



Steel Components Manufacturing



The interface should be understandable even for a factory owner or worker who is not highly educated or technically familiar with carbon accounting.



Avoid complicated technical language on the main dashboard.



Use simple explanations such as:



"Your electricity use increased this month."



instead of:



"Scope 2 electricity consumption variance detected."



Technical details can appear under "View details".



========================================================

GLOBAL DESIGN REQUIREMENT

========================================================



The website MUST look human-designed and professionally engineered.



It must NOT look AI-generated.



Think:



Linear

Stripe Dashboard

Datadog

modern industrial SaaS

professional enterprise software



But do NOT copy any existing website.



STRICTLY AVOID:



- neon colors

- purple/cyan AI gradients

- glowing effects

- futuristic AI graphics

- 3D globes

- robot illustrations

- glassmorphism

- excessive rounded cards

- excessive gradients

- giant cards

- excessive animations

- excessive emojis

- generic AI landing-page design



Use:



- white

- off-white

- dark charcoal

- slate

- forest green

- amber

- red only for serious warnings

- subtle shadows

- thin borders

- 4px–6px border radius

- compact professional spacing

- clean typography

- system font / Inter

- clear hierarchy



The UI should feel like a real industrial business application.



Use icons only when they improve understanding.



========================================================

RESPONSIVE DESIGN

========================================================



Must work properly on:



Desktop

Laptop

Tablet

Mobile



Desktop is the primary hackathon presentation view.



Do not allow charts or tables to overflow.



========================================================

FIRST SCREEN — 4 MEMBER LOGIN

========================================================



The FIRST page must be a professional login / team access page.



Brand:



GREENLEDGER



Subtitle:



Industrial Energy & Carbon Intelligence



Company:



ABC Steel Components



Location:



Coimbatore, Tamil Nadu



Title:



Team Access



Provide four team members.



1. Rithvi

Role:

Team Leader & Admin



2. Kiruthika

Role:

Compliance Verifier



3. Sheeba I

Role:

Auditor & ESG Specialist



4. Saruhashini P

Role:

Data Analyst



Create professional user cards.



Each card should contain:



Name

Role

"Continue" button



Also provide a normal login form:



Email

Password

Login



For hackathon demonstration, the four persona buttons should work immediately without requiring real authentication setup.



When a user selects a persona, create a session.



The top navigation should then display:



Name

Role

Company

Location



Example:



Sheeba I

Auditor & ESG Specialist

ABC Steel Components · Coimbatore, Tamil Nadu



Provide:



Switch User

Logout



========================================================

ROLE PERMISSIONS

========================================================



The four users should access the same GreenLedger facility but have different permissions.



Rithvi:

Team Leader & Admin



Can:

- view dashboard

- upload bills

- verify bills

- manage users

- view reports

- view audit history

- access settings



Kiruthika:

Compliance Verifier



Can:

- view dashboard

- upload bills

- verify extracted bill values

- view audit history

- generate reports



Sheeba I:

Auditor & ESG Specialist



Can:

- view dashboard

- view carbon analytics

- view compliance information

- view evidence trail

- generate reports

- ask GreenLedger



Saruhashini P:

Data Analyst



Can:

- view dashboard

- analyze monthly energy data

- view charts

- compare months

- run savings analysis

- ask GreenLedger



========================================================

APPLICATION LAYOUT

========================================================



After login create a professional application shell.



LEFT SIDEBAR:



GreenLedger logo



Overview

Bills

Energy Analytics

Carbon

Alerts

Recommendations

Ask GreenLedger

Reports

Audit Trail



Bottom:



Logged-in user

Role

Switch user

Logout



TOP HEADER:



ABC Steel Components

Coimbatore, Tamil Nadu



Current user



Notification icon



Main content area.



========================================================

FIRST-TIME USER EXPERIENCE

========================================================



If the account has no bills:



DO NOT show fake dashboard numbers.



Instead show an onboarding state.



Title:



"Let's understand your factory's electricity usage."



Subtitle:



"Upload your electricity bills to start building your energy history."



Primary button:



Upload Current Bill



Secondary:



Upload Previous Bill



Message:



"GreenLedger compares real verified bills. No estimated historical usage is shown until bills are uploaded."



========================================================

BILL UPLOAD PAGE

========================================================



Create a professional page:



Title:



Upload Electricity Bill



Subtitle:



"Upload your factory's electricity bill and GreenLedger will extract the important information."



Support:



PDF

JPG

PNG



Create drag-and-drop upload area.



Also:



Browse Files



After upload:



Show progress:



Uploading...

Reading bill...

Extracting information...



Do NOT pretend OCR is running if it is not actually implemented.



For the hackathon MVP, implement a reliable extraction workflow using available browser/file parsing or a clearly structured fallback form.



The architecture must allow a real OCR provider to be connected later.



========================================================

BILL DATA EXTRACTION

========================================================



Extract or allow confirmation of:



Billing period

Electricity consumption (kWh)

Maximum demand (kVA)

Power factor

Total bill amount

Account number

Bill date

Tariff/category if available



After extraction show:



"Review extracted information"



Example:



Billing Month

July 2026



Electricity Used

52,400 kWh



Maximum Demand

450 kVA



Power Factor

0.86



Bill Amount

₹4,25,000



Each field must be editable.



Show confidence where available:



Electricity

98% confidence



Power Factor

88% confidence



If confidence is low, highlight it.



========================================================

HUMAN VERIFICATION

========================================================



THIS IS A KEY FEATURE.



Never automatically treat OCR results as verified.



Create a verification screen.



LEFT SIDE:



Bill preview



RIGHT SIDE:



Extracted fields



Example:



Electricity Used

52,400 kWh

98% confidence



Power Factor

0.86

88% confidence



Bill Amount

₹4,25,000

99% confidence



Buttons:



Edit

Confirm & Save



After confirmation:



✓ Human Verified



Show:



Verified by:

Kiruthika



Date/time



Store the verification.



If the user edits an extracted value, store:



old value

new value

field

user

timestamp



========================================================

REAL BILL HISTORY

========================================================



Create a Bills page.



Table:



Month

Electricity

Bill Amount

Power Factor

Status

Verified By

Actions



Example values MUST only appear if the corresponding bills were uploaded.



Rows should be dynamically created.



Each row:



View

Verify

Replace

Details



========================================================

PREVIOUS MONTH VS CURRENT MONTH

========================================================



THIS IS THE MAIN FEATURE.



The dashboard must compare actual uploaded bills.



Example:



If the user uploads:



June bill:

44,400 kWh



July bill:

52,400 kWh



Then calculate:



Difference:

8,000 kWh



Percentage change:

18.02%



Display:



THIS MONTH VS LAST MONTH



Previous month:

44,400 kWh



Current month:

52,400 kWh



Change:

+8,000 kWh

+18.02%



Simple explanation:



"You used more electricity this month."



If current month is lower:



"You used less electricity this month."



If only one month's bill exists:



DO NOT create a fake comparison.



Show:



"Upload your previous month's bill to compare electricity usage."



Button:



Upload Previous Bill



========================================================

MAIN DASHBOARD

========================================================



Dashboard title:



Good morning, [User Name]



ABC Steel Components

Coimbatore, Tamil Nadu



Subtitle:



"Here's how your factory's energy usage is performing."



========================================================

TOP SUMMARY CARDS

========================================================



Create four simple cards.



1.



Electricity Used



This Month

[actual value]



Previous Month

[actual value]



Change

+X%



Simple message:



"You used X% more electricity."



2.



Electricity Bill



This Month

₹[actual]



Previous Month

₹[actual]



Change

X%



3.



Carbon Emissions



This Month

X tCO₂e



Previous Month

X tCO₂e



Change

X%



4.



Production



This Month

X tonnes



Previous Month

X tonnes



Change

X%



IMPORTANT:



Production must NOT be invented.



If production data has not been entered:



Show:



"Production data not available"



Button:



Add Production



========================================================

MONTH-TO-MONTH VISUAL COMPARISON

========================================================



Create a large clear section:



"THIS MONTH VS LAST MONTH"



Use a simple bar chart.



Two bars:



Previous Month

Current Month



Show actual values directly above/beside bars.



Example:



June

44,400 kWh



July

52,400 kWh



Below:



+8,000 kWh



18% increase



Add a simple sentence:



"Your factory used 8,000 kWh more electricity than last month."



Do NOT force the user to hover to understand the chart.



========================================================

"HOW MUCH DID WE USE?"

========================================================



Create a simple visual section:



Electricity used this month



52,400 kWh



Compared with last month:



44,400 kWh



Difference:



+8,000 kWh



========================================================

"HOW MUCH DID WE WASTE?"

========================================================



IMPORTANT:



Do NOT claim that the entire difference is waste.



Instead call it:



"Estimated Excess Consumption"



Only calculate this if enough production/history data exists.



If production data is available:



Compare current energy intensity against historical/previous energy intensity.



Estimate the electricity used above the expected level.



Show:



Estimated excess consumption:

X kWh



Estimated excess cost:

₹X



Estimated excess carbon:

X kg CO₂e



Clearly label:



"Estimated"



And explain:



"This is an analytical estimate based on available electricity and production data. It does not directly measure machine-level waste."



If production data does not exist:



Show:



"We need production data to estimate excess electricity use."



Button:



Add Production Data



========================================================

PRODUCTION DATA

========================================================



Create a simple form:



Month

Production quantity

Unit



For the demo use:



Tonnes



Example:



July 2026

510 tonnes



But this should be user-entered or imported.



Never silently insert demo production.



Once production exists calculate:



Energy intensity:



Electricity kWh / Production tonnes



Example:



52,400 kWh / 510 tonnes



Then show:



102.7 kWh per tonne



Explain simply:



"Your factory used 102.7 units of electricity to produce one tonne."



========================================================

ALERT CENTER

========================================================



Create:



"WHAT NEEDS YOUR ATTENTION?"



Alerts must be based on actual data.



Example:



RED:



High Electricity Use



"Your electricity use increased by 18% compared with last month."



If production increased only 2%:



"Electricity increased faster than production."



AMBER:



Power Factor



"Your power factor is 0.86."



If the bill contains a penalty:



"Your bill includes a ₹14,200 power factor surcharge."



GREEN:



Improvement



"Your electricity usage decreased compared with the previous month."



Do not create alerts when there is no supporting data.



========================================================

POWER FACTOR ALERT

========================================================



If the uploaded bill contains a low power factor:



Show:



Power Factor Alert



Current:

0.86



Status:

Needs attention



If an actual penalty amount exists in the uploaded bill, display it.



Recommendation:



"Review APFC / capacitor bank requirements with a qualified electrical professional."



Do not guarantee savings unless based on actual bill data or clearly marked as an estimate.



========================================================

HISTORICAL ELECTRICITY CHART

========================================================



Create:



"Electricity Usage History"



Show monthly electricity consumption.



But ONLY show months with verified bills.



If user has:



March

April

May

June

July



show five months.



If user has only:



June

July



show two months.



If no historical data:



show empty state.



Do NOT generate fake six-month data.



========================================================

BILL AMOUNT TREND

========================================================



Create a separate chart:



"Electricity Bill Trend"



Show actual monthly bill amounts from uploaded bills.



Allow user to understand:



Did our electricity cost increase?



Did electricity consumption increase?



Was the bill higher even when consumption was similar?



========================================================

ENERGY VS PRODUCTION

========================================================



If production data exists, create:



"Electricity vs Production"



Show:



Electricity consumed

Production achieved

Energy intensity



Explain:



"Electricity increased 18%, while production increased only 2%."



If production is unavailable:



show:



"Add production data to understand electricity used per tonne."



========================================================

CARBON CALCULATION

========================================================



Calculate Scope 2 emissions using:



Verified electricity consumption

×

Configured electricity emission factor



Store the emission factor separately.



Do not hard-code the factor as universally correct.



Show:



Electricity

52,400 kWh



Emission factor

[configured value]



Estimated Scope 2 emissions

XX tCO₂e



Provide:



View Calculation



Show the calculation clearly.



Also show:



Factor source

Factor version/date



If fuel data is later added, calculate Scope 1 separately.



Do not combine Scope 1 and Scope 2 without clearly labelling them.



========================================================

CARBON DASHBOARD

========================================================



Create:



Carbon Overview



Cards:



Scope 1

Scope 2

Total

Carbon Intensity



If Scope 1 data is unavailable:



Show:



"Fuel data not available"



Do not invent Scope 1 emissions.



For electricity-only users, focus on Scope 2.



========================================================

SAVINGS SIMULATOR

========================================================



Create a highly interactive:



"WHAT IF YOU REDUCE ELECTRICITY USE?"



Use a slider:



0%

5%

10%

15%

20%

25%

30%



Based on the CURRENT REAL BILL.



Example:



Current:

52,400 kWh



Slider:

10%



Estimated energy saving:

5,240 kWh



Estimated bill saving:

₹X



Estimated carbon reduction:

X kg CO₂e



All values update live.



Every result must say:



"Estimated"



Do not present estimates as guaranteed savings.



========================================================

RECOMMENDATIONS

========================================================



Create:



"WHAT SHOULD WE DO NEXT?"



Recommendations must be connected to actual findings.



Example:



If electricity increased significantly:



Recommendation:



"Check high-energy equipment and electricity consumption during non-production hours."



If power factor is low:



"Review APFC/capacitor bank requirements."



If energy intensity increased:



"Review equipment operating schedules and maintenance."



If electricity usage is consistently high:



"Evaluate energy-efficient equipment and renewable electricity options."



Each recommendation should contain:



Why this recommendation?



Expected benefit



Priority



Potential saving if calculable



========================================================

TOP FIVE FLAGSHIP FEATURES

========================================================



Make these especially visible because they are the main hackathon differentiators:



1. REAL BILL-BASED MONTHLY COMPARISON



No fake data.

Actual uploaded bills create the charts.



2. HUMAN VERIFICATION + CONFIDENCE



AI/OCR extracts information but a human confirms it before it enters the ledger.



3. SMART EXCESS-CONSUMPTION ANALYSIS



Identify electricity consumption that appears higher than expected based on available historical and production data.



4. SAVINGS / CARBON REDUCTION SIMULATOR



Let the factory owner see:



"If we reduce electricity usage by 10%, how much could we potentially save?"



5. ASK GREENLEDGER



Allow natural language questions about the company's actual data.



========================================================

ASK GREENLEDGER

========================================================



Create a professional chat interface.



Do NOT make it look like a generic ChatGPT clone.



Title:



Ask GreenLedger



Subtitle:



"Ask about your factory's electricity, bills, carbon and energy performance."



Suggested questions:



"How much electricity did we use last month?"



"Why did our electricity usage increase?"



"How much more did we use this month?"



"Which month had the highest bill?"



"How much could we save by reducing usage by 10%?"



"Why is there a power factor alert?"



"How has our carbon emission changed?"



Answers must use actual stored records.



Example:



User:



"How much more electricity did we use?"



Assistant:



"You used 8,000 kWh more electricity this month than last month, an increase of 18%."



Show source:



June verified bill

July verified bill



========================================================

REPORT

========================================================



Create:



Pre-Audit Energy & Carbon Report



Incl

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2b5b8d60-455a-40ee-af41-244c7dfa97ca).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
