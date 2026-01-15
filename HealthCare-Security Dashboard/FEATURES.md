# Healthcare IoT Security Monitoring Dashboard

## Overview
A comprehensive real-time medical monitoring system interface with AI-powered anomaly detection and cryptographic integrity verification.

## Features Implemented

### 1. Login & Authentication Screen
- Hospital logo placeholder with Shield icon
- Username and password fields
- Two-factor authentication (6-digit code)
- Emergency override button
- System security status indicator
- End-to-end encryption notice

### 2. Main Dashboard (3-Column Layout)

#### Left Column:
- **Quick Stats Panel**: Total patients, active monitors, system status
- **Patient List**: 5 patients with real-time data
  - Name, room number, status indicator (green/yellow/red)
  - Current heart rate display
  - Interactive selection
  - "View Details" button

#### Center Column:
- **Patient Header**: Selected patient info with status badge
- **Real-Time ECG Chart**: Animated heart rate monitoring
  - Live updating line chart
  - 24-hour historical data
  - Color-coded by vital sign
- **Current Vital Signs Grid**:
  - Heart Rate (BPM) with status indicators
  - Blood Pressure (mmHg)
  - Oxygen Saturation (%)
  - Glucose (mg/dL)
  - Color-coded status (✓/⚠/✕)

#### Right Column:
- **Security Status Panel**:
  - "All Systems Secure" badge
  - Crypto verification status (HMAC)
  - Last key rotation time
  - Active sensor connections
  - Data integrity percentage
- **Quick Actions**:
  - Security Analytics button
  - Generate Report
  - View Audit Logs
  - View Alert (when active)
- **AI Analysis Panel**:
  - Normal/Anomaly detection status
  - Confidence score
  - Detected pattern description

### 3. Patient Detail View

#### Top Section:
- Patient profile with photo placeholder
- Demographics (age, weight, ID)
- Medical conditions list
- Current medications
- Primary doctor contact

#### Middle Section:
- **Vital Signs Monitor**:
  - 5 vital sign cards with live updates
  - Trend indicators (↑↓)
  - Normal ranges displayed
  - Last updated timestamps
- **24-Hour Trend Charts**:
  - Heart rate graph
  - Oxygen level graph
  - Glucose graph

#### Bottom Section:
- **AI Anomaly Detection Panel**:
  - Real-time status (Normal/Anomaly)
  - Confidence score with percentage
  - Detected pattern details
  - Alert button (if anomaly detected)
- **Cryptographic Verification**:
  - Data integrity verification (HMAC-SHA256)
  - Last verified timestamp
  - Sensor ID display
  - Digital signature validation
  - Expandable cryptographic proof section
- **Alert History Timeline**:
  - Past alerts with severity levels
  - Acknowledged status
  - Filterable by severity

### 4. Alert/Attack Detection Screen

#### Emergency Alert Modal:
- **Red Header**:
  - Critical alert badge with animation
  - Patient identification
  - Room location
  - Time detected
- **Alert Details**:
  - Current vital sign value (red)
  - Normal range (green)
  - Side-by-side comparison
- **Verification Steps**:
  - ✅ AI Detection with score
  - ✅ Cryptographic verification
  - ⏳ Manual verification status
  - □ Alert acknowledgment
- **Security Analysis**:
  - Data integrity status
  - Sensor status
  - Attack detection (if applicable)
- **Action Buttons**:
  - Acknowledge Alert (primary)
  - Mark as False Positive
  - Contact Medical Team (emergency)
  - View Patient History

### 5. Security Analytics Dashboard

#### Tab 1: System Health
- **Key Metrics Cards**:
  - System uptime (99.8%)
  - Active connections (12)
  - Failed auth attempts (3 in 24h)
  - Data integrity rate (100%)
- **Connection Status**: IoT sensors, database, API gateway, backup systems
- **Recent Activity Timeline**: Key rotations, security scans, anomalies

