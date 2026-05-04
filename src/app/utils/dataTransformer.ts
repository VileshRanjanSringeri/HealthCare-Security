/**
 * Data Transformer for MedSec-25 IoMT Dataset
 * 
 * Transforms network flow records into patient-centric healthcare IoT data
 * Maps real cybersecurity data to synthetic patient identities
 */

import { NetworkFlowRecord, PatientDeviceMapping, PatientHealthRecord, analyzeNetworkFlow } from './csvParser';
import { Patient, Alert } from '../App';

// Synthetic patient name pool
const PATIENT_NAMES = [
  'John Doe', 'Jane Smith', 'Michael Johnson', 'Sarah Williams', 'David Brown',
  'Emily Davis', 'Robert Miller', 'Maria Garcia', 'James Wilson', 'Jennifer Martinez',
  'William Anderson', 'Linda Taylor', 'Richard Thomas', 'Patricia Moore', 'Joseph Jackson',
  'Elizabeth White', 'Thomas Harris', 'Barbara Martin', 'Christopher Thompson', 'Nancy Garcia',
  'Daniel Rodriguez', 'Jessica Lee', 'Matthew Lewis', 'Karen Walker', 'Anthony Hall',
  'Susan Allen', 'Mark Young', 'Betty King', 'Donald Wright', 'Lisa Lopez',
  'Paul Hill', 'Sandra Scott', 'Andrew Green', 'Carol Adams', 'Joshua Baker',
  'Dorothy Nelson', 'Kenneth Carter', 'Donna Mitchell', 'Kevin Perez', 'Michelle Roberts',
  'Brian Turner', 'Ashley Phillips', 'George Campbell', 'Kimberly Parker', 'Edward Evans',
  'Amanda Edwards', 'Ronald Collins', 'Melissa Stewart', 'Timothy Morris', 'Deborah Rogers',
  'Jason Reed', 'Stephanie Cook', 'Jeffrey Morgan', 'Rebecca Bell', 'Ryan Murphy',
  'Laura Bailey', 'Jacob Rivera', 'Sharon Cooper', 'Gary Richardson', 'Cynthia Cox',
  'Nicholas Howard', 'Kathleen Ward', 'Eric Torres', 'Amy Peterson', 'Stephen Gray',
  'Angela Ramirez', 'Jonathan James', 'Shirley Watson', 'Brandon Brooks', 'Anna Kelly',
  'Benjamin Sanders', 'Brenda Price', 'Samuel Bennett', 'Pamela Wood', 'Raymond Ross',
  'Martha Henderson', 'Patrick Coleman', 'Debra Jenkins', 'Adam Perry', 'Janet Powell',
  'Peter Long', 'Carolyn Patterson', 'Zachary Hughes', 'Rachel Flores', 'Harold Washington',
  'Heather Butler', 'Nathan Simmons', 'Diane Foster', 'Douglas Gonzales', 'Julie Bryant',
  'Henry Alexander', 'Joyce Russell', 'Carl Griffin', 'Virginia Hayes', 'Arthur Myers',
  'Katherine Ford', 'Ryan Hamilton', 'Christina Graham', 'Sean Sullivan', 'Frances Wallace'
];

const MEDICAL_CONDITIONS = [
  ['Hypertension', 'Type 2 Diabetes'],
  ['Cardiac Arrhythmia', 'Sleep Apnea'],
  ['Coronary Artery Disease', 'Hypertension'],
  ['Asthma', 'Allergies'],
  ['COPD', 'Hypertension'],
  ['Post-Surgical Recovery'],
  ['Atrial Fibrillation'],
  ['Chronic Heart Failure'],
  ['Type 1 Diabetes'],
  ['Pulmonary Hypertension'],
];

const MEDICATIONS = [
  ['Metformin 500mg', 'Lisinopril 10mg'],
  ['Warfarin 5mg', 'Metoprolol 50mg'],
  ['Aspirin 81mg', 'Atorvastatin 40mg'],
  ['Albuterol Inhaler', 'Montelukast 10mg'],
  ['Furosemide 40mg', 'Carvedilol 25mg'],
  ['Amoxicillin 500mg', 'Acetaminophen 500mg'],
  ['Apixaban 5mg', 'Digoxin 0.25mg'],
  ['Enalapril 10mg', 'Spironolactone 25mg'],
  ['Insulin Glargine', 'Insulin Lispro'],
  ['Sildenafil 20mg', 'Tadalafil 20mg'],
];

