import { Patient, Alert } from '../App';

export const mockPatients: Patient[] = [
  // Patient 1: Female, 37y, HR=60, O2=95.7%, BP=124/86, High Risk
  {
    id: '1',
    name: 'Sarah Johnson',
    room: '301',
    status: 'critical',
    age: 37,
    weight: '92 kg',
    conditions: ['High Risk Patient', 'Hypertension'],
    medications: ['Lisinopril 10mg', 'Metformin 500mg'],
    doctor: 'Dr. Emily Chen',
    vitalSigns: {
      heartRate: 60,
      bloodPressure: '124/86',
      oxygen: 96,
      glucose: 105,
      temperature: 36.9,
    },
    aiAnalysis: {
      status: 'anomaly',
      confidence: 0.89,
      pattern: 'Elevated Blood Pressure',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '2 seconds ago',
      sensorId: 'IoT-Sensor-7A3B',
      signatureValid: true,
    },
  },
  // Patient 2: Male, 77y, HR=63, O2=96.7%, BP=126/84, High Risk
  {
    id: '2',
    name: 'Michael Torres',
    room: '302',
    status: 'critical',
    age: 77,
    weight: '78 kg',
    conditions: ['High Risk Patient', 'Cardiac Monitoring'],
    medications: ['Warfarin 5mg', 'Metoprolol 50mg'],
    doctor: 'Dr. James Wilson',
    vitalSigns: {
      heartRate: 63,
      bloodPressure: '126/84',
      oxygen: 97,
      glucose: 102,
      temperature: 36.5,
    },
    aiAnalysis: {
      status: 'anomaly',
      confidence: 0.91,
      pattern: 'Elevated Blood Pressure',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '1 seconds ago',
      sensorId: 'IoT-Sensor-8B4C',
      signatureValid: true,
    },
  },
  // Patient 3: Female, 68y, HR=63, O2=98.5%, BP=131/78, Low Risk
  {
    id: '3',
    name: 'Emma Davis',
    room: '303',
    status: 'warning',
    age: 68,
    weight: '65 kg',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: ['Amlodipine 5mg', 'Metformin 500mg'],
    doctor: 'Dr. Maria Rodriguez',
    vitalSigns: {
      heartRate: 63,
      bloodPressure: '131/78',
      oxygen: 99,
      glucose: 108,
      temperature: 37.1,
    },
    aiAnalysis: {
      status: 'normal',
      confidence: 0.87,
      pattern: 'Elevated Blood Pressure',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '3 seconds ago',
      sensorId: 'IoT-Sensor-9C5D',
      signatureValid: true,
    },
  },
  // Patient 4: Female, 41y, HR=90, O2=95.0%, BP=118/72, High Risk
  {
    id: '4',
    name: 'Jessica Martinez',
    room: '304',
    status: 'critical',
    age: 41,
    weight: '71 kg',
    conditions: ['High Risk Patient', 'Tachycardia Risk'],
    medications: ['Metoprolol 25mg', 'Aspirin 81mg'],
    doctor: 'Dr. Robert Lee',
    vitalSigns: {
      heartRate: 90,
      bloodPressure: '118/72',
      oxygen: 95,
      glucose: 112,
      temperature: 36.7,
    },
    aiAnalysis: {
      status: 'anomaly',
      confidence: 0.88,
      pattern: 'Elevated Heart Rate',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '1 seconds ago',
      sensorId: 'IoT-Sensor-1D6E',
      signatureValid: true,
    },
  },
  // Patient 5: Female, 25y, HR=69, O2=98.6%, BP=138/76, High Risk
  {
    id: '5',
    name: 'Amanda Wilson',
    room: '305',
    status: 'critical',
    age: 25,
    weight: '58 kg',
    conditions: ['High Risk Patient', 'Hypertension'],
    medications: ['Lisinopril 10mg', 'Amlodipine 5mg'],
    doctor: 'Dr. Sarah Johnson',
    vitalSigns: {
      heartRate: 69,
      bloodPressure: '138/76',
      oxygen: 99,
      glucose: 95,
      temperature: 37.0,
    },
    aiAnalysis: {
      status: 'anomaly',
      confidence: 0.92,
      pattern: 'Elevated Blood Pressure',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '2 seconds ago',
      sensorId: 'IoT-Sensor-2E7F',
      signatureValid: true,
    },
  },
  // Patient 6: Male, 55y, HR=78, O2=97.2%, BP=122/80, Normal
  {
    id: '6',
    name: 'Robert Anderson',
    room: '306',
    status: 'normal',
    age: 55,
    weight: '85 kg',
    conditions: ['Post-Surgery Recovery'],
    medications: ['Ibuprofen 400mg', 'Acetaminophen 500mg'],
    doctor: 'Dr. Emily Chen',
    vitalSigns: {
      heartRate: 78,
      bloodPressure: '122/80',
      oxygen: 97,
      glucose: 98,
      temperature: 36.8,
    },
    aiAnalysis: {
      status: 'normal',
      confidence: 0.95,
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '4 seconds ago',
      sensorId: 'IoT-Sensor-3F8G',
      signatureValid: true,
    },
  },
  // Patient 7: Female, 62y, HR=88, O2=94.8%, BP=142/88, High Risk
  {
    id: '7',
    name: 'Patricia Thompson',
    room: '307',
    status: 'critical',
    age: 62,
    weight: '73 kg',
    conditions: ['High Risk Patient', 'Hypertension', 'Atrial Fibrillation'],
    medications: ['Warfarin 5mg', 'Lisinopril 20mg', 'Metoprolol 100mg'],
    doctor: 'Dr. James Wilson',
    vitalSigns: {
      heartRate: 88,
      bloodPressure: '142/88',
      oxygen: 95,
      glucose: 118,
      temperature: 37.3,
    },
    aiAnalysis: {
      status: 'anomaly',
      confidence: 0.93,
      pattern: 'Elevated Blood Pressure & Heart Rate',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '1 seconds ago',
      sensorId: 'IoT-Sensor-4G9H',
      signatureValid: true,
    },
  },
  // Patient 8: Male, 34y, HR=72, O2=98.9%, BP=115/72, Normal
  {
    id: '8',
    name: 'David Lee',
    room: '308',
    status: 'normal',
    age: 34,
    weight: '76 kg',
    conditions: ['Observation'],
    medications: ['None'],
    doctor: 'Dr. Maria Rodriguez',
    vitalSigns: {
      heartRate: 72,
      bloodPressure: '115/72',
      oxygen: 99,
      glucose: 92,
      temperature: 36.6,
    },
    aiAnalysis: {
      status: 'normal',
      confidence: 0.97,
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '3 seconds ago',
      sensorId: 'IoT-Sensor-5H1I',
      signatureValid: true,
    },
  },
  // Patient 9: Female, 81y, HR=58, O2=93.5%, BP=135/82, Warning
  {
    id: '9',
    name: 'Margaret Brown',
    room: '309',
    status: 'warning',
    age: 81,
    weight: '62 kg',
    conditions: ['Bradycardia', 'Hypertension', 'Osteoporosis'],
    medications: ['Alendronate 70mg', 'Amlodipine 10mg'],
    doctor: 'Dr. Robert Lee',
    vitalSigns: {
      heartRate: 58,
      bloodPressure: '135/82',
      oxygen: 94,
      glucose: 102,
      temperature: 36.4,
    },
    aiAnalysis: {
      status: 'normal',
      confidence: 0.84,
      pattern: 'Low Heart Rate',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '2 seconds ago',
      sensorId: 'IoT-Sensor-6I2J',
      signatureValid: true,
    },
  },
  // Patient 10: Male, 49y, HR=95, O2=96.1%, BP=128/84, Warning
  {
    id: '10',
    name: 'Christopher Garcia',
    room: '310',
    status: 'warning',
    age: 49,
    weight: '94 kg',
    conditions: ['Tachycardia', 'Type 2 Diabetes', 'Obesity'],
    medications: ['Metformin 1000mg', 'Atorvastatin 20mg'],
    doctor: 'Dr. Emily Chen',
    vitalSigns: {
      heartRate: 95,
      bloodPressure: '128/84',
      oxygen: 96,
      glucose: 145,
      temperature: 37.2,
    },
    aiAnalysis: {
      status: 'anomaly',
      confidence: 0.86,
      pattern: 'Elevated Heart Rate & Glucose',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '3 seconds ago',
      sensorId: 'IoT-Sensor-7J3K',
      signatureValid: true,
    },
  },
  // Patient 11: Female, 28y, HR=68, O2=99.1%, BP=118/76, Normal
  {
    id: '11',
    name: 'Jennifer Taylor',
    room: '311',
    status: 'normal',
    age: 28,
    weight: '64 kg',
    conditions: ['Routine Checkup'],
    medications: ['Prenatal Vitamins'],
    doctor: 'Dr. Sarah Johnson',
    vitalSigns: {
      heartRate: 68,
      bloodPressure: '118/76',
      oxygen: 99,
      glucose: 88,
      temperature: 36.7,
    },
    aiAnalysis: {
      status: 'normal',
      confidence: 0.98,
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '2 seconds ago',
      sensorId: 'IoT-Sensor-8K4L',
      signatureValid: true,
    },
  },
  // Patient 12: Male, 70y, HR=92, O2=92.8%, BP=148/92, Critical
  {
    id: '12',
    name: 'William Martinez',
    room: '312',
    status: 'critical',
    age: 70,
    weight: '88 kg',
    conditions: ['High Risk Patient', 'COPD', 'Hypertension'],
    medications: ['Albuterol Inhaler', 'Lisinopril 20mg', 'Prednisone 10mg'],
    doctor: 'Dr. James Wilson',
    vitalSigns: {
      heartRate: 92,
      bloodPressure: '148/92',
      oxygen: 93,
      glucose: 108,
      temperature: 37.4,
    },
    aiAnalysis: {
      status: 'anomaly',
      confidence: 0.94,
      pattern: 'Low Oxygen & Elevated BP',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '1 seconds ago',
      sensorId: 'IoT-Sensor-9L5M',
      signatureValid: true,
    },
  },
  // Patient 13: Female, 45y, HR=76, O2=98.3%, BP=120/78, Normal
  {
    id: '13',
    name: 'Linda Rodriguez',
    room: '313',
    status: 'normal',
    age: 45,
    weight: '69 kg',
    conditions: ['Annual Physical'],
    medications: ['Multivitamin'],
    doctor: 'Dr. Maria Rodriguez',
    vitalSigns: {
      heartRate: 76,
      bloodPressure: '120/78',
      oxygen: 98,
      glucose: 94,
      temperature: 36.9,
    },
    aiAnalysis: {
      status: 'normal',
      confidence: 0.96,
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '4 seconds ago',
      sensorId: 'IoT-Sensor-1M6N',
      signatureValid: true,
    },
  },
  // Patient 14: Male, 58y, HR=101, O2=95.5%, BP=152/96, Critical
  {
    id: '14',
    name: 'James Wilson',
    room: '314',
    status: 'critical',
    age: 58,
    weight: '102 kg',
    conditions: ['High Risk Patient', 'Hypertension', 'Tachycardia', 'Obesity'],
    medications: ['Metoprolol 100mg', 'Amlodipine 10mg', 'Atorvastatin 40mg'],
    doctor: 'Dr. Robert Lee',
    vitalSigns: {
      heartRate: 101,
      bloodPressure: '152/96',
      oxygen: 96,
      glucose: 132,
      temperature: 37.1,
    },
    aiAnalysis: {
      status: 'anomaly',
      confidence: 0.96,
      pattern: 'Severe Hypertension & Tachycardia',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '1 seconds ago',
      sensorId: 'IoT-Sensor-2N7O',
      signatureValid: true,
    },
  },
  // Patient 15: Female, 52y, HR=82, O2=97.8%, BP=126/82, Warning
  {
    id: '15',
    name: 'Barbara Davis',
    room: '315',
    status: 'warning',
    age: 52,
    weight: '71 kg',
    conditions: ['Hypertension', 'Hypothyroidism'],
    medications: ['Levothyroxine 75mcg', 'Lisinopril 10mg'],
    doctor: 'Dr. Emily Chen',
    vitalSigns: {
      heartRate: 82,
      bloodPressure: '126/82',
      oxygen: 98,
      glucose: 101,
      temperature: 36.8,
    },
    aiAnalysis: {
      status: 'normal',
      confidence: 0.89,
      pattern: 'Elevated Blood Pressure',
    },
    cryptoStatus: {
      verified: true,
      lastVerified: '3 seconds ago',
      sensorId: 'IoT-Sensor-3O8P',
      signatureValid: true,
    },
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    room: '301',
    type: 'Elevated Blood Pressure',
    severity: 'critical',
    vitalSign: 'Blood Pressure',
    value: '124/86',
    normalRange: '90-120/60-80 mmHg',
    timeDetected: '14:32:45',
    aiScore: 0.89,
    cryptoVerified: true,
    acknowledged: false,
  },
  {
    id: 'alert-2',
    patientId: '2',
    patientName: 'Michael Torres',
    room: '302',
    type: 'Elevated Blood Pressure',
    severity: 'critical',
    vitalSign: 'Blood Pressure',
    value: '126/84',
    normalRange: '90-120/60-80 mmHg',
    timeDetected: '14:15:22',
    aiScore: 0.91,
    cryptoVerified: true,
    acknowledged: true,
  },
  {
    id: 'alert-3',
    patientId: '4',
    patientName: 'Jessica Martinez',
    room: '304',
    type: 'Elevated Heart Rate',
    severity: 'critical',
    vitalSign: 'Heart Rate',
    value: '90 BPM',
    normalRange: '60-100 BPM',
    timeDetected: '14:28:15',
    aiScore: 0.88,
    cryptoVerified: true,
    acknowledged: false,
  },
  {
    id: 'alert-4',
    patientId: '7',
    patientName: 'Patricia Thompson',
    room: '307',
    type: 'Elevated Blood Pressure & Heart Rate',
    severity: 'critical',
    vitalSign: 'Multiple',
    value: '142/88 BP, 88 BPM',
    normalRange: '90-120/60-80 mmHg, 60-100 BPM',
    timeDetected: '14:45:10',
    aiScore: 0.93,
    cryptoVerified: true,
    acknowledged: false,
  },
  {
    id: 'alert-5',
    patientId: '12',
    patientName: 'William Martinez',
    room: '312',
    type: 'Low Oxygen & Elevated BP',
    severity: 'critical',
    vitalSign: 'Oxygen & Blood Pressure',
    value: '93% SpO2, 148/92',
    normalRange: '95-100% SpO2, 90-120/60-80 mmHg',
    timeDetected: '14:38:22',
    aiScore: 0.94,
    cryptoVerified: true,
    acknowledged: false,
  },
  {
    id: 'alert-6',
    patientId: '14',
    patientName: 'James Wilson',
    room: '314',
    type: 'Severe Hypertension & Tachycardia',
    severity: 'critical',
    vitalSign: 'Blood Pressure & Heart Rate',
    value: '152/96, 101 BPM',
    normalRange: '90-120/60-80 mmHg, 60-100 BPM',
    timeDetected: '14:50:05',
    aiScore: 0.96,
    cryptoVerified: true,
    acknowledged: false,
  },
];

