import { useState, useEffect } from 'react';
import { Heart, Shield, Activity, AlertTriangle, Bell, Settings, LogOut, CheckCircle, TrendingUp, Users, Database, Upload, Eye, BarChart3, Lock, Wifi, Server, Cpu, Globe, Network, Search, FileText, Microscope, XCircle, AlertCircle, XOctagon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateVitalSignsHistory } from '../data/mockData';
import { Alert, Patient } from '../App';
import PatientListView from './PatientListView';
import AdminUserManagement from './AdminUserManagement';
import { formatTime12Hour, formatDateLong } from '../utils/timeFormat';
import { isAdmin } from '../utils/rbac';

interface EnhancedDashboardProps {
  patients: Patient[];
  alerts: Alert[];
  securityMetrics: any;
  attackDistribution: any[];
  usingRealData: boolean;
  userRole: 'admin' | 'doctor' | 'security_officer';
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
  userRole,
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
  const [filterStatus, setFilterStatus] = useState<'all' | 'normal' | 'warning' | 'critical'>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [showAllAlertsModal, setShowAllAlertsModal] = useState(false);

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
      {/* Professional Header with Gradient */}
      <header className="bg-gradient-to-r from-[#1A5FB4] via-[#2374C9] to-[#3584D8] border-b-4 border-[#155A9F] shadow-lg relative overflow-hidden">
        {/* Floating Icons Background - Combined from all 3 cards */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Security Icons (Blue Card) - White color - Each with UNIQUE animation */}
          <div className="absolute top-[15%] left-[8%] opacity-20" style={{ animation: 'float-1 11s ease-in-out infinite' }}>
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div className="absolute top-[70%] left-[5%] opacity-20" style={{ animation: 'float-2 13s ease-in-out infinite 0.5s' }}>
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[25%] left-[15%] opacity-25" style={{ animation: 'float-3 9s ease-in-out infinite 1s' }}>
            <Server className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[80%] left-[12%] opacity-20" style={{ animation: 'float-4 14s ease-in-out infinite 1.5s' }}>
            <Wifi className="w-5 h-5 text-white" />
          </div>
          <div className="absolute top-[45%] left-[18%] opacity-25" style={{ animation: 'float-5 10s ease-in-out infinite 2s' }}>
            <Globe className="w-7 h-7 text-white" />
          </div>
          <div className="absolute top-[35%] left-[10%] opacity-20" style={{ animation: 'float-6 15s ease-in-out infinite 2.5s' }}>
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[60%] left-[20%] opacity-25" style={{ animation: 'float-7 8s ease-in-out infinite 3s' }}>
            <Network className="w-5 h-5 text-white" />
          </div>

          {/* Research Icons (Golden Card) - White color - Each with UNIQUE animation */}
          <div className="absolute top-[20%] left-[35%] opacity-15" style={{ animation: 'float-8 12s ease-in-out infinite 0.3s' }}>
            <Search className="w-7 h-7 text-white" />
          </div>
          <div className="absolute top-[75%] left-[30%] opacity-15" style={{ animation: 'float-9 16s ease-in-out infinite 0.8s' }}>
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[30%] left-[40%] opacity-15" style={{ animation: 'float-10 7s ease-in-out infinite 1.3s' }}>
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-[85%] left-[38%] opacity-15" style={{ animation: 'float-11 13s ease-in-out infinite 1.8s' }}>
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="absolute top-[50%] left-[32%] opacity-15" style={{ animation: 'float-12 11s ease-in-out infinite 2.3s' }}>
            <Microscope className="w-7 h-7 text-white" />
          </div>
          <div className="absolute top-[40%] left-[42%] opacity-15" style={{ animation: 'float-13 14s ease-in-out infinite 2.8s' }}>
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[65%] left-[36%] opacity-15" style={{ animation: 'float-14 9s ease-in-out infinite 3.3s' }}>
            <Users className="w-5 h-5 text-white" />
          </div>

