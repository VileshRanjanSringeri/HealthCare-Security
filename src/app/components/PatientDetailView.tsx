import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Thermometer, Activity, Droplets, AlertTriangle, CheckCircle, Shield, Lock, Eye, EyeOff, User, Calendar, Stethoscope, FileText, Droplet, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Patient, Alert } from '../App';
import { generateVitalSignsHistory, generateBloodPressureHistory } from '../data/mockData';
import { formatTime12Hour, formatDate } from '../utils/timeFormat';

interface PatientDetailViewProps {
  patient: Patient;
  patientId: string;
  onBack: () => void;
  onShowAlert: (alert: Alert) => void;
}

export default function PatientDetailView({ patient, patientId, onBack, onShowAlert }: PatientDetailViewProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCryptoDetails, setShowCryptoDetails] = useState(false);
  const [vitalHistory, setVitalHistory] = useState({
    heartRate: generateVitalSignsHistory(72, 10, 24),
    oxygen: generateVitalSignsHistory(98, 3, 24),
    glucose: generateVitalSignsHistory(105, 15, 24),
    bloodPressure: generateBloodPressureHistory(120, 80, 10, 24),
  });
  const [ecgData, setEcgData] = useState(generateVitalSignsHistory(72, 30, 50));

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (patient) {
        setVitalHistory({
          heartRate: generateVitalSignsHistory(patient.vitalSigns.heartRate, 10, 24),
          oxygen: generateVitalSignsHistory(patient.vitalSigns.oxygen, 3, 24),
          glucose: generateVitalSignsHistory(patient.vitalSigns.glucose, 15, 24),
          bloodPressure: generateBloodPressureHistory(patient.vitalSigns.bloodPressure, 10, 24),
        });
        setEcgData(generateVitalSignsHistory(patient.vitalSigns.heartRate, 30, 50));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [patient]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const getTrend = (vital: string): 'up' | 'down' | 'stable' => {
    const random = Math.random();
    if (random > 0.6) return 'up';
    if (random > 0.3) return 'down';
    return 'stable';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#2EC27E';
      case 'warning': return '#E5A50A';
      case 'critical': return '#C01C28';
      default: return '#717182';
    }
  };

  // Mock patient alerts for demo (would come from props/context in real app)
  const patientAlerts: Alert[] = [];

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="bg-white border-b-2 border-[#1A5FB4]/10 shadow-sm">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-3 rounded-xl hover:bg-[#F6F5F4] transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-[#1E1E1E]">Patient Detail View</h1>
                <p className="text-sm text-[#717182]">Comprehensive medical monitoring & analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right px-4 py-2 rounded-lg bg-[#F6F5F4]">
                <p className="text-xs text-[#717182]">{formatDate(currentTime)}</p>
                <p className="text-sm font-semibold font-mono">{formatTime12Hour(currentTime)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-6">
        {/* Enhanced Patient Info Header with Photo */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-md">
          <div className="flex items-start gap-6">
            {/* Patient Photo */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#1A5FB4] to-[#1A5FB4]/60 flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-white" />
              </div>
              <div 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: getStatusColor(patient.status) }}
              >
                <Heart className="w-4 h-4 text-white animate-pulse" />
              </div>
            </div>

            {/* Patient Demographics */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-semibold text-[#1E1E1E] mb-1">{patient.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-[#717182]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {patient.age} years old
                    </span>
                    <span>•</span>
                    <span>Room {patient.room}</span>
                    <span>•</span>
                    <span className="font-mono text-xs">ID: {patient.id.toUpperCase()}</span>
                  </div>
                </div>
                <div 
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ 
                    backgroundColor: getStatusColor(patient.status) + '20',
                    color: getStatusColor(patient.status)
                  }}
                >
                  {patient.status.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#F6F5F4]">
                  <p className="text-xs text-[#717182] mb-1">Weight</p>
                  <p className="text-xl font-semibold text-[#1E1E1E]">{patient.weight}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F6F5F4]">
                  <p className="text-xs text-[#717182] mb-1 flex items-center gap-1">
                    <Stethoscope className="w-3 h-3" />
                    Primary Doctor
                  </p>
                  <p className="text-sm font-semibold text-[#1E1E1E]">{patient.doctor}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F6F5F4]">
                  <p className="text-xs text-[#717182] mb-1">Sensor Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#2EC27E] animate-pulse" />
                    <p className="text-sm font-semibold text-[#2EC27E]">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Info Row */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            <div>
              <h4 className="text-sm font-semibold text-[#1E1E1E] mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#1A5FB4]" />
                Medical Conditions
              </h4>
              <div className="flex flex-wrap gap-2">
                {patient.conditions.map((condition, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[#E5A50A]/10 text-[#E5A50A] text-sm font-medium border border-[#E5A50A]/20">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#1E1E1E] mb-3 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-[#1A5FB4]" />
                Current Medications
              </h4>
              <div className="space-y-2">
                {patient.medications.map((med, idx) => (
                  <div key={idx} className="text-sm px-3 py-1 rounded-lg bg-[#1A5FB4]/10 text-[#1A5FB4] font-medium">
                    {med}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time ECG Graph - Full Width */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[#1E1E1E] text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#C01C28]" />
                Real-Time ECG Monitor
              </h3>
              <p className="text-sm text-[#717182] mt-1">Continuous cardiac rhythm monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-[#2EC27E]/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2EC27E] animate-pulse" />
                  <span className="text-sm font-semibold text-[#2EC27E]">LIVE</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-[#F6F5F4]">
                <span className="text-2xl font-semibold text-[#1E1E1E]">{patient.vitalSigns.heartRate}</span>
                <span className="text-sm text-[#717182] ml-1">BPM</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-[#0A0A0A] p-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ecgData}>
                <defs>
                  <linearGradient id="ecgGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2EC27E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2EC27E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A3A1A" strokeOpacity={0.3} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[20, 120]} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2EC27E" 
                  strokeWidth={2}
                  fill="url(#ecgGradient)"
                  animationDuration={300}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vital Signs Monitor Section */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-[#1E1E1E] text-lg">Vital Signs Monitor</h3>
            <div className="flex items-center gap-2 text-[#2EC27E]">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-semibold">Live Monitoring</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#F6F5F4] to-white border-2 border-[#1A5FB4]/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[#717182]">Heart Rate</span>
                <Heart className="w-5 h-5 text-[#C01C28]" />
              </div>
              <p className="text-4xl font-semibold text-[#1E1E1E] mb-1">{patient.vitalSigns.heartRate}</p>
              <p className="text-xs text-[#717182] mb-2">BPM • Normal: 60-100</p>
              <div className="flex items-center gap-1 text-xs text-[#717182]">
                <Clock className="w-3 h-3" />
                <span>Updated {patient.cryptoStatus.lastVerified}</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-[#F6F5F4] to-white border-2 border-[#1A5FB4]/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[#717182]">Blood Pressure</span>
                <Activity className="w-5 h-5 text-[#1A5FB4]" />
              </div>
              <p className="text-4xl font-semibold text-[#1E1E1E] mb-1">{patient.vitalSigns.bloodPressure}</p>
              <p className="text-xs text-[#717182] mb-2">mmHg • Normal</p>
              <div className="flex items-center gap-1 text-xs text-[#717182]">
                <Clock className="w-3 h-3" />
                <span>Updated {patient.cryptoStatus.lastVerified}</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-[#F6F5F4] to-white border-2 border-[#1A5FB4]/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[#717182]">Oxygen</span>
                <Droplet className="w-5 h-5 text-[#2EC27E]" />
              </div>
              <p className="text-4xl font-semibold text-[#1E1E1E] mb-1">{patient.vitalSigns.oxygen}%</p>
              <p className="text-xs text-[#717182] mb-2">SpO2 • Normal: 95-100%</p>
              <div className="flex items-center gap-1 text-xs text-[#717182]">
                <Clock className="w-3 h-3" />
                <span>Updated {patient.cryptoStatus.lastVerified}</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-[#F6F5F4] to-white border-2 border-[#1A5FB4]/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[#717182]">Glucose</span>
                <Activity className="w-5 h-5 text-[#E5A50A]" />
              </div>
              <p className="text-4xl font-semibold text-[#1E1E1E] mb-1">{patient.vitalSigns.glucose}</p>
              <p className="text-xs text-[#717182] mb-2">mg/dL • 70-130</p>
              <div className="flex items-center gap-1 text-xs text-[#717182]">
                <Clock className="w-3 h-3" />
                <span>Updated {patient.cryptoStatus.lastVerified}</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-[#F6F5F4] to-white border-2 border-[#1A5FB4]/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[#717182]">Temperature</span>
                <Activity className="w-5 h-5 text-[#717182]" />
              </div>
              <p className="text-4xl font-semibold text-[#1E1E1E] mb-1">{patient.vitalSigns.temperature}°</p>
              <p className="text-xs text-[#717182] mb-2">°C • 36.1-37.2</p>
              <div className="flex items-center gap-1 text-xs text-[#717182]">
                <Clock className="w-3 h-3" />
                <span>Updated {patient.cryptoStatus.lastVerified}</span>
              </div>
            </div>
          </div>

          {/* 24-Hour Vital Trends Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F6F5F4]">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C01C28]" />
                Heart Rate (24h)
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={vitalHistory.heartRate}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[40, 120]} hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E9EBEF',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#C01C28" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="p-4 rounded-xl bg-[#F6F5F4]">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-[#2EC27E]" />
                Oxygen Level (24h)
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={vitalHistory.oxygen}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[85, 100]} hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E9EBEF',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#2EC27E" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="p-4 rounded-xl bg-[#F6F5F4]">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#E5A50A]" />
                Glucose (24h)
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={vitalHistory.glucose}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[60, 160]} hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E9EBEF',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#E5A50A" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Anomaly Detection & Crypto Verification Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Anomaly Detection Panel */}
          <div className={`bg-white rounded-xl p-6 border-2 shadow-md ${
            patient.aiAnalysis.status === 'anomaly' ? 'border-[#C01C28]' : 'border-[#2EC27E]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1E1E1E] text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#1A5FB4]" />
                AI Anomaly Detection
              </h3>
              {patient.aiAnalysis.status === 'anomaly' ? (
                <div className="px-4 py-2 rounded-full bg-[#C01C28] text-white font-semibold animate-pulse shadow-lg">
                  ALERT
                </div>
              ) : (
                <div className="px-4 py-2 rounded-full bg-[#2EC27E] text-white font-semibold">
                  NORMAL
                </div>
              )}
            </div>
            
            <div className={`p-5 rounded-xl mb-4 border-2 ${
              patient.aiAnalysis.status === 'anomaly' 
                ? 'bg-[#C01C28]/10 border-[#C01C28]/30' 
                : 'bg-[#2EC27E]/10 border-[#2EC27E]/30'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {patient.aiAnalysis.status === 'anomaly' ? (
                  <AlertTriangle className="w-8 h-8 text-[#C01C28]" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-[#2EC27E]" />
                )}
                <div>
                  <p className={`text-lg font-semibold ${
                    patient.aiAnalysis.status === 'anomaly' ? 'text-[#C01C28]' : 'text-[#2EC27E]'
                  }`}>
                    {patient.aiAnalysis.status === 'anomaly' ? 'Anomaly Detected' : 'Normal Pattern'}
                  </p>
                  <p className="text-sm text-[#717182]">LSTM Neural Network Analysis</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                  <span className="text-sm text-[#717182]">AI Confidence Score</span>
                  <span className="text-lg font-semibold">{(patient.aiAnalysis.confidence * 100).toFixed(1)}%</span>
                </div>
                {patient.aiAnalysis.pattern && (
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                    <span className="text-sm text-[#717182]">Detected Pattern</span>
                    <span className="text-sm font-semibold">{patient.aiAnalysis.pattern}</span>
                  </div>
                )}
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                  <span className="text-sm text-[#717182]">Model Version</span>
                  <span className="font-mono text-xs font-semibold">v2.3.1</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                  <span className="text-sm text-[#717182]">Last Scan</span>
                  <span className="text-sm font-semibold">2 seconds ago</span>
                </div>
              </div>
            </div>

            {patient.aiAnalysis.status === 'anomaly' && (
              <button 
                onClick={() => {
                  const alert = patientAlerts.find(a => a.patientId === patientId);
                  if (alert) onShowAlert(alert);
                }}
                className="w-full py-3 rounded-xl bg-[#C01C28] text-white font-semibold hover:bg-[#9a1620] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                View Critical Alert Details
              </button>
            )}
          </div>

          {/* Cryptographic Verification */}
          <div className="bg-white rounded-xl p-6 border-2 border-[#2EC27E] shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1E1E1E] text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#2EC27E]" />
                Cryptographic Verification
              </h3>
              <CheckCircle className="w-6 h-6 text-[#2EC27E]" />
            </div>

            <div className="space-y-3 mb-4">
              <div className="p-4 rounded-xl bg-[#2EC27E]/10 border-2 border-[#2EC27E]/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2EC27E]" />
                    <span className="font-semibold">Data Integrity</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2EC27E]">✓ VERIFIED</span>
                </div>
                <p className="text-xs text-[#717182] font-mono">HMAC-SHA256</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#F6F5F4]">
                  <p className="text-xs text-[#717182] mb-1">Last Verified</p>
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {patient.cryptoStatus.lastVerified}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#F6F5F4]">
                  <p className="text-xs text-[#717182] mb-1">Sensor ID</p>
                  <p className="text-xs font-mono font-semibold">{patient.cryptoStatus.sensorId}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#2EC27E]/10 border-2 border-[#2EC27E]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#2EC27E]" />
                    <span className="font-semibold">Digital Signature</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2EC27E]">✓ VALID</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#F6F5F4]">
                  <p className="text-[#717182] mb-1">Encryption</p>
                  <p className="font-mono font-semibold">AES-256-GCM</p>
                </div>
                <div className="p-3 rounded-lg bg-[#F6F5F4]">
                  <p className="text-[#717182] mb-1">Key Rotation</p>
                  <p className="font-semibold">2h ago</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowCryptoDetails(!showCryptoDetails)}
              className="w-full py-3 rounded-xl border-2 border-[#1A5FB4] text-[#1A5FB4] font-semibold hover:bg-[#1A5FB4] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>{showCryptoDetails ? 'Hide' : 'View'} Cryptographic Proof</span>
              {showCryptoDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showCryptoDetails && (
              <div className="mt-4 p-4 rounded-xl bg-[#0A0A0A] text-[#2EC27E] space-y-3">
                <div className="text-sm">
                  <p className="text-[#717182] mb-2 font-semibold">HMAC Signature (SHA-256):</p>
                  <p className="font-mono text-xs break-all leading-relaxed">
                    a8f5e2d9c4b7f1e3a6d8c2b9e7f4a1d5c8e3b6f9a2d7c4e1b8f5a3d6c9e2b7f4
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-[#717182] mb-2 font-semibold">Timestamp:</p>
                  <p className="font-mono text-xs">{new Date().toISOString()}</p>
                </div>
                <div className="text-sm">
                  <p className="text-[#717182] mb-2 font-semibold">Verification Status:</p>
                  <p className="font-mono text-xs text-[#2EC27E] font-semibold">✓ SIGNATURE VALID - DATA INTEGRITY CONFIRMED</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alert History Timeline */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-md">
          <h3 className="font-semibold text-[#1E1E1E] text-lg mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#1A5FB4]" />
            Alert History Timeline
          </h3>
          
          {patientAlerts.length > 0 ? (
            <div className="space-y-4">
              {patientAlerts.map((alert, index) => (
                <div key={alert.id} className="relative">
                  {/* Timeline connector */}
                  {index < patientAlerts.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
                  )}
                  
                  <div 
                    className={`flex gap-4 p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                      alert.severity === 'critical' 
                        ? 'bg-[#C01C28]/5 border-[#C01C28]/30' 
                        : alert.severity === 'warning'
                        ? 'bg-[#E5A50A]/5 border-[#E5A50A]/30'
                        : 'bg-[#1A5FB4]/5 border-[#1A5FB4]/30'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        alert.severity === 'critical' 
                          ? 'bg-[#C01C28]' 
                          : alert.severity === 'warning'
                          ? 'bg-[#E5A50A]'
                          : 'bg-[#1A5FB4]'
                      }`}
                    >
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>

                    {/* Alert content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-[#1E1E1E] text-lg">{alert.type}</h4>
                          <p className="text-sm text-[#717182] mt-1">Detected {alert.timeDetected}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
                          alert.acknowledged 
                            ? 'bg-[#F6F5F4] text-[#717182]' 
                            : 'bg-[#C01C28] text-white animate-pulse'
                        }`}>
                          {alert.acknowledged ? '✓ Acknowledged' : 'Active Alert'}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-white/50">
                        <div>
                          <p className="text-xs text-[#717182] mb-1">Measured Value</p>
                          <p className="text-lg font-semibold">{alert.value}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#717182] mb-1">Normal Range</p>
                          <p className="text-lg font-semibold">{alert.normalRange}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#717182] mb-1">Severity Level</p>
                          <p className={`text-lg font-semibold capitalize ${
                            alert.severity === 'critical' ? 'text-[#C01C28]' :
                            alert.severity === 'warning' ? 'text-[#E5A50A]' : 'text-[#1A5FB4]'
                          }`}>
                            {alert.severity}
                          </p>
                        </div>
                      </div>

                      {!alert.acknowledged && (
                        <button 
                          onClick={() => onShowAlert(alert)}
                          className="mt-3 px-4 py-2 rounded-lg bg-[#1A5FB4] text-white text-sm font-semibold hover:bg-[#164c91] transition-colors"
                        >
                          Review & Acknowledge Alert
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#717182]">
              <div className="w-20 h-20 rounded-full bg-[#2EC27E]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-[#2EC27E]" />
              </div>
              <p className="font-semibold text-lg">No Alerts Recorded</p>
              <p className="text-sm mt-1">This patient has a clean health monitoring record</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}