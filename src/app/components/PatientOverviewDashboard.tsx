/**
 * Patient Overview Dashboard - Main Monitoring Screen
 * 
 * 3-column responsive layout:
 * - LEFT: Statistics cards
 * - MIDDLE: Patient grid (3 columns)
 * - RIGHT: Live charts and analysis panels
 */

import { useState, useEffect } from 'react';
import { 
  Users, AlertCircle, CheckCircle, AlertTriangle, 
  Heart, Activity, Droplet, CircleDot, Shield, Brain,
  Search, Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Patient } from '../App';

interface PatientOverviewDashboardProps {
  patients: Patient[];
  onViewPatient: (patientId: string) => void;
}

// Generate 24-hour vital signs history
const generateVitalHistory = (baseValue: number) => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      patient1: baseValue + Math.random() * 10 - 5,
      patient2: baseValue + 5 + Math.random() * 10 - 5,
      patient3: baseValue - 5 + Math.random() * 10 - 5,
    });
  }
  return data;
};

export default function PatientOverviewDashboard({ 
  patients, 
  onViewPatient 
}: PatientOverviewDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'normal' | 'warning' | 'critical'>('all');
  const [vitalHistory, setVitalHistory] = useState(generateVitalHistory(72));

  // Update vital history every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVitalHistory(generateVitalHistory(72 + Math.random() * 10 - 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Statistics
  const totalPatients = patients.length;
  const criticalCount = patients.filter(p => p.status === 'critical').length;
  const normalCount = patients.filter(p => p.status === 'normal').length;
  const warningCount = patients.filter(p => p.status === 'warning').length;

  // Sample patient for AI analysis panel
  const samplePatient = patients.find(p => p.aiAnalysis.status === 'anomaly') || patients[0];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#1E1E1E]">Patient Monitoring Dashboard</h1>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-[#E9EBEF] focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#717182] pointer-events-none" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="pl-9 pr-10 py-2 rounded-lg border border-[#E9EBEF] focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="all">All Patients</option>
                  <option value="normal">Normal</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - 3 COLUMN LAYOUT */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN - STATISTICS CARDS */}
          <div className="lg:col-span-3 space-y-4">
            {/* Card 1: Total Patients */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#717182] mb-1">Total Patients</p>
                  <p className="text-4xl font-bold text-[#1E1E1E]">{totalPatients}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#1A5FB4]/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-[#1A5FB4]" />
                </div>
              </div>
            </div>

            {/* Card 2: Critical Alerts */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#717182] mb-1">Critical Alerts</p>
                  <p className="text-4xl font-bold text-[#C01C28]">{criticalCount}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#C01C28]/10 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-[#C01C28]" />
                </div>
              </div>
            </div>

            {/* Card 3: Normal Status */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#717182] mb-1">Normal Status</p>
                  <p className="text-4xl font-bold text-[#2EC27E]">{normalCount}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#2EC27E]/10 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-[#2EC27E]" />
                </div>
              </div>
            </div>

            {/* Card 4: Warnings */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#717182] mb-1">Warnings</p>
                  <p className="text-4xl font-bold text-[#E5A50A]">{warningCount}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#E5A50A]/10 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-[#E5A50A]" />
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN - PATIENT GRID */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPatients.slice(0, 50).map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => onViewPatient(patient.id)}
                  className="bg-white rounded-xl p-5 shadow-md border border-[#E9EBEF] cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 relative"
                >
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {patient.status === 'normal' && (
                      <span className="px-2 py-1 bg-[#2EC27E]/20 text-[#2EC27E] text-xs font-semibold rounded-full">
                        Normal
                      </span>
                    )}
                    {patient.status === 'warning' && (
                      <span className="px-2 py-1 bg-[#E5A50A]/20 text-[#E5A50A] text-xs font-semibold rounded-full">
                        Warning
                      </span>
                    )}
                    {patient.status === 'critical' && (
                      <span className="px-2 py-1 bg-[#C01C28]/20 text-[#C01C28] text-xs font-semibold rounded-full">
                        Critical
                      </span>
                    )}
                  </div>

                  {/* Patient Name */}
                  <h3 className="text-lg font-bold text-[#1E1E1E] mb-1 pr-20">{patient.name}</h3>
                  <p className="text-sm text-[#717182] mb-4">
                    Age {patient.age} • Room {patient.room}
                  </p>

                  {/* Vital Signs */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#C01C28]" />
                      <span className="text-sm text-[#717182]">Heart Rate:</span>
                      <span className="text-sm font-semibold ml-auto">{patient.vitalSigns.heartRate} BPM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#1A5FB4]" />
                      <span className="text-sm text-[#717182]">Blood Pressure:</span>
                      <span className="text-sm font-semibold ml-auto">{patient.vitalSigns.bloodPressure} mmHg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-[#2EC27E]" />
                      <span className="text-sm text-[#717182]">O2 Saturation:</span>
                      <span className="text-sm font-semibold ml-auto">{patient.vitalSigns.oxygen}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleDot className="w-4 h-4 text-[#E5A50A]" />
                      <span className="text-sm text-[#717182]">Glucose:</span>
                      <span className="text-sm font-semibold ml-auto">{patient.vitalSigns.glucose} mg/dL</span>
                    </div>
                  </div>

                  {/* AI and Crypto Badges */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#E9EBEF]">
                    {patient.aiAnalysis.status === 'normal' ? (
                      <span className="flex items-center gap-1 text-xs text-[#2EC27E] font-medium">
                        <CheckCircle className="w-3 h-3" />
                        AI: Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-[#C01C28] font-medium">
                        <AlertTriangle className="w-3 h-3" />
                        AI: Anomaly
                      </span>
                    )}
                    <span className="text-[#E9EBEF]">•</span>
                    <span className="flex items-center gap-1 text-xs text-[#2EC27E] font-medium">
                      <Shield className="w-3 h-3" />
                      Encrypted ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <p className="text-[#717182]">No patients found matching your criteria</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - LIVE CHARTS & ANALYSIS */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* 1. Live Vital Signs Chart */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#1A5FB4]" />
                Live Vital Signs
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={vitalHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 10 }}
                    interval={5}
                  />
                  <YAxis 
                    domain={[50, 100]}
                    tick={{ fontSize: 10 }}
                    label={{ value: 'BPM', angle: -90, position: 'insideLeft', fontSize: 10 }}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="patient1" 
                    stroke="#1A5FB4" 
                    strokeWidth={2}
                    dot={false}
                    name="Patient 1"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="patient2" 
                    stroke="#2EC27E" 
                    strokeWidth={2}
                    dot={false}
                    name="Patient 2"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="patient3" 
                    stroke="#E5A50A" 
                    strokeWidth={2}
                    dot={false}
                    name="Patient 3"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-[#717182] text-center mt-2">
                24-Hour Heart Rate History • Auto-updating
              </p>
            </div>

            {/* 2. AI Analysis Panel */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#1A5FB4]" />
                AI Analysis
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-[#1A5FB4]/5 rounded-lg">
                  <p className="text-sm font-medium text-[#1E1E1E] mb-1">Model: LSTM Anomaly Detection</p>
                  <p className="text-xs text-[#717182]">Neural network for time-series analysis</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#717182]">Confidence</span>
                    <span className="text-sm font-semibold text-[#1E1E1E]">
                      {Math.round(samplePatient.aiAnalysis.confidence * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#E9EBEF] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#2EC27E] rounded-full transition-all duration-500"
                      style={{ width: `${samplePatient.aiAnalysis.confidence * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#F6F5F4] rounded-lg">
                  <p className="text-xs text-[#717182] mb-1">Detected Pattern</p>
                  <p className="text-sm font-semibold text-[#1E1E1E]">
                    {samplePatient.aiAnalysis.pattern || 'Normal Rhythm'}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#2EC27E]/10 rounded-lg">
                  <span className="text-xs text-[#717182]">Inference Time</span>
                  <span className="text-sm font-semibold text-[#2EC27E]">1.2ms</span>
                </div>
              </div>
            </div>

            {/* 3. Cryptographic Status Panel */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1A5FB4]" />
                Cryptographic Status
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#2EC27E]/10 rounded-lg">
                  <span className="text-sm text-[#717182]">HMAC Status</span>
                  <span className="text-sm font-semibold text-[#2EC27E] flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#2EC27E]/10 rounded-lg">
                  <span className="text-sm text-[#717182]">Digital Signature</span>
                  <span className="text-sm font-semibold text-[#2EC27E] flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Valid
                  </span>
                </div>

                <div className="p-3 bg-[#F6F5F4] rounded-lg">
                  <p className="text-xs text-[#717182] mb-1">Last Verified</p>
                  <p className="text-sm font-semibold text-[#1E1E1E]">2 seconds ago</p>
                </div>

                <div className="p-3 bg-[#F6F5F4] rounded-lg">
                  <p className="text-xs text-[#717182] mb-1">Sensor ID</p>
                  <p className="text-sm font-mono font-semibold text-[#1E1E1E]">
                    {samplePatient.cryptoStatus.sensorId}
                  </p>
                </div>

                <div className="p-3 bg-[#1A5FB4]/5 rounded-lg border border-[#1A5FB4]/20">
                  <p className="text-xs text-[#717182] mb-1">Encryption</p>
                  <p className="text-xs font-semibold text-[#1A5FB4]">
                    AES-256-GCM + RSA-2048
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
