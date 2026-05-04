# 📊 Dataset Upload Guide

## How to Upload Your Excel Dataset

### Step 1: Convert Excel to CSV

Your dashboard requires a **CSV (Comma-Separated Values)** file. Here's how to convert your Excel file:

#### Option A: Using Microsoft Excel
1. Open your Excel file
2. Click **File** → **Save As**
3. Choose **CSV (Comma delimited) (*.csv)** as the file type
4. Click **Save**
5. If Excel asks about features, click **Yes** to continue

#### Option B: Using Google Sheets
1. Upload your Excel file to Google Drive
2. Open it with Google Sheets
3. Click **File** → **Download** → **Comma Separated Values (.csv)**

### Step 2: Required CSV Format

Your CSV file should have one of these two formats:

#### Format 1: Patient Health Monitoring Data (RECOMMENDED)
This is the expected format for the MedSec-25 IoMT dataset:

```csv
patientId,heartRate,respiratoryRate,timestamp,bodyTemp,oxygenSaturation,systolicBP,diastolicBP,age,gender,weight,height,derivedH,derivedP,derivedB,derivedM,riskCategory
P001,72,16,2024-01-15 10:30:00,98.6,98,120,80,45,M,75,175,0.2,0.1,0.3,0.15,Low
P002,88,18,2024-01-15 10:31:00,99.1,96,135,85,52,F,68,165,0.5,0.3,0.4,0.25,Medium
P003,110,22,2024-01-15 10:32:00,100.2,92,145,95,60,M,82,180,0.8,0.7,0.6,0.45,High
```

**Required Columns:**
- `patientId` - Patient identifier (e.g., P001, P002)
- `heartRate` - Heart rate in BPM (60-150)
- `respiratoryRate` - Breaths per minute (12-25)
- `timestamp` - Date and time
- `bodyTemp` - Body temperature in °F (97-102)
- `oxygenSaturation` - SpO2 percentage (90-100)
- `systolicBP` - Systolic blood pressure (90-180)
- `diastolicBP` - Diastolic blood pressure (60-110)
- `age` - Patient age
- `gender` - M or F
- `weight` - Weight in kg
- `height` - Height in cm
- `riskCategory` - Low, Medium, High, or Critical

#### Format 2: Network Flow Data (ALTERNATIVE)
If you have network security data instead:

```csv
flowId,srcIp,srcPort,dstIp,dstPort,protocol,timestamp,label
F001,192.168.1.100,5000,10.0.0.5,80,6,2024-01-15 10:30:00,Normal
F002,192.168.1.101,5001,10.0.0.5,80,6,2024-01-15 10:31:00,DoS
```

### Step 3: Upload to Dashboard

1. **Login to the dashboard** with your credentials
2. **Click the "Load Dataset" button** in the top-right corner
3. **Select number of patients** to generate (25-100 recommended)
4. **Click the upload area** and select your CSV file
5. **Click "Process Dataset"** 
6. Wait for processing (may take a few seconds for large files)
7. The dashboard will automatically load with your data

### Step 4: Verify Upload

After upload, you should see:
- ✅ "Real Dataset Active" badge in the header
- ✅ Your patient count displayed in the overview
- ✅ Patient list populated with your data
- ✅ Statistics updated based on your dataset

### 🔄 Data Persistence

Your uploaded dataset is **automatically saved** to your browser's local storage:
- Data persists across browser sessions
- No need to re-upload when you return
- Click "Reset to Demo" to clear and use sample data

### 📝 Sample CSV Templates

#### Minimal Patient Health CSV
```csv
patientId,heartRate,respiratoryRate,timestamp,bodyTemp,oxygenSaturation,systolicBP,diastolicBP,age,gender,weight,height,derivedH,derivedP,derivedB,derivedM,riskCategory
P001,75,16,2024-01-15 10:00:00,98.6,98,120,80,45,M,75,175,0.2,0.1,0.2,0.1,Low
P002,82,17,2024-01-15 10:05:00,98.8,97,125,82,50,F,68,165,0.3,0.2,0.3,0.2,Low
P003,95,19,2024-01-15 10:10:00,99.5,95,140,90,55,M,80,178,0.6,0.5,0.5,0.4,Medium
P004,105,21,2024-01-15 10:15:00,100.0,93,150,95,60,F,72,168,0.7,0.6,0.6,0.5,High
P005,115,23,2024-01-15 10:20:00,100.8,91,155,98,65,M,85,182,0.9,0.8,0.8,0.7,Critical
```

### ❗ Common Issues

**Issue: "Please select a valid CSV file"**
- Make sure the file extension is `.csv` (not `.xlsx` or `.xls`)
- Re-save your Excel file as CSV

**Issue: "No valid records found"**
- Check that your CSV has the required columns
- Ensure the first row contains column headers
- Verify there's data in rows 2+

**Issue: "Failed to process CSV file"**
- Check for special characters in the data
- Ensure all numeric columns contain numbers
- Remove any blank rows at the end

**Issue: Data doesn't look right**
- Verify column names match the expected format
- Check that dates are in ISO format: `YYYY-MM-DD HH:MM:SS`
- Ensure numeric values are in the correct range

### 💡 Pro Tips

1. **Start small**: Test with 25-50 patients first
2. **Clean your data**: Remove empty rows and special characters
3. **Use consistent format**: Keep date/time format uniform
4. **Check column names**: They should match the required names above
5. **Save a backup**: Keep a copy of your original Excel file

### 🎯 For Research Presentation

For your conference paper presentation:
- Use 50-100 patients for optimal demo performance
- Include a mix of risk categories (Low, Medium, High, Critical)
- Ensure you have some anomalies for demonstration
- The system will auto-generate alerts and security metrics

### 📞 Need Help?

If you're still having trouble:
1. Check the browser console (F12) for error messages
2. Verify your CSV format matches the examples above
3. Try the minimal sample CSV template provided
4. Ensure your Excel data is properly formatted before conversion

---

**Ready to upload?** Click the "Load Dataset" button in your dashboard and follow the on-screen instructions!