const DOCTORS = [
  'Dr. Emily Chen',
  'Dr. James Wilson',
  'Dr. Maria Rodriguez',
  'Dr. Robert Lee',
  'Dr. Sarah Johnson',
  'Dr. Michael Brown',
  'Dr. Jennifer Davis',
  'Dr. David Miller',
  'Dr. Lisa Anderson',
  'Dr. Thomas White',
];

/**
 * Transform network flow records into patient data with IoT devices
 */
export function transformToPatientData(
  records: NetworkFlowRecord[],
  patientCount: number = 50
): { patients: Patient[]; alerts: Alert[]; deviceMappings: PatientDeviceMapping[] } {
  
  // Group records by unique source IP (treat as IoT device)
  const deviceGroups = groupByDevice(records);
  const deviceIds = Object.keys(deviceGroups);

  // Limit to requested patient count
  const selectedDevices = deviceIds.slice(0, Math.min(patientCount, deviceIds.length));

  const patients: Patient[] = [];
  const alerts: Alert[] = [];
  const deviceMappings: PatientDeviceMapping[] = [];

  selectedDevices.forEach((deviceIp, index) => {
    const flows = deviceGroups[deviceIp];
    const patientId = String(index + 1);
    const patientName = PATIENT_NAMES[index % PATIENT_NAMES.length];
    const room = `${300 + index}`;
    const deviceId = `IoT-Sensor-${generateDeviceId(index)}`;

    // Analyze all flows for this device
    const flowAnalyses = flows.map(flow => analyzeNetworkFlow(flow));
    const attackFlows = flowAnalyses.filter(a => a.isAttack);
    const hasAttacks = attackFlows.length > 0;

    // Calculate patient status based on attacks
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    let aiStatus: 'normal' | 'anomaly' = 'normal';
    let aiPattern: string | undefined = undefined;
    let cryptoVerified = true;
    let signatureValid = true;

    const avgAnomalyScore = flowAnalyses.reduce((sum, a) => sum + a.anomalyScore, 0) / flowAnalyses.length;
    const avgConfidence = flowAnalyses.reduce((sum, a) => sum + a.confidence, 0) / flowAnalyses.length;

    if (hasAttacks) {
      const attackCount = attackFlows.length;
      const attackRatio = attackCount / flows.length;

      if (attackRatio > 0.3 || attackCount > 5) {
        status = 'critical';
        aiStatus = 'anomaly';
        cryptoVerified = Math.random() > 0.3; // 30% chance of failed verification during attack
        signatureValid = cryptoVerified;
      } else if (attackRatio > 0.1 || attackCount > 2) {
        status = 'warning';
        aiStatus = 'anomaly';
        cryptoVerified = Math.random() > 0.1; // 10% chance of failed verification
      }

      const latestAttack = attackFlows[attackFlows.length - 1];
      aiPattern = `${latestAttack.attackType} Detected`;

      // Create alert for high-severity attacks
      if (status === 'critical' || (status === 'warning' && Math.random() > 0.5)) {
        alerts.push({
          id: `alert-${patientId}`,
          patientId,
          patientName,
          room,
          type: latestAttack.attackType,
          severity: status === 'critical' ? 'critical' : 'warning',
          vitalSign: 'Network Security',
          value: `${attackFlows.length} suspicious flows detected`,
          normalRange: 'No attacks expected',
          timeDetected: formatTime(new Date()),
          aiScore: latestAttack.anomalyScore,
          cryptoVerified,
          acknowledged: Math.random() > 0.5,
        });
      }
    }

    // Generate realistic vital signs (with slight variation for compromised devices)
    const baseVitals = generateBaseVitals(index);
    if (!cryptoVerified) {
      // Compromised devices show slightly abnormal readings
      baseVitals.heartRate = Math.max(45, Math.min(120, baseVitals.heartRate + (Math.random() - 0.5) * 30));
      baseVitals.oxygen = Math.max(88, Math.min(100, baseVitals.oxygen + (Math.random() - 0.5) * 8));
    }

    const patient: Patient = {
      id: patientId,
      name: patientName,
      room,
      status,
      age: 25 + Math.floor(Math.random() * 60),
      weight: `${50 + Math.floor(Math.random() * 50)} kg`,
      conditions: MEDICAL_CONDITIONS[index % MEDICAL_CONDITIONS.length],
      medications: MEDICATIONS[index % MEDICATIONS.length],
      doctor: DOCTORS[index % DOCTORS.length],
      vitalSigns: baseVitals,
      aiAnalysis: {
        status: aiStatus,
        confidence: Math.round(avgConfidence * 100) / 100,
        pattern: aiPattern,
      },
      cryptoStatus: {
        verified: cryptoVerified,
        lastVerified: `${Math.floor(Math.random() * 5) + 1} seconds ago`,
        sensorId: deviceId,
        signatureValid,
      },
      // Store network flow data for detailed view
      networkFlows: flows.slice(0, 10), // Keep up to 10 flows per patient
    };

    patients.push(patient);

    // Store device mapping
    const lastAttackFlow = attackFlows.length > 0 ? flows[flows.length - 1] : null;
    deviceMappings.push({
      patientId,
      patientName,
      deviceId,
      deviceIp,
      networkFlows: flows,
      securityStatus: status === 'critical' ? 'compromised' : status === 'warning' ? 'warning' : 'secure',
      anomalyScore: Math.round(avgAnomalyScore * 100),
      attacksDetected: attackFlows.length,
      lastAttackType: attackFlows.length > 0 ? attackFlows[attackFlows.length - 1].attackType : null,
      lastAttackTime: lastAttackFlow ? lastAttackFlow.timestamp : null,
    });
  });

  return { patients, alerts, deviceMappings };
}