#### Tab 2: Threat Detection
- **Metrics**: Total attacks, block rate, response time
- **Charts**:
  - Attacks over time (24h line chart)
  - Attack type distribution (pie chart)
  - Most targeted patients (bar chart)
- **Recent Attack List**:
  - Attack type and status
  - Source and target information
  - Timestamps and severity

#### Tab 3: Cryptographic Audit
- **Metrics**: HMAC success rate, signatures issued, last rotation
- **Key Rotation Schedule**: Master key, HMAC key, session keys
- **Encryption Standards**: AES-256-GCM, HMAC-SHA256, ECDH P-256, RSA-2048
- **Certificate Status**: SSL/TLS and code signing certificates

#### Tab 4: Model Performance
- **AI Metrics**: Accuracy (92.3%), false positive rate (4.1%), response time (150ms)
- **Performance Chart**: Accuracy, precision, recall, F1 score vs targets
- **Model Information**: Architecture, training data, update schedule
- **Detection Categories**: Cardiac, respiratory, glucose anomaly accuracy
- **Retrain Model Button**

## Interactive Features

### Live Updating Elements:
- Real-time clock in headers
- Animated vital signs with pulsing indicators
- Auto-updating charts every 3-5 seconds
- Status indicators with pulse animations

### Clickable Navigation:
- Patient cards → Detail view
- Alert notifications → Alert screen
- Security status → Analytics dashboard
- Back buttons to return to dashboard

### Hover States:
- Buttons darken and show shadow
- Cards elevate slightly
- Tooltips on data points

### Responsive Design:
- 3-column grid collapses on smaller screens
- Mobile-friendly touch targets
- Readable on all device sizes

## Color System

- **Primary Blue** (#1A5FB4): Healthcare/system color
- **Safe Green** (#2EC27E): Normal status, success
- **Warning Yellow** (#E5A50A): Caution, warnings
- **Alert Red** (#C01C28): Critical alerts, errors
- **Background** (#F6F5F4): Light gray canvas
- **Card White** (#FFFFFF): Content cards
- **Text Dark** (#1E1E1E): Primary text

## Typography

- **Font Family**: Inter (primary), Roboto Mono (code/data)
- **Headings**: Semi-bold, 24-32px
- **Body**: Regular, 14-16px
- **Labels**: Medium, 12px
- **Code**: Roboto Mono, 13px

## Data Security Features

1. **HMAC-SHA256** message authentication
2. **AES-256-GCM** data encryption
3. **RSA-2048** digital signatures
4. **ECDH P-256** key exchange
5. Real-time integrity verification
6. Automatic key rotation
7. Attack detection and blocking
8. Audit logging

## AI/ML Features

1. **LSTM Neural Network** for anomaly detection
2. **92.3% accuracy** rate
3. **4.1% false positive** rate
4. **150ms average** response time
5. Multiple detection categories (cardiac, respiratory, glucose)
6. Confidence scoring
7. Pattern recognition
8. Model retraining capability

## Mock Data

- 5 sample patients with complete medical profiles
- Real-time vital signs simulation
- Alert history with multiple severity levels
- Attack logs with blocked attempts
- 24-hour historical trend data
- Security metrics and performance data

## User Flows

1. **Login Flow**: Login screen → Dashboard
2. **Patient Monitoring**: Dashboard → Patient list selection → Detail view
3. **Alert Response**: Dashboard → Alert notification → Alert screen → Acknowledge → Dashboard
4. **Security Review**: Dashboard → Security button → Analytics tabs
5. **Logout**: Dashboard → Logout button → Login screen

## Technical Implementation

- **React 18** with TypeScript
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **Motion/React** for animations (ready for enhanced animations)
- Real-time data simulation with intervals
- Component-based architecture
- Clean state management

## Professional Healthcare Design

- Clear visual hierarchy
- Medical-appropriate color usage
- Professional typography
- Accessible contrast ratios
- Realistic medical terminology
- Industry-standard vital ranges
- Clean, uncluttered layouts
- Emphasis on critical information
