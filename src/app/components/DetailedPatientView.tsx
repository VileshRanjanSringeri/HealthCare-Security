/**
 * Detailed Patient View Screen
 * Complete medical information with charts and AI/crypto analysis
 */

import { useState } from 'react';
import { 
  ArrowLeft, Heart, Activity, Droplet, Zap, Thermometer,
  Brain, Lock, ChevronDown, ChevronUp, Shield, CheckCircle,
  User
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Patient } from '../App';

interface DetailedPatientViewProps {
  patient: Patient;
  onBack: () => void;
}

// Generate 24-hour history for charts
const generate24HourData = (baseValue: number, variance: number) => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: i,
      value: baseValue + (Math.random() * variance - variance / 2),
    });
  }
  return data;
};

export default function DetailedPatientView({ patient, onBack }: DetailedPatientViewProps) {
  const [aiPanelExpanded, setAiPanelExpanded] = useState(false);
  const [cryptoPanelExpanded, setCryptoPanelExpanded] = useState(false);

  // Generate chart data
  const heartRateData = generate24HourData(patient.vitalSigns.heartRate, 15);
  const bpSystolic = generate24HourData(parseInt(patient.vitalSigns.bloodPressure.split('/')[0]), 10);
  const oxygenData = generate24HourData(patient.vitalSigns.oxygen, 3);
  const glucoseData = generate24HourData(patient.vitalSigns.glucose, 20);

  // Get status color
  const getStatusColor = () => {
    switch (patient.status) {
      case 'normal': return '#2EC27E';
      case 'warning': return '#E5A50A';
      case 'critical': return '#C01C28';
      default: return '#717182';
    }
  };

  // Check if vital is normal
  const isVitalNormal = (vital: string, value: number): boolean => {
    const ranges: Record<string, [number, number]> = {
      heartRate: [60, 100],
      oxygen: [95, 100],
      glucose: [80, 120],
      temperature: [36.0, 37.5],
    };
    const range = ranges[vital];
    return range ? value >= range[0] && value <= range[1] : true;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-[#F6F5F4] rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-[#1E1E1E]" />
              </button>
              <h1 className="text-2xl font-bold text-[#1E1E1E]">{patient.name}</h1>
            </div>

            {/* Status Badge */}
            <div 
              className="px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: getStatusColor() }}
            >
              {patient.status.toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-6 space-y-6">
        {/* TOP SECTION - Patient Info Card */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
          <div className="flex items-start gap-6">
            {/* Photo Placeholder */}
            <div className="w-20 h-20 rounded-full bg-[#1A5FB4]/10 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-[#1A5FB4]" />
            </div>

            {/* Patient Details */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#717182]">Age</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">{patient.age} years</p>
              </div>
              <div>
                <p className="text-sm text-[#717182]">Gender</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">Male</p>
              </div>
              <div>
                <p className="text-sm text-[#717182]">Weight</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">{patient.weight}</p>
              </div>
              <div>
                <p className="text-sm text-[#717182]">Room</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">{patient.room}</p>
              </div>
              <div>
                <p className="text-sm text-[#717182]">Doctor</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">{patient.doctor}</p>
              </div>
              <div>
                <p className="text-sm text-[#717182]">Admission Date</p>
                <p className="text-lg font-semibold text-[#1E1E1E]">Jan 10, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* VITAL SIGNS SECTION - 4 Charts in 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Heart Rate Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#C01C28]" />
                <h3 className="text-lg font-semibold text-[#1E1E1E]">Heart Rate</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#C01C28]">{patient.vitalSigns.heartRate}</p>
                <p className="text-xs text-[#717182]">BPM</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                <XAxis 
                  dataKey="hour" 
                  label={{ value: 'Hour', position: 'insideBottom', offset: -5, fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  domain={[40, 120]}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#C01C28" 
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-[#717182] text-center mt-2">Normal: 60-100 BPM</p>
          </div>

          {/* 2. Blood Pressure Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#1A5FB4]" />
                <h3 className="text-lg font-semibold text-[#1E1E1E]">Blood Pressure</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#1A5FB4]">{patient.vitalSigns.bloodPressure}</p>
                <p className="text-xs text-[#717182]">mmHg</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={bpSystolic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                <XAxis 
                  dataKey="hour" 
                  label={{ value: 'Hour', position: 'insideBottom', offset: -5, fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  domain={[90, 150]}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1A5FB4" 
                  fill="#1A5FB4"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-[#717182] text-center mt-2">Normal: 110-130 / 70-85 mmHg</p>
          </div>

          {/* 3. Oxygen Saturation Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-[#06B6D4]" />
                <h3 className="text-lg font-semibold text-[#1E1E1E]">O2 Saturation</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#06B6D4]">{patient.vitalSigns.oxygen}%</p>
                <p className="text-xs text-[#717182]">SpO2</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={oxygenData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                <XAxis 
                  dataKey="hour" 
                  label={{ value: 'Hour', position: 'insideBottom', offset: -5, fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  domain={[85, 100]}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-[#717182] text-center mt-2">Normal: 95-100%</p>
          </div>

          {/* 4. Glucose Level Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-lg font-semibold text-[#1E1E1E]">Glucose Level</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#F59E0B]">{patient.vitalSigns.glucose}</p>
                <p className="text-xs text-[#717182]">mg/dL</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                <XAxis 
                  dataKey="hour" 
                  label={{ value: 'Hour', position: 'insideBottom', offset: -5, fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  domain={[60, 140]}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-[#717182] text-center mt-2">Normal: 80-120 mg/dL</p>
          </div>
        </div>

        {/* CURRENT VITALS DISPLAY - Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Heart Rate */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-[#C01C28]" />
              <p className="text-sm text-[#717182]">Heart Rate</p>
            </div>
            <p className="text-xl font-bold text-[#1E1E1E] mb-1">{patient.vitalSigns.heartRate} BPM</p>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isVitalNormal('heartRate', patient.vitalSigns.heartRate) ? 'bg-[#2EC27E]' : 'bg-[#C01C28]'}`} />
              <span className="text-xs text-[#717182]">
                {isVitalNormal('heartRate', patient.vitalSigns.heartRate) ? 'Normal' : 'Abnormal'}
              </span>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-[#1A5FB4]" />
              <p className="text-sm text-[#717182]">Blood Pressure</p>
            </div>
            <p className="text-xl font-bold text-[#1E1E1E] mb-1">{patient.vitalSigns.bloodPressure}</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#2EC27E]" />
              <span className="text-xs text-[#717182]">Normal</span>
            </div>
          </div>

          {/* O2 Saturation */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="w-4 h-4 text-[#06B6D4]" />
              <p className="text-sm text-[#717182]">O2 Saturation</p>
            </div>
            <p className="text-xl font-bold text-[#1E1E1E] mb-1">{patient.vitalSigns.oxygen}%</p>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isVitalNormal('oxygen', patient.vitalSigns.oxygen) ? 'bg-[#2EC27E]' : 'bg-[#C01C28]'}`} />
              <span className="text-xs text-[#717182]">
                {isVitalNormal('oxygen', patient.vitalSigns.oxygen) ? 'Normal' : 'Low'}
              </span>
            </div>
          </div>

          {/* Glucose */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <p className="text-sm text-[#717182]">Glucose</p>
            </div>
            <p className="text-xl font-bold text-[#1E1E1E] mb-1">{patient.vitalSigns.glucose} mg/dL</p>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isVitalNormal('glucose', patient.vitalSigns.glucose) ? 'bg-[#2EC27E]' : 'bg-[#C01C28]'}`} />
              <span className="text-xs text-[#717182]">
                {isVitalNormal('glucose', patient.vitalSigns.glucose) ? 'Normal' : 'Abnormal'}
              </span>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#E9EBEF]">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-[#EF4444]" />
              <p className="text-sm text-[#717182]">Temperature</p>
            </div>
            <p className="text-xl font-bold text-[#1E1E1E] mb-1">{patient.vitalSigns.temperature}°C</p>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isVitalNormal('temperature', patient.vitalSigns.temperature) ? 'bg-[#2EC27E]' : 'bg-[#C01C28]'}`} />
              <span className="text-xs text-[#717182]">
                {isVitalNormal('temperature', patient.vitalSigns.temperature) ? 'Normal' : 'Abnormal'}
              </span>
            </div>
          </div>
        </div>

        {/* AI ANALYSIS PANEL */}
        <div className="bg-white rounded-xl shadow-md border border-[#E9EBEF] overflow-hidden">
          <button
            onClick={() => setAiPanelExpanded(!aiPanelExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F6F5F4] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-[#1A5FB4]" />
              <h3 className="text-lg font-semibold text-[#1E1E1E]">LSTM Anomaly Analysis</h3>
            </div>
            {aiPanelExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {aiPanelExpanded && (
            <div className="px-6 py-4 border-t border-[#E9EBEF] space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Anomaly Score */}
                <div>
                  <p className="text-sm text-[#717182] mb-2">Anomaly Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            patient.aiAnalysis.confidence < 0.5 ? 'bg-[#2EC27E]' : 'bg-[#C01C28]'
                          }`}
                          style={{ width: `${patient.aiAnalysis.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-lg font-bold text-[#1E1E1E]">
                      {patient.aiAnalysis.confidence.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Confidence Level */}
                <div>
                  <p className="text-sm text-[#717182] mb-2">Confidence Level</p>
                  <p className="text-2xl font-bold text-[#1E1E1E]">92%</p>
                </div>
              </div>

              {/* Status */}
              <div className={`p-4 rounded-lg ${
                patient.aiAnalysis.status === 'normal' 
                  ? 'bg-[#2EC27E]/10 border border-[#2EC27E]/20' 
                  : 'bg-[#C01C28]/10 border border-[#C01C28]/20'
              }`}>
                <p className="text-sm font-semibold mb-1" style={{ 
                  color: patient.aiAnalysis.status === 'normal' ? '#2EC27E' : '#C01C28' 
                }}>
                  Status
                </p>
                <p className="text-lg font-bold text-[#1E1E1E]">
                  {patient.aiAnalysis.status === 'normal' 
                    ? 'No anomalies detected' 
                    : patient.aiAnalysis.pattern || 'Anomaly detected'}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#E9EBEF]">
                <div>
                  <p className="text-sm text-[#717182]">Inference Time</p>
                  <p className="text-lg font-semibold text-[#1E1E1E]">1.2ms</p>
                </div>
                <div>
                  <p className="text-sm text-[#717182]">Model</p>
                  <p className="text-lg font-semibold text-[#1E1E1E]">LSTM-64-32 (2-layer)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CRYPTOGRAPHIC VERIFICATION PANEL */}
        <div className="bg-white rounded-xl shadow-md border border-[#E9EBEF] overflow-hidden">
          <button
            onClick={() => setCryptoPanelExpanded(!cryptoPanelExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F6F5F4] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-[#1A5FB4]" />
              <h3 className="text-lg font-semibold text-[#1E1E1E]">Encryption & Verification Details</h3>
            </div>
            {cryptoPanelExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {cryptoPanelExpanded && (
            <div className="px-6 py-4 border-t border-[#E9EBEF] space-y-4">
              {/* Encryption Method */}
              <div className="p-4 bg-[#1A5FB4]/5 rounded-lg border border-[#1A5FB4]/20">
                <p className="text-sm text-[#717182] mb-1">Encryption Method</p>
                <p className="text-lg font-bold text-[#1A5FB4]">AES-256-GCM + RSA-2048</p>
              </div>

              {/* Verification Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#2EC27E]/10 rounded-lg border border-[#2EC27E]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-5 h-5 text-[#2EC27E]" />
                    <p className="text-sm font-semibold text-[#2EC27E]">HMAC-SHA256</p>
                  </div>
                  <p className="text-lg font-bold text-[#1E1E1E]">✓ Valid</p>
                </div>

                <div className="p-4 bg-[#2EC27E]/10 rounded-lg border border-[#2EC27E]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-[#2EC27E]" />
                    <p className="text-sm font-semibold text-[#2EC27E]">Digital Signature</p>
                  </div>
                  <p className="text-lg font-bold text-[#1E1E1E]">✓ Verified</p>
                </div>
              </div>

              {/* Device Info */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#E9EBEF]">
                <div>
                  <p className="text-sm text-[#717182] mb-1">Last Verified</p>
                  <p className="text-lg font-semibold text-[#1E1E1E]">
                    {patient.cryptoStatus.lastVerified}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#717182] mb-1">Encryption Time</p>
                  <p className="text-lg font-semibold text-[#1E1E1E]">1.0ms</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#717182] mb-1">Sensor Device ID</p>
                  <p className="text-sm font-mono font-semibold text-[#1E1E1E]">
                    {patient.cryptoStatus.sensorId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#717182] mb-1">Certificate Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2EC27E]" />
                    <p className="text-lg font-semibold text-[#2EC27E]">Valid</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MEDICAL INFORMATION SECTION */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
          <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Medical Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pre-existing Conditions */}
            <div>
              <h4 className="text-sm font-semibold text-[#717182] mb-2">Pre-existing Conditions</h4>
              <ul className="space-y-2">
                {patient.conditions.map((condition, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A5FB4] mt-2" />
                    <span className="text-sm text-[#1E1E1E]">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Medications */}
            <div>
              <h4 className="text-sm font-semibold text-[#717182] mb-2">Current Medications</h4>
              <ul className="space-y-2">
                {patient.medications.map((medication, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2EC27E] mt-2" />
                    <span className="text-sm text-[#1E1E1E]">{medication}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Allergies */}
            <div>
              <h4 className="text-sm font-semibold text-[#717182] mb-2">Allergies</h4>
              <div className="p-3 bg-[#C01C28]/10 rounded-lg border border-[#C01C28]/20">
                <p className="text-sm font-semibold text-[#C01C28]">Penicillin</p>
              </div>
            </div>

            {/* Recent Procedures */}
            <div>
              <h4 className="text-sm font-semibold text-[#717182] mb-2">Recent Procedures</h4>
              <p className="text-sm text-[#717182] italic">None</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