function groupByDevice(records: NetworkFlowRecord[]): Record<string, NetworkFlowRecord[]> {
  const groups: Record<string, NetworkFlowRecord[]> = {};
  
  records.forEach(record => {
    const key = record.srcIp; // Group by source IP (IoT device)
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(record);
  });

  return groups;
}

function generateDeviceId(index: number): string {
  const chars = '0123456789ABCDEF';
  const part1 = Math.floor(index / 16).toString(16).toUpperCase();
  const part2 = (index % 16).toString(16).toUpperCase();
  const part3 = chars[Math.floor(Math.random() * 16)];
  const part4 = chars[Math.floor(Math.random() * 16)];
  return `${part1}${part2}${part3}${part4}`;
}

function generateBaseVitals(seed: number) {
  const random = (min: number, max: number) => Math.floor(min + (seed * 7 + Math.random() * 100) % (max - min));
  
  const heartRate = random(60, 85);
  const bpSys = random(110, 130);
  const bpDia = random(70, 85);
  const oxygen = random(95, 100);
  const glucose = random(85, 115);
  const temperature = 36.0 + Math.round((random(0, 20) / 10) * 10) / 10;

  return {
    heartRate,
    bloodPressure: `${bpSys}/${bpDia}`,
    oxygen,
    glucose,
    temperature,
  };
}

function formatTime(date: Date): string {
  return date.toTimeString().split(' ')[0]; // HH:MM:SS
}

/**
 * Generate historical vital signs data with network flow influence
 */
export function generateVitalSignsWithFlowData(
  baseValue: number,
  flows: NetworkFlowRecord[],
  points: number = 24
): Array<{ time: string; value: number }> {
  const history: Array<{ time: string; value: number }> = [];
  
  for (let i = 0; i < points; i++) {
    const hour = 23 - i;
    const time = `${hour.toString().padStart(2, '0')}:00`;
    
    // Check if there are attack flows around this time
    const hasAttackNearby = flows.some(flow => {
      const analysis = analyzeNetworkFlow(flow);
      return analysis.isAttack && Math.random() > 0.7;
    });

    // Add variance - higher during attacks
    const variance = hasAttackNearby ? 15 : 5;
    const value = Math.round(baseValue + (Math.random() - 0.5) * variance);
    
    history.unshift({ time, value });
  }

  return history;
}

/**
 * Extract security metrics from all network flows
 */
export function calculateSecurityMetrics(deviceMappings: PatientDeviceMapping[]) {
  const totalFlows = deviceMappings.reduce((sum, d) => sum + d.networkFlows.length, 0);
  const totalAttacks = deviceMappings.reduce((sum, d) => sum + d.attacksDetected, 0);
  const compromisedDevices = deviceMappings.filter(d => d.securityStatus === 'compromised').length;
  const warningDevices = deviceMappings.filter(d => d.securityStatus === 'warning').length;
  
  const avgAnomalyScore = deviceMappings.reduce((sum, d) => sum + d.anomalyScore, 0) / deviceMappings.length;

  return {
    uptime: 99.8 - (compromisedDevices * 0.1),
    activeConnections: deviceMappings.length,
    failedAuthAttempts: Math.floor(totalAttacks * 0.3),
    dataIntegrityRate: Math.max(95, 100 - compromisedDevices * 2),
    attacksDetected: totalAttacks,
    hmacSuccessRate: Math.max(95, 100 - compromisedDevices * 1.5),
    digitalSignaturesIssued: totalFlows,
    aiAccuracy: 90 + Math.random() * 5,
    falsePositiveRate: 2 + Math.random() * 3,
    responseTime: 120 + Math.floor(Math.random() * 80),
    compromisedDevices,
    warningDevices,
    avgAnomalyScore: Math.round(avgAnomalyScore),
  };
}

