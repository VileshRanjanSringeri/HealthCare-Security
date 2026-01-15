import { useState, useEffect } from 'react';
import { Heart, Shield, Activity, AlertTriangle, Bell, Settings, LogOut, CheckCircle, TrendingUp, Users, Database, Upload, Eye, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateVitalSignsHistory } from '../data/mockData';
import { Alert, Patient } from '../App';

interface EnhancedDashboardProps {
  patients: Patient[];
  alerts: Alert[];
  securityMetrics: any;
  attackDistribution: any[];
  usingRealData: boolean;
  onViewPatient: (patientId: string) => void;
  onShowAlert: (alert: Alert) => void;
  onViewSecurity: () => void;
  onViewModelPerformance?: () => void;
  onViewAttackDemo?: () => void;
  onLogout: () => void;
  onCSVUpload: () => void;
  onResetData: () => void;
}

export default function EnhancedDashboard({ 
  patients, 
  alerts, 
  securityMetrics, 
  attackDistribution,
  usingRealData,
  onViewPatient, 
  onShowAlert, 
  onViewSecurity, 
  onViewModelPerformance,
  onViewAttackDemo,
  onLogout,
  onCSVUpload,
  onResetData
}: EnhancedDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [vitalHistory, setVitalHistory] = useState(generateVitalSignsHistory(72, 10));

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVitalHistory(generateVitalSignsHistory(selectedPatient.vitalSigns.heartRate, 10));
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedPatient]);
  
  // Update selected patient when patients data changes
  useEffect(() => {
    if (patients.length > 0 && !patients.find(p => p.id === selectedPatient?.id)) {
      setSelectedPatient(patients[0]);
    }
  }, [patients]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#2EC27E';
      case 'warning': return '#E5A50A';
      case 'critical': return '#C01C28';
      default: return '#717182';
    }
  };

  const activeAlerts = alerts.filter(a => !a.acknowledged);
  const normalPatients = patients.filter(p => p.status === 'normal').length;
  const warningPatients = patients.filter(p => p.status === 'warning').length;
  const criticalPatients = patients.filter(p => p.status === 'critical').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="bg-white border-b-2 border-[#1A5FB4]/10 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A5FB4] to-[#1A5FB4]/80 flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-[#1E1E1E]">HealthSecure IoT</h1>
                <p className="text-sm text-[#717182]">Real-Time Patient Monitoring System</p>
              </div>
              {usingRealData && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Real Dataset Active
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {usingRealData && (
                <button
                  onClick={onResetData}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Reset to Demo
                </button>
              )}
              {!usingRealData && (
                <button
                  onClick={onCSVUpload}
                  className="px-4 py-2 text-sm bg-[#1A5FB4] hover:bg-[#155A9F] text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Load Dataset
                </button>
              )}
              <div className="text-right px-4 py-2 rounded-lg bg-[#F6F5F4]">
                <p className="text-xs text-[#717182]">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-sm font-semibold font-mono">{currentTime.toLocaleTimeString()}</p>
              </div>
              <button 
                className="relative p-3 rounded-xl hover:bg-[#F6F5F4] transition-all"
                onClick={() => activeAlerts.length > 0 && onShowAlert(activeAlerts[0])}
              >
                <Bell className="w-5 h-5" />
                {activeAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#C01C28] text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
                    {activeAlerts.length}
                  </span>
                )}
              </button>
              <button className="p-3 rounded-xl hover:bg-[#F6F5F4] transition-all">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={onLogout}
                className="p-3 rounded-xl hover:bg-[#C01C28]/10 transition-all text-[#C01C28]"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Status Summary Bar */}
          <div className="grid grid-cols-4 gap-4">
            <div className="px-4 py-3 rounded-xl bg-[#2EC27E]/10 border border-[#2EC27E]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#717182] mb-1">Total Patients</p>
                  <p className="text-2xl font-semibold text-[#1E1E1E]">{patients.length}</p>
                </div>
                <Users className="w-8 h-8 text-[#2EC27E]" />
              </div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-[#2EC27E]/10 border border-[#2EC27E]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#717182] mb-1">Normal Status</p>
                  <p className="text-2xl font-semibold text-[#2EC27E]">{normalPatients}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-[#2EC27E]" />
              </div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-[#E5A50A]/10 border border-[#E5A50A]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#717182] mb-1">Warning Status</p>
                  <p className="text-2xl font-semibold text-[#E5A50A]">{warningPatients}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-[#E5A50A]" />
              </div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-[#C01C28]/10 border border-[#C01C28]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#717182] mb-1">Critical Status</p>
                  <p className="text-2xl font-semibold text-[#C01C28]">{criticalPatients}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-[#C01C28]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Patient Cards (2x2 Grid) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#1E1E1E]">Patient Monitoring</h2>
              <span className="text-sm text-[#717182]">{patients.length} Active Patients</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => {
                    setSelectedPatient(patient);
                    setVitalHistory(generateVitalSignsHistory(patient.vitalSigns.heartRate, 10));
                  }}
                  className={`bg-white rounded-xl p-6 border-2 cursor-pointer text-left transition-all hover:shadow-xl transform hover:-translate-y-1 ${
                    selectedPatient.id === patient.id 
                      ? 'border-[#1A5FB4] shadow-lg' 
                      : 'border-transparent shadow-md'
                  }`}
                >
                  {/* Patient Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#1A5FB4]/10 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-[#1A5FB4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E1E1E]">{patient.name}</h3>
                        <p className="text-sm text-[#717182]">Room {patient.room}</p>
                      </div>
                    </div>
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse" 
                      style={{ backgroundColor: getStatusColor(patient.status) }}
                    />
                  </div>

                  {/* Status Badge */}
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{ 
                      backgroundColor: getStatusColor(patient.status) + '20',
                      color: getStatusColor(patient.status)
                    }}
                  >
                    {patient.status.toUpperCase()}
                  </div>

                  {/* Vital Signs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-[#F6F5F4]">
                      <p className="text-xs text-[#717182] mb-1">Heart Rate</p>
                      <p className="text-xl font-semibold text-[#1E1E1E]">{patient.vitalSigns.heartRate}</p>
                      <p className="text-xs text-[#717182]">BPM</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F6F5F4]">
                      <p className="text-xs text-[#717182] mb-1">Blood Pressure</p>
                      <p className="text-xl font-semibold text-[#1E1E1E]">{patient.vitalSigns.bloodPressure}</p>
                      <p className="text-xs text-[#717182]">mmHg</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F6F5F4]">
                      <p className="text-xs text-[#717182] mb-1">Oxygen</p>
                      <p className="text-xl font-semibold text-[#1E1E1E]">{patient.vitalSigns.oxygen}%</p>
                      <p className="text-xs text-[#717182]">SpO2</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F6F5F4]">
                      <p className="text-xs text-[#717182] mb-1">Glucose</p>
                      <p className="text-xl font-semibold text-[#1E1E1E]">{patient.vitalSigns.glucose}</p>
                      <p className="text-xs text-[#717182]">mg/dL</p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPatient(patient.id);
                    }}
                    className="w-full py-2 rounded-lg bg-[#1A5FB4] text-white text-sm font-semibold hover:bg-[#164c91] transition-colors"
                  >
                    View Full Details
                  </button>
                </div>
              ))}
            </div>

            {/* Selected Patient Live Chart */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg">Live Heart Rate Monitor</h3>
                  <p className="text-sm text-[#717182]">{selectedPatient.name} - Room {selectedPatient.room}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2EC27E]/10">
                  <Activity className="w-4 h-4 text-[#2EC27E] animate-pulse" />
                  <span className="text-sm font-semibold text-[#2EC27E]">LIVE</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={vitalHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#717182"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#717182"
                    tick={{ fontSize: 12 }}
                    domain={[40, 120]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E9EBEF',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1A5FB4" 
                    strokeWidth={3}
                    dot={false}
                    animationDuration={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Section - Security & AI Status */}
          <div className="space-y-6">
            {/* Cryptographic Verification Panel */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#1E1E1E]">Security Status</h3>
                <Shield className="w-6 h-6 text-[#2EC27E]" />
              </div>
              
              {/* All Systems Secure Badge */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#2EC27E]/10 to-[#2EC27E]/5 border-2 border-[#2EC27E]/30 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#2EC27E] flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2EC27E]">All Systems Secure</p>
                    <p className="text-xs text-[#717182]">No threats detected</p>
                  </div>
                </div>
              </div>

              {/* Cryptographic Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F6F5F4]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2EC27E]" />
                    <span className="text-sm">HMAC Verification</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2EC27E]">Valid</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F6F5F4]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2EC27E]" />
                    <span className="text-sm">Digital Signature</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2EC27E]">Valid</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F6F5F4]">
                  <span className="text-sm text-[#717182]">Last Key Rotation</span>
                  <span className="text-sm font-semibold">2h ago</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F6F5F4]">
                  <span className="text-sm text-[#717182]">Active Sensors</span>
                  <span className="text-sm font-semibold text-[#2EC27E]">4/4</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F6F5F4]">
                  <span className="text-sm text-[#717182]">Data Integrity</span>
                  <span className="text-sm font-semibold text-[#2EC27E]">100%</span>
                </div>
              </div>

              {/* Security Button */}
              <button 
                onClick={onViewSecurity}
                className="w-full py-3 rounded-lg bg-[#1A5FB4] text-white font-semibold hover:bg-[#164c91] transition-all shadow-md hover:shadow-lg"
              >
                View Security Analytics
              </button>
            </div>

            {/* Research & Analysis Panel */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-md">
              <h3 className="font-semibold text-[#1E1E1E] mb-4">Research Analytics</h3>
              
              <div className="space-y-3">
                {/* Attack Demonstration Button */}
                {onViewAttackDemo && (
                  <button 
                    onClick={onViewAttackDemo}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#C01C28] to-[#E5A50A] text-white font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Attack Demonstrations
                  </button>
                )}
                
                {/* Model Performance Button */}
                {onViewModelPerformance && (
                  <button 
                    onClick={onViewModelPerformance}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#1A5FB4] to-[#9333EA] text-white font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <BarChart3 className="w-5 h-5" />
                    Model Performance
                  </button>
                )}
              </div>
            </div>

            {/* AI Analysis Panel */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#1E1E1E]">AI Analysis</h3>
                <Activity className="w-6 h-6 text-[#1A5FB4]" />
              </div>

              <div className={`p-4 rounded-xl border-2 mb-4 ${
                selectedPatient.aiAnalysis.status === 'anomaly'
                  ? 'bg-[#C01C28]/10 border-[#C01C28]/30'
                  : 'bg-[#2EC27E]/10 border-[#2EC27E]/30'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {selectedPatient.aiAnalysis.status === 'anomaly' ? (
                    <AlertTriangle className="w-6 h-6 text-[#C01C28]" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-[#2EC27E]" />
                  )}
                  <span className={`font-semibold ${
                    selectedPatient.aiAnalysis.status === 'anomaly' ? 'text-[#C01C28]' : 'text-[#2EC27E]'
                  }`}>
                    {selectedPatient.aiAnalysis.status === 'anomaly' ? 'Anomaly Detected' : 'Normal Pattern'}
                  </span>
                </div>
                <p className="text-sm text-[#717182] mb-2">
                  Confidence: {(selectedPatient.aiAnalysis.confidence * 100).toFixed(1)}%
                </p>
                {selectedPatient.aiAnalysis.pattern && (
                  <p className="text-sm font-medium">{selectedPatient.aiAnalysis.pattern}</p>
                )}
              </div>

              {selectedPatient.aiAnalysis.status === 'anomaly' && activeAlerts.length > 0 && (
                <button
                  onClick={() => onShowAlert(activeAlerts[0])}
                  className="w-full py-3 rounded-lg bg-[#C01C28] text-white font-semibold hover:bg-[#9a1620] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  View Critical Alert
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-md">
              <h3 className="font-semibold text-[#1E1E1E] mb-4">System Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#717182]">System Uptime</span>
                  <span className="text-sm font-semibold text-[#2EC27E]">99.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#717182]">Attacks Blocked</span>
                  <span className="text-sm font-semibold">47 (24h)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#717182]">AI Accuracy</span>
                  <span className="text-sm font-semibold text-[#1A5FB4]">92.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}