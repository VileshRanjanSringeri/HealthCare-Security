import { useState, useEffect } from 'react';
import { Heart, Shield, Activity, Users, Bell, Settings, LogOut, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockPatients, mockAlerts, generateVitalSignsHistory } from '../data/mockData';
import { Alert } from '../App';

interface MainDashboardProps {
  onViewPatient: (patientId: string) => void;
  onShowAlert: (alert: Alert) => void;
  onViewSecurity: () => void;
  onLogout: () => void;
}

export default function MainDashboard({ onViewPatient, onShowAlert, onViewSecurity, onLogout }: MainDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#2EC27E';
      case 'warning': return '#E5A50A';
      case 'critical': return '#C01C28';
      default: return '#717182';
    }
  };

  const getVitalStatus = (vital: string, value: number) => {
    if (vital === 'heartRate') {
      if (value < 60 || value > 100) return 'critical';
      if (value < 65 || value > 95) return 'warning';
      return 'normal';
    }
    if (vital === 'oxygen') {
      if (value < 90) return 'critical';
      if (value < 95) return 'warning';
      return 'normal';
    }
    if (vital === 'glucose') {
      if (value < 70 || value > 180) return 'critical';
      if (value < 80 || value > 130) return 'warning';
      return 'normal';
    }
    return 'normal';
  };

  const activeAlerts = mockAlerts.filter(a => !a.acknowledged);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-[#1A5FB4]" />
              <h1 className="text-2xl font-semibold text-[#1E1E1E]">HealthSecure IoT</h1>
            </div>
            <div className="h-6 w-px bg-border" />
            <span className="text-[#717182]">Patient Monitoring Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-[#717182]">{currentTime.toLocaleDateString()}</p>
              <p className="text-sm font-mono">{currentTime.toLocaleTimeString()}</p>
            </div>
            <button 
              className="relative p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => activeAlerts.length > 0 && onShowAlert(activeAlerts[0])}
            >
              <Bell className="w-5 h-5" />
              {activeAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C01C28] text-white text-xs rounded-full flex items-center justify-center">
                  {activeAlerts.length}
                </span>
              )}
            </button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-[#C01C28]"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Left Column - Patient List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Stats */}
          <div className="bg-card rounded-xl p-4 border border-border space-y-3">
            <h3 className="font-semibold text-[#1E1E1E]">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1A5FB4]" />
                  <span className="text-sm">Total Patients</span>
                </div>
                <span className="font-semibold">{mockPatients.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#2EC27E]" />
                  <span className="text-sm">Active Monitors</span>
                </div>
                <span className="font-semibold">{mockPatients.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#2EC27E]" />
                  <span className="text-sm">System Status</span>
                </div>
                <span className="text-[#2EC27E] font-semibold">Secure</span>
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-[#1E1E1E] mb-4">Patients</h3>
            <div className="space-y-2">
              {mockPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => {
                    setSelectedPatient(patient);
                    setVitalHistory(generateVitalSignsHistory(patient.vitalSigns.heartRate, 10));
                  }}
                  className={`w-full p-3 rounded-lg text-left transition-all hover:shadow-md ${
                    selectedPatient.id === patient.id ? 'bg-[#1A5FB4] text-white' : 'bg-accent hover:bg-accent/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{patient.name}</span>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getStatusColor(patient.status) }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span>Room {patient.room}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {patient.vitalSigns.heartRate}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={() => onViewPatient(selectedPatient.id)}
              className="w-full mt-4 py-2 rounded-lg bg-[#1A5FB4] text-white font-medium hover:bg-[#164c91] transition-colors"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Center Column - Vital Signs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Selected Patient Header */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#1E1E1E]">{selectedPatient.name}</h2>
                <p className="text-[#717182]">Room {selectedPatient.room} • {selectedPatient.age} years • {selectedPatient.weight}</p>
              </div>
              <div className="text-right">
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: getStatusColor(selectedPatient.status) + '20',
                    color: getStatusColor(selectedPatient.status)
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse" 
                    style={{ backgroundColor: getStatusColor(selectedPatient.status) }}
                  />
                  {selectedPatient.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time ECG Chart */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1E1E1E]">Real-Time Heart Rate Monitor</h3>
              <div className="flex items-center gap-2 text-[#2EC27E]">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Live</span>
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
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1A5FB4" 
                  strokeWidth={2}
                  dot={false}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Current Readings */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-[#1E1E1E] mb-4">Current Vital Signs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-accent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#717182]">Heart Rate</span>
                  {getVitalStatus('heartRate', selectedPatient.vitalSigns.heartRate) === 'normal' ? (
                    <span className="text-[#2EC27E]">✓</span>
                  ) : getVitalStatus('heartRate', selectedPatient.vitalSigns.heartRate) === 'warning' ? (
                    <span className="text-[#E5A50A]">⚠</span>
                  ) : (
                    <span className="text-[#C01C28]">✕</span>
                  )}
                </div>
                <p className="text-2xl font-semibold text-[#1E1E1E]">{selectedPatient.vitalSigns.heartRate}</p>
                <p className="text-sm text-[#717182]">BPM</p>
              </div>

              <div className="p-4 rounded-lg bg-accent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#717182]">Blood Pressure</span>
                  <span className="text-[#2EC27E]">✓</span>
                </div>
                <p className="text-2xl font-semibold text-[#1E1E1E]">{selectedPatient.vitalSigns.bloodPressure}</p>
                <p className="text-sm text-[#717182]">mmHg</p>
              </div>

              <div className="p-4 rounded-lg bg-accent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#717182]">Oxygen</span>
                  {getVitalStatus('oxygen', selectedPatient.vitalSigns.oxygen) === 'normal' ? (
                    <span className="text-[#2EC27E]">✓</span>
                  ) : (
                    <span className="text-[#E5A50A]">⚠</span>
                  )}
                </div>
                <p className="text-2xl font-semibold text-[#1E1E1E]">{selectedPatient.vitalSigns.oxygen}</p>
                <p className="text-sm text-[#717182]">%</p>
              </div>

              <div className="p-4 rounded-lg bg-accent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#717182]">Glucose</span>
                  {getVitalStatus('glucose', selectedPatient.vitalSigns.glucose) === 'normal' ? (
                    <span className="text-[#2EC27E]">✓</span>
                  ) : (
                    <span className="text-[#E5A50A]">⚠</span>
                  )}
                </div>
                <p className="text-2xl font-semibold text-[#1E1E1E]">{selectedPatient.vitalSigns.glucose}</p>
                <p className="text-sm text-[#717182]">mg/dL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Security Status */}
        <div className="lg:col-span-3 space-y-6">
          {/* Security Status Panel */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1E1E1E]">Security Status</h3>
              <Shield className="w-5 h-5 text-[#2EC27E]" />
            </div>
            
            <div className="p-4 rounded-lg bg-[#2EC27E]/10 border border-[#2EC27E]/30 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-[#2EC27E]" />
                <span className="font-semibold text-[#2EC27E]">All Systems Secure</span>
              </div>
              <p className="text-sm text-[#717182]">No threats detected</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#717182]">Crypto Verification</span>
                <span className="text-[#2EC27E] flex items-center gap-1">
                  <span>✓</span> Valid HMAC
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#717182]">Last Key Rotation</span>
                <span className="font-medium">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#717182]">Active Sensors</span>
                <span className="font-medium text-[#2EC27E]">3/3 connected</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#717182]">Data Integrity</span>
                <span className="font-medium text-[#2EC27E]">100%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-[#1E1E1E] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={onViewSecurity}
                className="w-full py-2 px-4 rounded-lg bg-[#1A5FB4] text-white text-sm font-medium hover:bg-[#164c91] transition-colors"
              >
                Security Analytics
              </button>
              <button className="w-full py-2 px-4 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors">
                Generate Report
              </button>
              <button className="w-full py-2 px-4 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors">
                View Audit Logs
              </button>
              {activeAlerts.length > 0 && (
                <button 
                  onClick={() => onShowAlert(activeAlerts[0])}
                  className="w-full py-2 px-4 rounded-lg bg-[#C01C28] text-white text-sm font-medium hover:bg-[#9a1620] transition-colors flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  View Alert ({activeAlerts.length})
                </button>
              )}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-[#1E1E1E] mb-4">AI Analysis</h3>
            <div className={`p-4 rounded-lg ${
              selectedPatient.aiAnalysis.status === 'normal' 
                ? 'bg-[#2EC27E]/10 border border-[#2EC27E]/30' 
                : 'bg-[#C01C28]/10 border border-[#C01C28]/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Activity className={`w-5 h-5 ${
                  selectedPatient.aiAnalysis.status === 'normal' ? 'text-[#2EC27E]' : 'text-[#C01C28]'
                }`} />
                <span className={`font-semibold ${
                  selectedPatient.aiAnalysis.status === 'normal' ? 'text-[#2EC27E]' : 'text-[#C01C28]'
                }`}>
                  {selectedPatient.aiAnalysis.status === 'normal' ? 'Normal Pattern' : 'ANOMALY DETECTED'}
                </span>
              </div>
              <p className="text-sm text-[#717182] mb-2">
                Confidence: {(selectedPatient.aiAnalysis.confidence * 100).toFixed(1)}%
              </p>
              {selectedPatient.aiAnalysis.pattern && (
                <p className="text-sm font-medium">{selectedPatient.aiAnalysis.pattern}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