export const mockAttacks = [
  {
    id: 'attack-1',
    type: 'Replay Attack Attempt',
    source: 'Unknown device',
    target: 'IoT-Sensor-7A3B',
    timestamp: '2024-12-18 13:45:12',
    status: 'Blocked',
    severity: 'high',
  },
  {
    id: 'attack-2',
    type: 'Data Tampering',
    source: '192.168.1.xxx',
    target: 'IoT-Sensor-2C4D',
    timestamp: '2024-12-18 12:30:45',
    status: 'Blocked',
    severity: 'critical',
  },
];

export const generateVitalSignsHistory = (baseValue: number, variance: number, points: number = 24) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `${23 - i}:00`,
    value: Math.round(baseValue + (Math.random() - 0.5) * variance),
  })).reverse();
};

/**
 * Generate blood pressure history data
 * @param systolicBase - Base systolic value or BP string like "120/80"
 * @param diastolicBase - Base diastolic value (optional if first param is string)
 * @param variance - Variance in values
 * @param points - Number of data points
 */
export const generateBloodPressureHistory = (
  systolicBase: number | string, 
  diastolicBase?: number, 
  variance: number = 10, 
  points: number = 24
) => {
  let systolic: number;
  let diastolic: number;

  // Parse BP string like "120/80" or use provided numbers
  if (typeof systolicBase === 'string') {
    const parts = systolicBase.split('/');
    systolic = parseInt(parts[0]);
    diastolic = parseInt(parts[1]);
  } else {
    systolic = systolicBase;
    diastolic = diastolicBase || 80;
  }

  return Array.from({ length: points }, (_, i) => ({
    time: `${23 - i}:00`,
    systolic: Math.round(systolic + (Math.random() - 0.5) * variance),
    diastolic: Math.round(diastolic + (Math.random() - 0.5) * (variance * 0.7)),
  })).reverse();
};

export const securityMetrics = {
  uptime: 99.8,
  activeConnections: 15,
  failedAuthAttempts: 3,
  dataIntegrityRate: 100,
  attacksDetected: 47,
  hmacSuccessRate: 99.9,
  digitalSignaturesIssued: 1845,
  aiAccuracy: 92.3,
  falsePositiveRate: 4.1,
  responseTime: 150,
};

export const attackTypeDistribution = [
  { name: 'Data Tampering', value: 45, color: '#C01C28' },
  { name: 'Replay Attacks', value: 30, color: '#E5A50A' },
  { name: 'Spoofing', value: 15, color: '#1A5FB4' },
  { name: 'Other', value: 10, color: '#717182' },
];