          {/* Alert Icons (Red Card) - White color - Each with UNIQUE animation */}
          <div className="absolute top-[18%] right-[8%] opacity-20" style={{ animation: 'float-15 10s ease-in-out infinite 0.4s' }}>
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div className="absolute top-[72%] right-[5%] opacity-20" style={{ animation: 'float-16 15s ease-in-out infinite 0.9s' }}>
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[28%] right-[12%] opacity-25" style={{ animation: 'float-17 8s ease-in-out infinite 1.4s' }}>
            <XCircle className="w-7 h-7 text-white" />
          </div>
          <div className="absolute top-[82%] right-[10%] opacity-20" style={{ animation: 'float-18 12s ease-in-out infinite 1.9s' }}>
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div className="absolute top-[48%] right-[15%] opacity-25" style={{ animation: 'float-19 11s ease-in-out infinite 2.4s' }}>
            <XOctagon className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[38%] right-[6%] opacity-20" style={{ animation: 'float-20 13s ease-in-out infinite 2.9s' }}>
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div className="absolute top-[62%] right-[18%] opacity-25" style={{ animation: 'float-21 7s ease-in-out infinite 3.4s' }}>
            <Bell className="w-5 h-5 text-white" />
          </div>

          {/* Center Icons - Mix of all types - Each with UNIQUE animation */}
          <div className="absolute top-[12%] left-[50%] opacity-18" style={{ animation: 'float-22 14s ease-in-out infinite 0.6s' }}>
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[55%] left-[48%] opacity-18" style={{ animation: 'float-23 16s ease-in-out infinite 1.1s' }}>
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div className="absolute top-[88%] left-[52%] opacity-18" style={{ animation: 'float-24 9s ease-in-out infinite 1.6s' }}>
            <Activity className="w-6 h-6 text-white" />
          </div>
          