/**
 * Generate attack type distribution from network flows
 */
export function generateAttackDistribution(deviceMappings: PatientDeviceMapping[]) {
  const attackTypes: Record<string, number> = {};

  deviceMappings.forEach(device => {
    device.networkFlows.forEach(flow => {
      const analysis = analyzeNetworkFlow(flow);
      if (analysis.isAttack) {
        const type = analysis.attackType;
        attackTypes[type] = (attackTypes[type] || 0) + 1;
      }
    });
  });

  const colors = ['#C01C28', '#E5A50A', '#F66151', '#FF7800', '#99C1F1', '#717182'];
  
  return Object.entries(attackTypes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6) // Top 6 attack types
    .map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
}

/**
 * Transform PatientHealthRecords (from CSV) into Patient data
 * This is for the new patient health monitoring dataset format
 */
export function transformPatientHealthRecords(
  records: PatientHealthRecord[],
  maxPatients: number = 50
): { patients: Patient[]; alerts: Alert[]; securityMetrics: any; attackDistribution: any[] } {
  
  const patients: Patient[] = [];
  const alerts: Alert[] = [];
  
  // Take a subset of patients
  const selectedRecords = records.slice(0, Math.min(maxPatients, records.length));

  selectedRecords.forEach((record, index) => {
    const patientId = record.patientId || `P${String(index + 1).padStart(3, '0')}`;
    const patientName = PATIENT_NAMES[index % PATIENT_NAMES.length];
    const room = `${300 + index}`;
    const deviceId = `IoT-Sensor-${generateDeviceId(index)}`;

    // Determine status based on risk category and vital signs
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    let aiStatus: 'normal' | 'anomaly' = 'normal';
    let aiPattern: string | undefined = undefined;

    // Analyze risk category
    const riskLower = record.riskCategory.toLowerCase();
    if (riskLower.includes('high') || riskLower.includes('critical')) {
      status = 'critical';
      aiStatus = 'anomaly';
    } else if (riskLower.includes('medium') || riskLower.includes('warning') || riskLower.includes('moderate')) {
      status = 'warning';
    }

    // Analyze vital signs for anomalies
    const anomalies: string[] = [];
    
    // Heart rate analysis
    if (record.heartRate < 50) {
      anomalies.push('Potential Bradycardia Detected');
      status = 'critical';
      aiStatus = 'anomaly';
    } else if (record.heartRate > 100) {
      anomalies.push('Elevated Heart Rate');
      if (status === 'normal') status = 'warning';
    }

    // Oxygen saturation analysis
    if (record.oxygenSaturation < 90) {
      anomalies.push('Low Oxygen Saturation Detected');
      status = 'critical';
      aiStatus = 'anomaly';
    } else if (record.oxygenSaturation < 95) {
      anomalies.push('Below Normal Oxygen Levels');
      if (status === 'normal') status = 'warning';
    }

    // Blood pressure analysis
    if (record.systolicBP > 140 || record.diastolicBP > 90) {
      anomalies.push('Elevated Blood Pressure');
      if (status === 'normal') status = 'warning';
    } else if (record.systolicBP < 90 || record.diastolicBP < 60) {
      anomalies.push('Low Blood Pressure');
      if (status === 'normal') status = 'warning';
    }

    // Temperature analysis
    if (record.bodyTemp > 38.0) {
      anomalies.push('Fever Detected');
      if (status === 'normal') status = 'warning';
    } else if (record.bodyTemp < 36.0) {
      anomalies.push('Hypothermia Risk');
      if (status === 'normal') status = 'warning';
    }

    // Respiratory rate analysis
    if (record.respiratoryRate < 12 || record.respiratoryRate > 20) {
      anomalies.push('Abnormal Respiratory Rate');
      if (status === 'normal') status = 'warning';
    }

    if (anomalies.length > 0) {
      aiPattern = anomalies[0]; // Use first anomaly as primary pattern
    }

    // Calculate AI confidence based on data quality and risk
    const confidence = 0.85 + Math.random() * 0.12; // 85-97% confidence

    // Crypto verification (simulated - most devices verified)
    const cryptoVerified = Math.random() > 0.05; // 95% verification rate
    const signatureValid = cryptoVerified;

    const patient: Patient = {
      id: patientId,
      name: patientName,
      room,
      status,
      age: record.age,
      weight: `${Math.round(record.weight)} kg`,
      conditions: MEDICAL_CONDITIONS[index % MEDICAL_CONDITIONS.length],
      medications: MEDICATIONS[index % MEDICATIONS.length],
      doctor: DOCTORS[index % DOCTORS.length],
      vitalSigns: {
        heartRate: Math.round(record.heartRate),
        bloodPressure: `${record.systolicBP}/${record.diastolicBP}`,
        oxygen: Math.round(record.oxygenSaturation),
        glucose: 90 + Math.floor(Math.random() * 40), // Glucose not in CSV, generate
        temperature: Math.round(record.bodyTemp * 10) / 10,
      },
      aiAnalysis: {
        status: aiStatus,
        confidence: Math.round(confidence * 100) / 100,
        pattern: aiPattern,
      },
      cryptoStatus: {
        verified: cryptoVerified,
        lastVerified: `${Math.floor(Math.random() * 5) + 1} seconds ago`,
        sensorId: deviceId,
        signatureValid,
      },
    };

    patients.push(patient);

    // Create alerts for critical/warning patients
    if (status === 'critical' || (status === 'warning' && anomalies.length > 0 && Math.random() > 0.5)) {
      const primaryAnomaly = anomalies[0] || 'Health Anomaly Detected';
      const vitalSign = primaryAnomaly.includes('Heart') ? 'Heart Rate' :
                       primaryAnomaly.includes('Oxygen') ? 'Oxygen Saturation' :
                       primaryAnomaly.includes('Pressure') ? 'Blood Pressure' :
                       primaryAnomaly.includes('Temperature') ? 'Temperature' :
                       primaryAnomaly.includes('Respiratory') ? 'Respiratory Rate' : 'Vital Signs';
      
      const value = vitalSign === 'Heart Rate' ? `${Math.round(record.heartRate)} BPM` :
                   vitalSign === 'Oxygen Saturation' ? `${Math.round(record.oxygenSaturation)}%` :
                   vitalSign === 'Blood Pressure' ? `${record.systolicBP}/${record.diastolicBP}` :
                   vitalSign === 'Temperature' ? `${record.bodyTemp.toFixed(1)}°C` :
                   vitalSign === 'Respiratory Rate' ? `${Math.round(record.respiratoryRate)} breaths/min` :
                   'Abnormal';

      const normalRange = vitalSign === 'Heart Rate' ? '60-100 BPM' :
                         vitalSign === 'Oxygen Saturation' ? '95-100%' :
                         vitalSign === 'Blood Pressure' ? '90-120/60-80 mmHg' :
                         vitalSign === 'Temperature' ? '36.0-37.5°C' :
                         vitalSign === 'Respiratory Rate' ? '12-20 breaths/min' :
                         'Normal';

      alerts.push({
        id: `alert-${patientId}`,
        patientId,
        patientName,
        room,
        type: primaryAnomaly,
        severity: status === 'critical' ? 'critical' : 'warning',
        vitalSign,
        value,
        normalRange,
        timeDetected: formatTime(new Date()),
        aiScore: confidence,
        cryptoVerified,
        acknowledged: Math.random() > 0.7, // 30% acknowledged
      });
    }
  });

  // Calculate security metrics
  const normalPatients = patients.filter(p => p.status === 'normal').length;
  const warningPatients = patients.filter(p => p.status === 'warning').length;
  const criticalPatients = patients.filter(p => p.status === 'critical').length;

  const securityMetrics = {
    uptime: 99.5 + Math.random() * 0.4,
    activeConnections: patients.length,
    failedAuthAttempts: Math.floor(Math.random() * 5),
    dataIntegrityRate: 98 + Math.random() * 2,
    attacksDetected: Math.floor((warningPatients + criticalPatients) * 0.3),
    hmacSuccessRate: 99.5 + Math.random() * 0.4,
    digitalSignaturesIssued: patients.length * 120, // ~120 signatures per patient
    aiAccuracy: 91 + Math.random() * 4,
    falsePositiveRate: 3 + Math.random() * 3,
    responseTime: 120 + Math.floor(Math.random() * 60),
  };

  // Generate attack distribution (simulated based on patient status)
  const attackDistribution = [
    { name: 'Data Tampering', value: Math.floor(criticalPatients * 1.5), color: '#C01C28' },
    { name: 'Replay Attacks', value: Math.floor(warningPatients * 0.8), color: '#E5A50A' },
    { name: 'Spoofing', value: Math.floor((criticalPatients + warningPatients) * 0.4), color: '#1A5FB4' },
    { name: 'Other', value: Math.floor(Math.random() * 5), color: '#717182' },
  ].filter(item => item.value > 0);

  return { patients, alerts, securityMetrics, attackDistribution };
}