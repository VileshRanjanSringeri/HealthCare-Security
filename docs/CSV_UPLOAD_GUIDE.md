# 📊 CSV Data Upload Guide

## ✅ Your Dashboard is Now Ready to Load Your CSV Data!

I've updated the system to automatically detect and process your **patient health monitoring dataset** format.

---

## **How to Use:**

### **Step 1: Prepare Your CSV File**

Make sure your CSV has these column headers (as shown in your screenshot):
- `Patient ID` (or `Patient_ID`)
- `Heart Rate`
- `Respiratory Rate` (or `Respirator`)
- `Timestamp`
- `Body Temp` (or `Body Temperature`)
- `Oxygen Sa` (or `Oxygen Saturation`)
- `Systolic Bl` (or `Systolic Blood Pressure`)
- `Diastolic B` (or `Diastolic Blood Pressure`)
- `Age`
- `Gender`
- `Weight (kg)`
- `Height (m)`
- `Derived_H`, `Derived_P`, `Derived_B`, `Derived_M` (optional)
- `Risk Categ` (or `Risk Category`)

---

### **Step 2: Upload Via Dashboard**

1. **Open your dashboard** (run `npm run dev`)

2. **Login** with any credentials:
   - Username: `admin`
   - Password: `password`
   - 2FA Code: `123456`

3. **Click the "Upload CSV" button** in the top navigation bar

4. **Select your CSV file**

5. **Choose how many patients** you want to load:
   - 25 patients
   - **50 patients (Recommended)** ⭐
   - 75 patients
   - 100 patients

6. **Click "Process Dataset"**

---

### **Step 3: Automatic Transformation**

The system will automatically:

✅ **Parse all columns** from your CSV

✅ **Analyze vital signs** for anomalies:
- Heart rate: Critical if < 50, Warning if > 100
- Oxygen saturation: Critical if < 90, Warning if < 95
- Blood pressure: Warning if systolic > 140 or diastolic > 90
- Temperature: Warning if > 38°C or < 36°C
- Respiratory rate: Warning if < 12 or > 20

✅ **Determine patient status** based on:
- Risk Category column
- Vital sign thresholds
- Multiple anomaly detection

✅ **Generate alerts** for critical/warning patients

✅ **Calculate security metrics** (simulated based on health status)

✅ **Create attack distribution** visualization

---

## **What You'll See:**

### **Dashboard Stats:**
- **Total Patients**: Based on how many you selected (e.g., 50)
- **Normal Status**: Patients with normal vitals
- **Warning Status**: Patients with concerning vitals
- **Critical Status**: Patients requiring immediate attention

### **Patient Cards:**
Each patient will show:
- Name (synthetic, randomly assigned)
- Room number
- Age, Gender, Weight (from your CSV)
- **Real vital signs from your data**:
  - Heart Rate (from CSV)
  - Blood Pressure (Systolic/Diastolic from CSV)
  - Oxygen Saturation (from CSV)
  - Temperature (from CSV)
  - Glucose (generated, as it's not in your CSV)
- AI Analysis status
- Crypto verification status

### **Emergency Alerts:**
Automatically created for patients with:
- Low oxygen (<90%)
- Bradycardia (HR <50)
- Tachycardia (HR >100)
- High/low blood pressure
- Fever or hypothermia
- Abnormal respiratory rate

---

## **Example Patient Transformation:**

**Your CSV Row:**
```
Patient ID: 1
Heart Rate: 60
Respiratory Rate: 12
Body Temp: 36.86
Oxygen Sa: 95.70
Systolic Bl: 124
Diastolic B: 86
Age: 37
Gender: Female
Weight (kg): 91.54
Height (m): 1.679
Risk Categ: High Risk
```

**Dashboard Display:**
```
Patient: John Doe (randomly assigned name)
Room: 301
Age: 37
Weight: 92 kg
Status: Critical (due to "High Risk" category)

Vital Signs:
  Heart Rate: 60 BPM ✓
  Blood Pressure: 124/86 mmHg ⚠️ (slightly elevated)
  Oxygen: 96% ✓
  Temperature: 36.9°C ✓
  
AI Analysis:
  Status: Anomaly Detected
  Confidence: 89%
  Pattern: "Elevated Blood Pressure"

Crypto Status:
  Verified: ✓
  Sensor ID: IoT-Sensor-001
```

---

##  **Key Features:**

### **1. Smart Anomaly Detection**
The system analyzes your real CSV data and detects:
- Bradycardia (slow heart rate)
- Tachycardia (fast heart rate)
- Hypoxemia (low oxygen)
- Hypertension (high blood pressure)
- Hypotension (low blood pressure)
- Fever / Hypothermia
- Abnormal respiratory patterns

### **2. Risk-Based Status**
Patient status is determined by:
1. **Risk Category** from your CSV (if it says "High Risk" → Critical)
2. **Vital Sign Thresholds** (medical standards)
3. **Multiple Anomalies** (combining issues increases severity)

### **3. Real Data Integration**
- **100% of your vital signs** are used from the CSV
- **No synthetic data** for heart rate, BP, oxygen, temp
- Only patient names and some metadata are synthetically generated

---

## **Troubleshooting:**

### **"No valid records found"**
- Check that your CSV has a header row
- Ensure column names match (case-insensitive, but should include keywords like "Heart Rate", "Oxygen", etc.)

### **"Failed to process CSV"**
- Make sure the file is actually a `.csv` file
- Try opening it in Excel/Google Sheets to verify format
- Check for special characters or encoding issues

### **Only shows a few patients**
- This is normal! You selected that number in the dropdown
- To see all your data, select "100 patients" before uploading

---

## **Column Mapping Reference:**

| Your CSV Column | Dashboard Field |
|----------------|-----------------|
| Patient ID | Patient ID |
| Heart Rate | Heart Rate (BPM) |
| Respiratory Rate | (Used for anomaly detection) |
| Body Temp | Temperature (°C) |
| Oxygen Sa | Oxygen Saturation (%) |
| Systolic Bl | Blood Pressure (systolic) |
| Diastolic B | Blood Pressure (diastolic) |
| Age | Age |
| Gender | (Used for metadata) |
| Weight (kg) | Weight |
| Height (m) | (Used for metadata) |
| Risk Categ | Status determination |
| Derived_* | (Optional, not displayed) |

---

## **Next Steps After Upload:**

1. ✅ **View Dashboard** - See all patients with real vital signs
2. ✅ **Check Alerts** - Click "Emergency Alerts" to see critical cases
3. ✅ **Patient Details** - Click any patient card for detailed view
4. ✅ **Security Analytics** - View system-wide metrics
5. ✅ **Model Performance** - See AI/ML algorithm stats
6. ✅ **Attack Demo** - Demonstrate security features

---

## **Pro Tips:**

💡 **Start with 50 patients** for best performance
💡 **Critical patients** are those with HR<50, O2<90, or "High Risk" label
💡 **All vital signs are real** from your CSV
💡 **Export is still showing 4 patients locally?** Use the copy-paste method from `COPY_PASTE_MOCKDATA.txt` for the mock data issue

---

## **Your Data is Safe:**

- ✅ All processing happens **client-side** in your browser
- ✅ No data is sent to external servers
- ✅ CSV is parsed locally using JavaScript
- ✅ Perfect for research presentations and demos

---

🎉 **You're all set! Upload your CSV and see your real patient data come to life!**
