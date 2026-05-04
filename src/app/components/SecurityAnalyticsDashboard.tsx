/**
 * Security Analytics & Threat Monitoring Dashboard
 * Tabbed interface: Overview | Attacks | Network
 */

import { useState } from 'react';
import { 
  Server, Wifi, Lock, Shield, AlertTriangle, CheckCircle, 
  FileText, Brain, XCircle, Clock, Activity, AlertCircle, ArrowLeft, X, TrendingUp, Database, BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { getFailedAuthAttempts } from '../utils/auth';

interface SecurityAnalyticsDashboardProps {
  onBack?: () => void;
  securityMetrics?: any;
  attackDistribution?: any[];
  alerts?: any[];
  totalPatients?: number;
}

export default function SecurityAnalyticsDashboard({ onBack, securityMetrics, attackDistribution: attackDistributionProp, alerts, totalPatients }: SecurityAnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'attacks' | 'network'>('overview');
  const [activeModal, setActiveModal] = useState<'auth' | 'attacks' | 'accuracy' | 'false-positive' | null>(null);

  // Attack distribution data
  const attackData = attackDistributionProp || [
    { name: 'Data Tampering', value: 45, color: '#C01C28' },
    { name: 'Replay Attacks', value: 30, color: '#F59E0B' },
    { name: 'Spoofing', value: 15, color: '#E5A50A' },
    { name: 'Other', value: 10, color: '#717182' },
  ];

  // Recent attack logs
  const attackLogs = alerts || [
    { time: '14:32:45', type: 'Data Tampering', source: '192.168.1.55', target: 'IoT-Device-3A', status: 'Blocked', severity: 'High' },
    { time: '14:28:12', type: 'Replay Attack', source: '10.0.0.102', target: 'IoT-Device-7B', status: 'Blocked', severity: 'Medium' },
    { time: '14:15:33', type: 'Spoofing', source: '172.16.0.88', target: 'IoT-Device-2F', status: 'Blocked', severity: 'High' },
    { time: '13:58:21', type: 'Probe', source: '192.168.1.201', target: 'IoT-Device-5C', status: 'Blocked', severity: 'Low' },
    { time: '13:42:10', type: 'DDoS', source: '203.0.113.45', target: 'Gateway-1', status: 'Blocked', severity: 'Critical' },
  ];

  // Device status data
  const deviceStatus = [
    { id: 'IoT-Device-1A', type: 'Heart Monitor', status: 'Secured', lastVerified: '5s ago', anomalyScore: 0.12, lastAttack: 'None' },
    { id: 'IoT-Device-3B', type: 'BP Cuff', status: 'Secured', lastVerified: '8s ago', anomalyScore: 0.08, lastAttack: '2h ago' },
    { id: 'IoT-Device-7C', type: 'Pulse Oximeter', status: 'Warning', lastVerified: '15s ago', anomalyScore: 0.73, lastAttack: '30m ago' },
    { id: 'IoT-Device-2D', type: 'Glucose Monitor', status: 'Secured', lastVerified: '3s ago', anomalyScore: 0.15, lastAttack: 'None' },
    { id: 'Gateway-1', type: 'Network Gateway', status: 'Secured', lastVerified: '2s ago', anomalyScore: 0.05, lastAttack: '1h ago' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return '#C01C28';
      case 'high': return '#F59E0B';
      case 'medium': return '#E5A50A';
      case 'low': return '#2EC27E';
      default: return '#717182';
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Secured') {
      return <span className="flex items-center gap-1 text-xs font-semibold text-[#2EC27E]">
        <CheckCircle className="w-3 h-3" />
        ✓ Secured
      </span>;
    } else if (status === 'Warning') {
      return <span className="flex items-center gap-1 text-xs font-semibold text-[#E5A50A]">
        <AlertTriangle className="w-3 h-3" />
        ⚠ Warning
      </span>;
    } else {
      return <span className="flex items-center gap-1 text-xs font-semibold text-[#C01C28]">
        <XCircle className="w-3 h-3" />
        ✗ Compromised
      </span>;
    }
  };

  // Mock data for detail modals
  const authAttemptsData = getFailedAuthAttempts();

  const attacksDetailData = [
    { date: '2024-01-15', tampering: 12, replay: 8, spoofing: 3, other: 2 },
    { date: '2024-01-14', tampering: 15, replay: 10, spoofing: 5, other: 3 },
    { date: '2024-01-13', tampering: 8, replay: 6, spoofing: 2, other: 1 },
    { date: '2024-01-12', tampering: 10, replay: 7, spoofing: 4, other: 2 },
    { date: '2024-01-11', tampering: 13, replay: 9, spoofing: 3, other: 2 },
  ];

  const aiAccuracyData = [
    { metric: 'True Positives', value: 1423, percentage: 92.3 },
    { metric: 'False Positives', value: 118, percentage: 7.7 },
    { metric: 'True Negatives', value: 4521, percentage: 98.2 },
    { metric: 'False Negatives', value: 38, percentage: 1.8 },
  ];

  const modelPerformanceHistory = [
    { date: 'Week 1', accuracy: 89.2, precision: 87.5, recall: 90.1, f1Score: 88.8 },
    { date: 'Week 2', accuracy: 90.5, precision: 89.2, recall: 91.3, f1Score: 90.2 },
    { date: 'Week 3', accuracy: 91.8, precision: 90.8, recall: 92.1, f1Score: 91.4 },
    { date: 'Week 4', accuracy: 92.3, precision: 91.5, recall: 93.2, f1Score: 92.3 },
  ];

  const falsePositiveBreakdown = [
    { category: 'Heart Rate Spikes', count: 45, percentage: 38.1, description: 'Exercise-induced elevations' },
    { category: 'BP Fluctuations', count: 32, percentage: 27.1, description: 'White coat syndrome' },
    { category: 'Glucose Variations', count: 25, percentage: 21.2, description: 'Post-meal readings' },
    { category: 'Oxygen Dips', count: 16, percentage: 13.6, description: 'Movement artifacts' },
  ];

  // Render modal function
  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#1A5FB4] to-[#2374C9] p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              {activeModal === 'auth' && <><Lock className="w-7 h-7" /> Failed Authentication Attempts</>}
              {activeModal === 'attacks' && <><AlertCircle className="w-7 h-7" /> Attacks Detected - Detailed View</>}
              {activeModal === 'accuracy' && <><Brain className="w-7 h-7" /> AI Model Performance Metrics</>}
              {activeModal === 'false-positive' && <><XCircle className="w-7 h-7" /> False Positive Analysis</>}
            </h2>
            <button 
              onClick={() => setActiveModal(null)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {activeModal === 'auth' && (
              <div>
                <p className="text-[#717182] mb-6">
                  Showing all failed authentication attempts in the last 24 hours. These attempts were automatically blocked by the security system.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-[#E9EBEF] bg-[#F6F5F4]">
                        <th className="text-left py-3 px-4 font-semibold text-[#1E1E1E]">Timestamp</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#1E1E1E]">Username</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#1E1E1E]">IP Address</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#1E1E1E]">Location</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#1E1E1E]">Attack Method</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#1E1E1E]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authAttemptsData.length > 0 ? authAttemptsData.map((attempt, idx) => (
                        <tr key={idx} className="border-b border-[#E9EBEF] hover:bg-[#F6F5F4]">
                          <td className="py-4 px-4 font-mono text-xs">{attempt.timestamp}</td>
                          <td className="py-4 px-4 font-medium">{attempt.username}</td>
                          <td className="py-4 px-4 font-mono text-xs">{attempt.ip}</td>
                          <td className="py-4 px-4">{attempt.location}</td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 bg-[#C01C28]/10 text-[#C01C28] rounded-lg text-xs font-semibold">
                              {attempt.reason}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="flex items-center gap-1 text-[#2EC27E] font-semibold">
                              <CheckCircle className="w-4 h-4" />
                              {attempt.status}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={6} className="py-8 px-4 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <CheckCircle className="w-12 h-12 text-[#2EC27E]" />
                              <p className="text-[#717182] font-semibold">No failed authentication attempts detected</p>
                              <p className="text-sm text-[#717182]">All login attempts have been successful</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 bg-[#E5A50A]/10 border border-[#E5A50A] rounded-xl">
                  <p className="text-sm text-[#1E1E1E]">
                    <strong>⚠️ Security Recommendation:</strong> Consider implementing IP-based rate limiting and geolocation blocking for non-hospital networks.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'attacks' && (
              <div>
                <p className="text-[#717182] mb-6">
                  Attack detection trends over the past 5 days. All attacks were successfully detected and blocked by the security system.
                </p>
                <div className="mb-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attacksDetailData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="tampering" fill="#C01C28" name="Data Tampering" />
                      <Bar dataKey="replay" fill="#F59E0B" name="Replay Attacks" />
                      <Bar dataKey="spoofing" fill="#E5A50A" name="Spoofing" />
                      <Bar dataKey="other" fill="#717182" name="Other" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#C01C28]/10 border border-[#C01C28]/30 rounded-xl">
                    <h4 className="font-semibold text-[#1E1E1E] mb-2">Most Common Attack</h4>
                    <p className="text-2xl font-bold text-[#C01C28]">Data Tampering</p>
                    <p className="text-sm text-[#717182] mt-1">45 incidents detected (45% of total)</p>
                  </div>
                  <div className="p-4 bg-[#2EC27E]/10 border border-[#2EC27E]/30 rounded-xl">
                    <h4 className="font-semibold text-[#1E1E1E] mb-2">Block Rate</h4>
                    <p className="text-2xl font-bold text-[#2EC27E]">100%</p>
                    <p className="text-sm text-[#717182] mt-1">All attacks successfully prevented</p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'accuracy' && (
              <div>
                <p className="text-[#717182] mb-6">
                  LSTM-based anomaly detection model performance metrics. The model analyzes patient vital signs to detect abnormal patterns.
                </p>
                
                {/* Confusion Matrix */}
                <div className="mb-8 grid grid-cols-2 gap-4">
                  {aiAccuracyData.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#F6F5F4] border border-[#E9EBEF] rounded-xl">
                      <p className="text-sm text-[#717182] mb-1">{item.metric}</p>
                      <p className="text-3xl font-bold text-[#1E1E1E]">{item.value}</p>
                      <p className="text-sm font-semibold text-[#1A5FB4] mt-1">{item.percentage}%</p>
                    </div>
                  ))}
                </div>

                {/* Performance History Chart */}
                <h4 className="font-semibold text-[#1E1E1E] mb-4">Model Performance Over Time</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={modelPerformanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[85, 95]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="accuracy" stroke="#1A5FB4" strokeWidth={2} name="Accuracy (%)" />
                    <Line type="monotone" dataKey="precision" stroke="#2EC27E" strokeWidth={2} name="Precision (%)" />
                    <Line type="monotone" dataKey="recall" stroke="#E5A50A" strokeWidth={2} name="Recall (%)" />
                    <Line type="monotone" dataKey="f1Score" stroke="#C01C28" strokeWidth={2} name="F1 Score (%)" />
                  </LineChart>
                </ResponsiveContainer>

                <div className="mt-6 p-4 bg-[#2EC27E]/10 border border-[#2EC27E] rounded-xl">
                  <p className="text-sm text-[#1E1E1E]">
                    <strong>✓ Model Status:</strong> Current accuracy of 92.3% exceeds the 90% threshold for clinical deployment. The model is performing optimally.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'false-positive' && (
              <div>
                <p className="text-[#717182] mb-6">
                  Analysis of false positive detections. These are legitimate patient conditions that were initially flagged as anomalies.
                </p>
                
                <div className="mb-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={falsePositiveBreakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#E5A50A" name="False Positive Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  {falsePositiveBreakdown.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#F6F5F4] border border-[#E9EBEF] rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#1E1E1E]">{item.category}</h4>
                        <span className="text-sm font-bold text-[#E5A50A]">{item.percentage}%</span>
                      </div>
                      <p className="text-sm text-[#717182]">{item.description}</p>
                      <p className="text-xs text-[#1E1E1E] mt-2">
                        <strong>{item.count}</strong> false positives out of 118 total
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-[#1A5FB4]/10 border border-[#1A5FB4] rounded-xl">
                  <p className="text-sm text-[#1E1E1E]">
                    <strong>📊 Analysis:</strong> The 7.8% false positive rate is acceptable for healthcare IoT security. Tuning thresholds could reduce this further but may increase false negatives.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-8 py-5">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 mb-3 rounded-lg bg-[#F6F5F4] hover:bg-[#E9EBEF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Dashboard</span>
            </button>
          )}
          <h1 className="text-2xl font-bold text-[#1E1E1E] mb-4">
            Security Analytics & Threat Monitoring
          </h1>

          {/* TABS */}
          <div className="flex items-center gap-6 border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-2 font-semibold transition-colors relative ${
                activeTab === 'overview' ? 'text-[#1A5FB4]' : 'text-[#717182] hover:text-[#1E1E1E]'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5FB4]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('attacks')}
              className={`pb-3 px-2 font-semibold transition-colors relative ${
                activeTab === 'attacks' ? 'text-[#1A5FB4]' : 'text-[#717182] hover:text-[#1E1E1E]'
              }`}
            >
              Attacks
              {activeTab === 'attacks' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5FB4]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`pb-3 px-2 font-semibold transition-colors relative ${
                activeTab === 'network' ? 'text-[#1A5FB4]' : 'text-[#717182] hover:text-[#1E1E1E]'
              }`}
            >
              Network
              {activeTab === 'network' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5FB4]" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Row 1: ALL 4 CLICKABLE METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveModal('auth')}
                className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF] hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#E5A50A]/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-[#E5A50A]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">{authAttemptsData.length}</p>
                <p className="text-sm text-[#717182]">Failed Auth Attempts</p>
                <p className="text-xs text-[#1A5FB4] mt-2 font-semibold">Click for details →</p>
              </button>

              <button
                onClick={() => setActiveModal('attacks')}
                className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF] hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#C01C28]/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-[#C01C28]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">47</p>
                <p className="text-sm text-[#717182]">Attacks Detected</p>
                <p className="text-xs text-[#1A5FB4] mt-2 font-semibold">Click for details →</p>
              </button>

              <button
                onClick={() => setActiveModal('accuracy')}
                className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF] hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#2EC27E]/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-[#2EC27E]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">92.3%</p>
                <p className="text-sm text-[#717182]">AI Model Accuracy</p>
                <p className="text-xs text-[#1A5FB4] mt-2 font-semibold">Click for details →</p>
              </button>

              <button
                onClick={() => setActiveModal('false-positive')}
                className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF] hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#E5A50A]/10 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-[#E5A50A]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">7.8%</p>
                <p className="text-sm text-[#717182]">False Positive Rate</p>
                <p className="text-xs text-[#1A5FB4] mt-2 font-semibold">Click for details →</p>
              </button>
            </div>

            {/* Row 2: STATIC SYSTEM METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#2EC27E]/10 flex items-center justify-center">
                    <Server className="w-6 h-6 text-[#2EC27E]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">99.8%</p>
                <p className="text-sm text-[#717182]">System Uptime</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#1A5FB4]/10 flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-[#1A5FB4]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">{totalPatients}</p>
                <p className="text-sm text-[#717182]">Patient Records Loaded</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#2EC27E]/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#2EC27E]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">100%</p>
                <p className="text-sm text-[#717182]">Data Integrity Rate</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#2EC27E]/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#2EC27E]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">99.9%</p>
                <p className="text-sm text-[#717182]">HMAC Success Rate</p>
              </div>
            </div>

            {/* Row 3: ADDITIONAL METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#1A5FB4]/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#1A5FB4]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">15,234</p>
                <p className="text-sm text-[#717182]">Digital Signatures Issued</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#1A5FB4]/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#1A5FB4]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">1.2ms</p>
                <p className="text-sm text-[#717182]">Average Response Time</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#2EC27E]/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-[#2EC27E]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">23,456</p>
                <p className="text-sm text-[#717182]">Encrypted Transmissions</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#E5A50A]/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-[#E5A50A]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">125</p>
                <p className="text-sm text-[#717182]">Anomalies Detected</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ATTACKS */}
        {activeTab === 'attacks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT: Pie Chart */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-6">Attack Type Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attackData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attackData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* RIGHT: Attack Logs Table */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Recent Attack Logs</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E9EBEF]">
                      <th className="text-left py-3 px-2 text-[#717182] font-semibold">Time</th>
                      <th className="text-left py-3 px-2 text-[#717182] font-semibold">Attack Type</th>
                      <th className="text-left py-3 px-2 text-[#717182] font-semibold">Source IP</th>
                      <th className="text-left py-3 px-2 text-[#717182] font-semibold">Target</th>
                      <th className="text-left py-3 px-2 text-[#717182] font-semibold">Status</th>
                      <th className="text-left py-3 px-2 text-[#717182] font-semibold">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attackLogs.map((log, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-[#E9EBEF] hover:bg-[#F6F5F4] transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                        }`}
                      >
                        <td className="py-3 px-2 font-mono text-xs">{log.time}</td>
                        <td className="py-3 px-2 font-medium">{log.type}</td>
                        <td className="py-3 px-2 font-mono text-xs">{log.source}</td>
                        <td className="py-3 px-2">{log.target}</td>
                        <td className="py-3 px-2">
                          <span className="text-[#2EC27E] font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {log.status} ✓
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-semibold"
                            style={{ 
                              backgroundColor: `${getSeverityColor(log.severity)}20`,
                              color: getSeverityColor(log.severity)
                            }}
                          >
                            {log.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NETWORK */}
        {activeTab === 'network' && (
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
            <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Device Status Monitor</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#E9EBEF]">
                    <th className="text-left py-3 px-4 text-[#717182] font-semibold">Device ID</th>
                    <th className="text-left py-3 px-4 text-[#717182] font-semibold">Type</th>
                    <th className="text-left py-3 px-4 text-[#717182] font-semibold">Security Status</th>
                    <th className="text-left py-3 px-4 text-[#717182] font-semibold">Last Verified</th>
                    <th className="text-left py-3 px-4 text-[#717182] font-semibold">Anomaly Score</th>
                    <th className="text-left py-3 px-4 text-[#717182] font-semibold">Last Attack</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceStatus.map((device, index) => (
                    <tr 
                      key={index}
                      className={`border-b border-[#E9EBEF] hover:bg-[#F6F5F4] transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                      }`}
                    >
                      <td className="py-4 px-4 font-mono text-sm font-semibold">{device.id}</td>
                      <td className="py-4 px-4">{device.type}</td>
                      <td className="py-4 px-4">{getStatusBadge(device.status)}</td>
                      <td className="py-4 px-4 text-[#717182]">{device.lastVerified}</td>
                      <td className="py-4 px-4">
                        <span 
                          className={`font-semibold ${
                            device.anomalyScore < 0.5 ? 'text-[#2EC27E]' : 'text-[#E5A50A]'
                          }`}
                        >
                          {device.anomalyScore.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[#717182]">{device.lastAttack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {renderModal()}
    </div>
  );
}