/**
 * Security Analytics & Threat Monitoring Dashboard
 * Tabbed interface: Overview | Attacks | Network
 */

import { useState } from 'react';
import { 
  Server, Wifi, Lock, Shield, AlertTriangle, CheckCircle, 
  FileText, Brain, XCircle, Clock, Activity, AlertCircle, ArrowLeft
} from 'lucide-react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface SecurityAnalyticsDashboardProps {
  onBack?: () => void;
  securityMetrics?: any;
  attackDistribution?: any[];
  alerts?: any[];
}

export default function SecurityAnalyticsDashboard({ onBack, securityMetrics, attackDistribution: attackDistributionProp, alerts }: SecurityAnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'attacks' | 'network'>('overview');

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Row 1 */}
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
              <p className="text-3xl font-bold text-[#1E1E1E] mb-1">50</p>
              <p className="text-sm text-[#717182]">Active IoT Connections</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#E5A50A]/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#E5A50A]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1E1E1E] mb-1">3</p>
              <p className="text-sm text-[#717182]">Failed Auth Attempts</p>
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

            {/* Row 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#C01C28]/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#C01C28]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1E1E1E] mb-1">47</p>
              <p className="text-sm text-[#717182]">Attacks Detected</p>
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
                <div className="w-12 h-12 rounded-full bg-[#2EC27E]/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#2EC27E]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1E1E1E] mb-1">92.3%</p>
              <p className="text-sm text-[#717182]">AI Model Accuracy</p>
            </div>

            {/* Row 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#E5A50A]/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-[#E5A50A]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1E1E1E] mb-1">7.8%</p>
              <p className="text-sm text-[#717182]">False Positive Rate</p>
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
    </div>
  );
}