          {/* Extra icons for more coverage */}
          <div className="absolute top-[22%] left-[25%] opacity-18" style={{ animation: 'float-25 13s ease-in-out infinite 2.1s' }}>
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="absolute top-[52%] right-[25%] opacity-18" style={{ animation: 'float-26 10s ease-in-out infinite 2.6s' }}>
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[68%] left-[45%] opacity-18" style={{ animation: 'float-27 12s ease-in-out infinite 3.1s' }}>
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div className="absolute top-[32%] right-[30%] opacity-18" style={{ animation: 'float-28 11s ease-in-out infinite 3.6s' }}>
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Header Content - with higher z-index to stay on top */}
        <div className="px-8 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white drop-shadow-md">HealthCare-Security</h1>
                <p className="text-sm text-white/90">Real-Time Patient Monitoring System</p>
              </div>
              {usingRealData && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1 border border-white/30">
                  <Database className="w-3 h-3" />
                  Real Dataset Active
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {usingRealData && (
                <button
                  onClick={onResetData}
                  className="px-4 py-2 text-sm bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/30"
                >
                  Reset to Demo
                </button>
              )}
              {!usingRealData && (
                <button
                  onClick={onCSVUpload}
                  className="px-4 py-2 text-sm bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2 backdrop-blur-sm border border-white/30"
                >
                  <Upload className="w-4 h-4" />
                  Load Dataset
                </button>
              )}
              <div className="text-right px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                <p className="text-xs text-white/80">{formatDateLong(currentTime)}</p>
                <p className="text-sm font-semibold font-mono text-white">{formatTime12Hour(currentTime)}</p>
              </div>
              <button 
                className="relative p-3 rounded-xl hover:bg-white/20 transition-all text-white"
                onClick={() => activeAlerts.length > 0 && onShowAlert(activeAlerts[0])}
              >
                <Bell className="w-5 h-5" />
                {activeAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#C01C28] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {activeAlerts.length}
                  </span>
                )}
              </button>
              <div className="relative">
                <button 
                  className="p-3 rounded-xl hover:bg-white/20 transition-all text-white"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="w-5 h-5" />
                </button>
                
                {/* Settings Dropdown */}
                {showSettings && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowSettings(false)}
                    />
                    
                    {/* Settings Menu */}
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-[#1A5FB4]/10 z-50 overflow-hidden">
                      <div className="bg-gradient-to-br from-[#1A5FB4] to-[#155A9F] p-4">
                        <div className="flex items-center gap-3">
                          <Settings className="w-6 h-6 text-white" />
                          <h3 className="font-semibold text-white">System Settings</h3>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-1">
                        {/* Dataset Management - Only for Admins */}
                        {isAdmin(userRole) && (
                          <div className="pb-3 mb-3 border-b border-gray-200">
                            <p className="text-xs font-semibold text-[#717182] uppercase tracking-wider mb-2">Dataset</p>
                            {!usingRealData ? (
                              <button 
                                onClick={() => {
                                  onCSVUpload();
                                  setShowSettings(false);
                                }}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#1A5FB4]/10 transition-colors text-left"
                              >
                                <Upload className="w-5 h-5 text-[#1A5FB4]" />
                                <div>
                                  <p className="text-sm font-medium text-[#1E1E1E]">Load CSV Dataset</p>
                                  <p className="text-xs text-[#717182]">Import patient data</p>
                                </div>
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  onResetData();
                                  setShowSettings(false);
                                }}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#C01C28]/10 transition-colors text-left"
                              >
                                <Database className="w-5 h-5 text-[#C01C28]" />
                                <div>
                                  <p className="text-sm font-medium text-[#1E1E1E]">Reset to Demo Data</p>
                                  <p className="text-xs text-[#717182]">Switch back to mock data</p>
                                </div>
                              </button>
                            )}
                          </div>
                        )}
                        
                        {/* Research Tools */}
                        <div className="pb-3 mb-3 border-b border-gray-200">
                          <p className="text-xs font-semibold text-[#717182] uppercase tracking-wider mb-2">Research Tools</p>
                          {onViewModelPerformance && (
                            <button 
                              onClick={() => {
                                onViewModelPerformance();
                                setShowSettings(false);
                              }}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#1A5FB4]/10 transition-colors text-left"
                            >
                              <BarChart3 className="w-5 h-5 text-[#1A5FB4]" />
                              <div>
                                <p className="text-sm font-medium text-[#1E1E1E]">Model Performance</p>
                                <p className="text-xs text-[#717182]">View LSTM metrics</p>
                              </div>
                            </button>
                          )}
                          {onViewAttackDemo && (
                            <button 
                              onClick={() => {
                                onViewAttackDemo();
                                setShowSettings(false);
                              }}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#C01C28]/10 transition-colors text-left"
                            >
                              <Eye className="w-5 h-5 text-[#C01C28]" />
                              <div>
                                <p className="text-sm font-medium text-[#1E1E1E]">Attack Demonstrations</p>
                                <p className="text-xs text-[#717182]">View security tests</p>
                              </div>
                            </button>
                          )}
                        </div>
                        
                        {/* Analytics */}
                        <div className="pb-3 mb-3 border-b border-gray-200">
                          <p className="text-xs font-semibold text-[#717182] uppercase tracking-wider mb-2">Analytics</p>
                          <button 
                            onClick={() => {
                              onViewSecurity();
                              setShowSettings(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#1A5FB4]/10 transition-colors text-left"
                          >
                            <Shield className="w-5 h-5 text-[#2EC27E]" />
                            <div>
                              <p className="text-sm font-medium text-[#1E1E1E]">Security Analytics</p>
                              <p className="text-xs text-[#717182]">View system metrics</p>
                            </div>
                          </button>
                        </div>
                        
                        {/* System Info */}
                        <div className="p-3 rounded-lg bg-gradient-to-br from-[#1A5FB4]/10 to-[#1A5FB4]/5">
                          <p className="text-xs font-semibold text-[#717182] mb-2">System Status</p>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#717182]">Dataset:</span>
                              <span className="text-xs font-semibold text-[#1E1E1E]">
                                {usingRealData ? 'Real Data' : 'Demo Data'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#717182]">Patients:</span>
                              <span className="text-xs font-semibold text-[#1E1E1E]">{patients.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#717182]">Active Alerts:</span>
                              <span className="text-xs font-semibold text-[#C01C28]">{activeAlerts.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#717182]">Uptime:</span>
                              <span className="text-xs font-semibold text-[#2EC27E]">{securityMetrics.uptime.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button 
                onClick={onLogout}
                className="p-3 rounded-xl hover:bg-white/20 transition-all text-white"
              >
                <LogOut className="w-5 h-5" />
              </button>
              {isAdmin(userRole) && (
                <AdminUserManagement />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Patient Overview - Below Header */}
      <div className="bg-white border-b-2 border-[#1A5FB4]/10 shadow-sm">
        {/* Read-Only Banner for Doctors */}
        {userRole === 'doctor' && (
          <div className="px-8 py-3 bg-[#1A5FB4]/10 border-b border-[#1A5FB4]/20">
            <div className="flex items-center gap-2 text-[#1A5FB4]">
              <Eye className="w-4 h-4" />
              <p className="text-sm font-semibold">📖 Read-Only Mode: You can view patient data but cannot make changes.</p>
            </div>
          </div>
        )}
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1E1E1E]">Patient Overview</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-3 rounded-xl border-2 transition-all text-left ${
                filterStatus === 'all' 
                  ? 'bg-gradient-to-br from-[#FB923C] to-[#F97316] border-[#FB923C] shadow-lg' 
                  : 'bg-gradient-to-br from-[#FB923C]/10 to-[#FDBA74]/10 border-[#FB923C]/30 hover:shadow-md hover:border-[#FB923C]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs mb-1 ${filterStatus === 'all' ? 'text-white/90' : 'text-[#717182]'}`}>Total Patients</p>
                  <p className={`text-2xl font-semibold ${filterStatus === 'all' ? 'text-white' : 'text-[#1E1E1E]'}`}>{patients.length}</p>
                </div>
                <Users className={`w-8 h-8 ${filterStatus === 'all' ? 'text-white' : 'text-[#FB923C]'}`} />
              </div>
            </button>
            <button
              onClick={() => setFilterStatus('normal')}
              className={`px-4 py-3 rounded-xl border-2 transition-all text-left ${
                filterStatus === 'normal' 
                  ? 'bg-gradient-to-br from-[#2EC27E] to-[#26A269] border-[#2EC27E] shadow-lg' 
                  : 'bg-gradient-to-br from-[#2EC27E]/10 to-[#6EE7B7]/10 border-[#2EC27E]/30 hover:shadow-md hover:border-[#2EC27E]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs mb-1 ${filterStatus === 'normal' ? 'text-white/90' : 'text-[#717182]'}`}>Normal Status</p>
                  <p className={`text-2xl font-semibold ${filterStatus === 'normal' ? 'text-white' : 'text-[#2EC27E]'}`}>{normalPatients}</p>
                </div>
                <CheckCircle className={`w-8 h-8 ${filterStatus === 'normal' ? 'text-white' : 'text-[#2EC27E]'}`} />
              </div>
            </button>
            <button
              onClick={() => setFilterStatus('warning')}
              className={`px-4 py-3 rounded-xl border-2 transition-all text-left ${
                filterStatus === 'warning' 
                  ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706] border-[#F59E0B] shadow-lg' 
                  : 'bg-gradient-to-br from-[#F59E0B]/10 to-[#FCD34D]/10 border-[#F59E0B]/30 hover:shadow-md hover:border-[#F59E0B]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs mb-1 ${filterStatus === 'warning' ? 'text-white/90' : 'text-[#717182]'}`}>Warning Status</p>
                  <p className={`text-2xl font-semibold ${filterStatus === 'warning' ? 'text-white' : 'text-[#F59E0B]'}`}>{warningPatients}</p>
                </div>
                <AlertTriangle className={`w-8 h-8 ${filterStatus === 'warning' ? 'text-white' : 'text-[#F59E0B]'}`} />
              </div>
            </button>
            <button
              onClick={() => setFilterStatus('critical')}
              className={`px-4 py-3 rounded-xl border-2 transition-all text-left ${
                filterStatus === 'critical' 
                  ? 'bg-gradient-to-br from-[#DC2626] to-[#B91C1C] border-[#DC2626] shadow-lg' 
                  : 'bg-gradient-to-br from-[#DC2626]/10 to-[#FCA5A5]/10 border-[#DC2626]/30 hover:shadow-md hover:border-[#DC2626]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs mb-1 ${filterStatus === 'critical' ? 'text-white/90' : 'text-[#717182]'}`}>Critical Status</p>
                  <p className={`text-2xl font-semibold ${filterStatus === 'critical' ? 'text-white' : 'text-[#DC2626]'}`}>{criticalPatients}</p>
                </div>
                <AlertTriangle className={`w-8 h-8 ${filterStatus === 'critical' ? 'text-white' : 'text-[#DC2626]'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-4">
        <div className="space-y-6">
          {/* Patient List View - Compact */}
          <PatientListView
            patients={patients}
            onViewPatient={onViewPatient}
            externalFilter={filterStatus}
            itemsPerPage={10}
          />

          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Metrics Card with Floating Network Icons */}
            <div className="relative bg-gradient-to-br from-[#1A5FB4] to-[#155A9F] rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Floating Network/Security Icons Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Icon 1 - Shield */}
                <div className="absolute top-[10%] left-[15%] animate-card-float-1 opacity-35">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                {/* Icon 2 - Lock */}
                <div className="absolute top-[65%] left-[5%] animate-card-float-2 opacity-35">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                {/* Icon 3 - Server */}
                <div className="absolute top-[25%] right-[10%] animate-card-float-3 opacity-40">
                  <Server className="w-7 h-7 text-white" />
                </div>
                {/* Icon 4 - Wifi */}
                <div className="absolute top-[75%] right-[15%] animate-card-float-1 opacity-35">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                {/* Icon 5 - Globe */}
                <div className="absolute top-[50%] left-[80%] animate-card-float-2 opacity-40">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                {/* Icon 6 - Cpu */}
                <div className="absolute top-[40%] right-[5%] animate-card-float-3 opacity-35">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
                {/* Icon 7 - Network */}
                <div className="absolute top-[85%] left-[40%] animate-card-float-1 opacity-40">
                  <Network className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content - with higher z-index to stay on top */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">System Status</h3>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <span className="text-sm text-white/90">System Uptime</span>
                    <span className="text-sm font-semibold text-white">{securityMetrics.uptime.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <span className="text-sm text-white/90">Data Integrity</span>
                    <span className="text-sm font-semibold text-white">{securityMetrics.dataIntegrityRate}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <span className="text-sm text-white/90">Active Connections</span>
                    <span className="text-sm font-semibold text-white">{securityMetrics.activeConnections}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <span className="text-sm text-white/90">Attacks Blocked (24h)</span>
                    <span className="text-sm font-semibold text-[#FEF0C7]">{securityMetrics.attacksDetected}</span>
                  </div>
                </div>
                <button 
                  onClick={onViewSecurity}
                  className="w-full mt-4 py-3 rounded-lg bg-white text-[#1A5FB4] font-semibold hover:bg-white/90 transition-all shadow-md hover:shadow-lg"
                >
                  View Security Analytics
                </button>
              </div>
            </div>

            {/* Research Analytics Card with Golden Gradient and Floating Icons */}
            <div className="relative bg-gradient-to-br from-[#F59E0B] via-[#FCD34D] to-[#FBBF24] rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
              {/* Floating Research Icons Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Icon 1 - Search */}
                <div className="absolute top-[12%] left-[10%] animate-card-float-1 opacity-10">
                  <Search className="w-8 h-8 text-[#78350F]" />
                </div>
                {/* Icon 2 - FileText */}
                <div className="absolute top-[70%] left-[8%] animate-card-float-2 opacity-10">
                  <FileText className="w-7 h-7 text-[#78350F]" />
                </div>
                {/* Icon 3 - BarChart3 */}
                <div className="absolute top-[20%] right-[12%] animate-card-float-3 opacity-10">
                  <BarChart3 className="w-9 h-9 text-[#78350F]" />
                </div>
                {/* Icon 4 - Activity */}
                <div className="absolute top-[80%] right-[10%] animate-card-float-1 opacity-10">
                  <Activity className="w-6 h-6 text-[#78350F]" />
                </div>
                {/* Icon 5 - Microscope */}
                <div className="absolute top-[45%] left-[75%] animate-card-float-2 opacity-10">
                  <Microscope className="w-8 h-8 text-[#78350F]" />
                </div>
                {/* Icon 6 - TrendingUp */}
                <div className="absolute top-[35%] right-[8%] animate-card-float-3 opacity-10">
                  <TrendingUp className="w-7 h-7 text-[#78350F]" />
                </div>
                {/* Icon 7 - Users */}
                <div className="absolute top-[88%] left-[45%] animate-card-float-1 opacity-10">
                  <Users className="w-6 h-6 text-[#78350F]" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#78350F]">Research Tools</h3>
                  <Microscope className="w-6 h-6 text-[#78350F]" />
                </div>
                
                <div className="space-y-3">
                  {/* Attack Demonstration Button */}
                  {onViewAttackDemo && (
                    <button 
                      onClick={onViewAttackDemo}
                      className="w-full py-3 rounded-lg bg-white/90 backdrop-blur-sm text-[#C01C28] font-semibold hover:bg-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#78350F]/30"
                    >
                      <Eye className="w-5 h-5" />
                      Attack Demonstrations
                    </button>
                  )}
                  
                  {/* Model Performance Button */}
                  {onViewModelPerformance && (
                    <button 
                      onClick={onViewModelPerformance}
                      className="w-full py-3 rounded-lg bg-[#78350F]/20 backdrop-blur-sm text-[#78350F] font-semibold hover:bg-[#78350F]/30 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#78350F]/30"
                    >
                      <BarChart3 className="w-5 h-5" />
                      Model Performance
                    </button>
                  )}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-[#78350F]/20 backdrop-blur-sm border-2 border-[#78350F]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-[#78350F]" />
                    <span className="font-semibold text-[#78350F]">AI Performance</span>
                  </div>
                  <p className="text-sm text-[#78350F]/90 mb-2">
                    Accuracy: {securityMetrics.aiAccuracy.toFixed(1)}%
                  </p>
                  <p className="text-sm text-[#78350F]/90">
                    False Positive Rate: {securityMetrics.falsePositiveRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Active Alerts Card with Red Gradient and Floating Alert Icons */}
            <div className="relative bg-gradient-to-br from-[#C01C28] to-[#A01520] rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
              {/* Floating Alert/Error Icons Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Icon 1 - AlertTriangle */}
                <div className="absolute top-[10%] left-[12%] animate-card-float-1 opacity-20">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                {/* Icon 2 - Bell */}
                <div className="absolute top-[68%] left-[7%] animate-card-float-2 opacity-20">
                  <Bell className="w-7 h-7 text-white" />
                </div>
                {/* Icon 3 - XCircle */}
                <div className="absolute top-[22%] right-[14%] animate-card-float-3 opacity-25">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
                {/* Icon 4 - AlertCircle */}
                <div className="absolute top-[78%] right-[12%] animate-card-float-1 opacity-20">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                {/* Icon 5 - XOctagon */}
                <div className="absolute top-[48%] left-[78%] animate-card-float-2 opacity-25">
                  <XOctagon className="w-7 h-7 text-white" />
                </div>
                {/* Icon 6 - AlertTriangle (second one) */}
                <div className="absolute top-[38%] right-[6%] animate-card-float-3 opacity-20">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                {/* Icon 7 - Bell (second one) */}
                <div className="absolute top-[85%] left-[42%] animate-card-float-1 opacity-25">
                  <Bell className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Active Alerts</h3>
                  <Bell className="w-6 h-6 text-white" />
                </div>

                {activeAlerts.length > 0 ? (
                  <div className="space-y-3">
                    {activeAlerts.slice(0, 3).map((alert) => (
                      <div
                        key={alert.id}
                        className="p-4 rounded-xl border-2 border-white/30 bg-white/20 cursor-pointer hover:bg-white/30 transition-colors backdrop-blur-sm"
                        onClick={() => onShowAlert(alert)}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white mb-1">{alert.type}</p>
                            <p className="text-xs text-white/80">{alert.patientName} - Room {alert.room}</p>
                            <p className="text-xs text-white/70 mt-1">{alert.timeDetected}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {activeAlerts.length > 3 && (
                      <p className="text-sm text-center text-white/90">
                        +{activeAlerts.length - 3} more alerts
                      </p>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAllAlertsModal(true);
                      }}
                      className="w-full py-3 rounded-lg bg-white text-[#C01C28] font-semibold hover:bg-white/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      View All {activeAlerts.length} Alerts
                    </button>
                  </div>
                ) : (
                  <div className="p-8 rounded-xl bg-white/20 border-2 border-white/30 text-center backdrop-blur-sm">
                    <CheckCircle className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white">No Active Alerts</p>
                    <p className="text-xs text-white/80 mt-1">All patients stable</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Alerts Modal */}
      {showAllAlertsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAllAlertsModal(false)}>
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#C01C28] to-[#A01520] p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <AlertTriangle className="w-7 h-7" />
                All Active Alerts ({activeAlerts.length})
              </h2>
              <button 
                onClick={() => setShowAllAlertsModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <p className="text-[#717182] mb-6">
                Click on any alert below to view detailed patient information and vital signs analysis.
              </p>

              {activeAlerts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-[#E9EBEF]">
                        <th className="text-left py-3 px-4 text-[#717182] font-semibold">Severity</th>
                        <th className="text-left py-3 px-4 text-[#717182] font-semibold">Alert Type</th>
                        <th className="text-left py-3 px-4 text-[#717182] font-semibold">Patient</th>
                        <th className="text-left py-3 px-4 text-[#717182] font-semibold">Room</th>
                        <th className="text-left py-3 px-4 text-[#717182] font-semibold">Vital Sign</th>
                        <th className="text-left py-3 px-4 text-[#717182] font-semibold">Time Detected</th>
                        <th className="text-left py-3 px-4 text-[#717182] font-semibold">AI Score</th>
                        <th className="text-left py-3 px-4 text-[#717182] font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeAlerts.map((alert, index) => (
                        <tr
                          key={alert.id}
                          onClick={() => {
                            setShowAllAlertsModal(false);
                            onShowAlert(alert);
                          }}
                          className={`border-b border-[#E9EBEF] hover:bg-[#C01C28]/5 cursor-pointer transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                          }`}
                        >
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase inline-block ${
                              alert.severity === 'critical' ? 'bg-[#C01C28] text-white' : 
                              alert.severity === 'warning' ? 'bg-[#E5A50A] text-white' : 'bg-[#1A5FB4] text-white'
                            }`}>
                              {alert.severity}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${
                                alert.severity === 'critical' ? 'text-[#C01C28]' : 
                                alert.severity === 'warning' ? 'text-[#E5A50A]' : 'text-[#1A5FB4]'
                              }`} />
                              <span className="font-semibold text-[#1E1E1E]">{alert.type}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[#1E1E1E] font-medium">{alert.patientName}</td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 bg-[#1A5FB4]/10 text-[#1A5FB4] rounded-md font-semibold text-xs">
                              {alert.room}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[#717182]">{alert.vitalSign}</td>
                          <td className="py-4 px-4 text-[#717182] font-mono text-xs">{alert.timeDetected}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <div className="w-full bg-[#E9EBEF] rounded-full h-2 max-w-[80px]">
                                <div 
                                  className="bg-[#2EC27E] h-2 rounded-full" 
                                  style={{ width: `${alert.aiScore * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-[#1E1E1E] ml-1">
                                {(alert.aiScore * 100).toFixed(0)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {alert.cryptoVerified ? (
                              <span className="flex items-center gap-1 text-[#2EC27E]">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs font-semibold">Verified</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[#E5A50A]">
                                <XCircle className="w-4 h-4" />
                                <span className="text-xs font-semibold">Pending</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-[#2EC27E] mx-auto mb-4" />
                  <p className="text-lg font-semibold text-[#1E1E1E] mb-2">No Active Alerts</p>
                  <p className="text-sm text-[#717182]">All patients are in stable condition</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}