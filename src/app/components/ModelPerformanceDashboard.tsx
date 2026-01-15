/**
 * Model Performance & Research Analytics Dashboard
 * Tabs: LSTM Model | Hybrid Encryption | Performance Comparison
 */

import { useState } from 'react';
import { 
  Target, Crosshair, Search, TrendingUp, TrendingDown, 
  Zap, Key, Clock, Shield, Award, ShieldCheck, ArrowRight,
  CheckCircle, ArrowLeft, Activity
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ModelPerformanceDashboardProps {
  onBack?: () => void;
}

export default function ModelPerformanceDashboard({ onBack }: ModelPerformanceDashboardProps) {
  const [activeTab, setActiveTab] = useState<'lstm' | 'encryption' | 'comparison'>('lstm');

  // LSTM Performance data
  const lstmMetrics = [
    { name: 'Accuracy', value: 92.15, color: '#2EC27E' },
    { name: 'Precision', value: 89.32, color: '#1A5FB4' },
    { name: 'Recall', value: 91.08, color: '#9333EA' },
    { name: 'F1-Score', value: 90.19, color: '#F59E0B' },
  ];

  // Encryption time breakdown
  const encryptionTimeData = [
    { name: 'AES-256-GCM', value: 85, color: '#1A5FB4' },
    { name: 'RSA-2048', value: 15, color: '#9333EA' },
  ];

  // Comparison data
  const comparisonData = [
    { method: 'RSA Only', speed: 10, security: 90 },
    { method: 'AES Only', speed: 100, security: 70 },
    { method: 'Hybrid (Ours)', speed: 100, security: 98 },
  ];

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
            Model Performance & Research Analytics
          </h1>

          {/* TABS */}
          <div className="flex items-center gap-6 border-b">
            <button
              onClick={() => setActiveTab('lstm')}
              className={`pb-3 px-2 font-semibold transition-colors relative ${
                activeTab === 'lstm' ? 'text-[#1A5FB4]' : 'text-[#717182] hover:text-[#1E1E1E]'
              }`}
            >
              LSTM Model
              {activeTab === 'lstm' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5FB4]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('encryption')}
              className={`pb-3 px-2 font-semibold transition-colors relative ${
                activeTab === 'encryption' ? 'text-[#1A5FB4]' : 'text-[#717182] hover:text-[#1E1E1E]'
              }`}
            >
              Hybrid Encryption
              {activeTab === 'encryption' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5FB4]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`pb-3 px-2 font-semibold transition-colors relative ${
                activeTab === 'comparison' ? 'text-[#1A5FB4]' : 'text-[#717182] hover:text-[#1E1E1E]'
              }`}
            >
              Performance Comparison
              {activeTab === 'comparison' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5FB4]" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="px-8 py-6 space-y-6">
        {/* TAB 1: LSTM MODEL */}
        {activeTab === 'lstm' && (
          <>
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-8 h-8 text-[#2EC27E]" />
                  <h3 className="text-sm font-semibold text-[#717182]">Accuracy</h3>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-2">92.15%</p>
                <div className="w-full h-2 bg-[#E9EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2EC27E] rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <Crosshair className="w-8 h-8 text-[#1A5FB4]" />
                  <h3 className="text-sm font-semibold text-[#717182]">Precision</h3>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-2">89.32%</p>
                <div className="w-full h-2 bg-[#E9EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1A5FB4] rounded-full" style={{ width: '89%' }} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <Search className="w-8 h-8 text-[#9333EA]" />
                  <h3 className="text-sm font-semibold text-[#717182]">Recall</h3>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-2">91.08%</p>
                <div className="w-full h-2 bg-[#E9EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#9333EA] rounded-full" style={{ width: '91%' }} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-8 h-8 text-[#F59E0B]" />
                  <h3 className="text-sm font-semibold text-[#717182]">F1-Score</h3>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-2">90.19%</p>
                <div className="w-full h-2 bg-[#E9EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-[#2EC27E]" />
                      <p className="text-sm text-[#717182]">Loss</p>
                    </div>
                    <p className="text-2xl font-bold text-[#1E1E1E]">0.1521</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#717182] mb-2">Training Time</p>
                    <p className="text-2xl font-bold text-[#1E1E1E]">15.3s</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#717182] mb-2">Inference Time</p>
                    <p className="text-2xl font-bold text-[#1E1E1E]">1.2ms</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#717182] mb-2">Training Samples</p>
                    <p className="text-lg font-bold text-[#1E1E1E]">500</p>
                    <p className="text-xs text-[#717182]">350 normal, 150 anomaly</p>
                  </div>
                </div>
              </div>

              {/* Training Configuration */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Training Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Optimizer:</span>
                    <span className="font-semibold">Adam (lr: 0.001)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Loss Function:</span>
                    <span className="font-semibold">Binary Crossentropy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Epochs:</span>
                    <span className="font-semibold">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Batch Size:</span>
                    <span className="font-semibold">32</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Validation Split:</span>
                    <span className="font-semibold">20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Architecture Diagram */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-6">Model Architecture</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-md p-4 bg-[#1A5FB4]/5 border-2 border-[#1A5FB4] rounded-lg">
                  <p className="font-bold text-[#1E1E1E]">Input Layer</p>
                  <p className="text-sm text-[#717182]">10 timesteps, 6 features</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#717182] rotate-90" />
                
                <div className="w-full max-w-md p-4 bg-[#2EC27E]/5 border-2 border-[#2EC27E] rounded-lg">
                  <p className="font-bold text-[#1E1E1E]">LSTM Layer 1: 64 units</p>
                  <p className="text-sm text-[#717182]">tanh activation, return_sequences</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#717182] rotate-90" />
                
                <div className="w-full max-w-md p-4 bg-[#E5A50A]/5 border-2 border-[#E5A50A] rounded-lg">
                  <p className="font-bold text-[#1E1E1E]">Dropout: 20%</p>
                  <p className="text-sm text-[#717182]">Regularization</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#717182] rotate-90" />
                
                <div className="w-full max-w-md p-4 bg-[#9333EA]/5 border-2 border-[#9333EA] rounded-lg">
                  <p className="font-bold text-[#1E1E1E]">LSTM Layer 2: 32 units</p>
                  <p className="text-sm text-[#717182]">tanh activation</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#717182] rotate-90" />
                
                <div className="w-full max-w-md p-4 bg-[#E5A50A]/5 border-2 border-[#E5A50A] rounded-lg">
                  <p className="font-bold text-[#1E1E1E]">Dropout: 20%</p>
                  <p className="text-sm text-[#717182]">Regularization</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#717182] rotate-90" />
                
                <div className="w-full max-w-md p-4 bg-[#F59E0B]/5 border-2 border-[#F59E0B] rounded-lg">
                  <p className="font-bold text-[#1E1E1E]">Dense Layer: 16 units</p>
                  <p className="text-sm text-[#717182]">ReLU activation</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#717182] rotate-90" />
                
                <div className="w-full max-w-md p-4 bg-[#C01C28]/5 border-2 border-[#C01C28] rounded-lg">
                  <p className="font-bold text-[#1E1E1E]">Output Layer: 1 unit</p>
                  <p className="text-sm text-[#717182]">Sigmoid → Anomaly Probability</p>
                </div>
              </div>
            </div>

            {/* Performance Bar Chart */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Performance Metrics Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={lstmMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9EBEF" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {lstmMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* TAB 2: HYBRID ENCRYPTION */}
        {activeTab === 'encryption' && (
          <>
            {/* Encryption Speed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-8 h-8 text-[#1A5FB4]" />
                  <h3 className="text-sm font-semibold text-[#717182]">AES-256-GCM Time</h3>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">0.85 ms</p>
                <p className="text-sm text-[#717182] mb-2">85% of total time</p>
                <div className="w-full h-2 bg-[#E9EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1A5FB4] rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <Key className="w-8 h-8 text-[#9333EA]" />
                  <h3 className="text-sm font-semibold text-[#717182]">RSA-OAEP-2048 Time</h3>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">0.15 ms</p>
                <p className="text-sm text-[#717182] mb-2">15% of total time</p>
                <div className="w-full h-2 bg-[#E9EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#9333EA] rounded-full" style={{ width: '15%' }} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-8 h-8 text-[#2EC27E]" />
                  <h3 className="text-sm font-semibold text-[#717182]">Total Encryption Time</h3>
                </div>
                <p className="text-3xl font-bold text-[#1E1E1E] mb-1">1.0 ms</p>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-[#2EC27E]" />
                  <p className="text-sm text-[#2EC27E] font-semibold">Very Fast ⚡</p>
                </div>
              </div>
            </div>

            {/* Algorithm Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#1A5FB4]">
                <h3 className="text-lg font-bold text-[#1A5FB4] mb-4">AES-256-GCM</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Algorithm:</span>
                    <span className="font-semibold">Advanced Encryption Standard</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Mode:</span>
                    <span className="font-semibold">Galois/Counter Mode</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Key Size:</span>
                    <span className="font-semibold">256 bits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">IV Size:</span>
                    <span className="font-semibold">96 bits (12 bytes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Authentication Tag:</span>
                    <span className="font-semibold">128 bits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Purpose:</span>
                    <span className="font-semibold">Fast data encryption</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E9EBEF]">
                    <span className="text-[#717182]">Speed:</span>
                    <span className="font-semibold text-[#2EC27E]">⚡ Very Fast</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#9333EA]">
                <h3 className="text-lg font-bold text-[#9333EA] mb-4">RSA-OAEP-2048</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Algorithm:</span>
                    <span className="font-semibold">Rivest-Shamir-Adleman</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Padding:</span>
                    <span className="font-semibold">OAEP (Optimal Asymmetric)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Key Size:</span>
                    <span className="font-semibold">2048 bits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Hash Function:</span>
                    <span className="font-semibold">SHA-256</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Public Exponent:</span>
                    <span className="font-semibold">65537</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717182]">Purpose:</span>
                    <span className="font-semibold">Secure key exchange</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E9EBEF]">
                    <span className="text-[#717182]">Security:</span>
                    <span className="font-semibold text-[#2EC27E]">🛡 Very High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hybrid Encryption Process */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-6">Hybrid Encryption Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#2EC27E]/5 border-2 border-[#2EC27E] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#2EC27E]/20 flex items-center justify-center">
                      <span className="font-bold text-[#2EC27E]">1</span>
                    </div>
                    <Key className="w-6 h-6 text-[#2EC27E]" />
                  </div>
                  <p className="font-bold text-[#1E1E1E] mb-1">Generate AES-256 Key</p>
                  <p className="text-sm text-[#717182]">Random 256-bit symmetric key</p>
                </div>

                <div className="p-4 bg-[#1A5FB4]/5 border-2 border-[#1A5FB4] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#1A5FB4]/20 flex items-center justify-center">
                      <span className="font-bold text-[#1A5FB4]">2</span>
                    </div>
                    <Zap className="w-6 h-6 text-[#1A5FB4]" />
                  </div>
                  <p className="font-bold text-[#1E1E1E] mb-1">Encrypt Data with AES</p>
                  <p className="text-sm text-[#717182]">Fast symmetric encryption (0.85ms)</p>
                  <p className="text-xs text-[#717182] mt-1">IV: 12 bytes, Auth Tag: 16 bytes</p>
                </div>

                <div className="p-4 bg-[#9333EA]/5 border-2 border-[#9333EA] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#9333EA]/20 flex items-center justify-center">
                      <span className="font-bold text-[#9333EA]">3</span>
                    </div>
                    <Shield className="w-6 h-6 text-[#9333EA]" />
                  </div>
                  <p className="font-bold text-[#1E1E1E] mb-1">Encrypt AES Key with RSA</p>
                  <p className="text-sm text-[#717182]">Secure key exchange (0.15ms)</p>
                  <p className="text-xs text-[#717182] mt-1">Using recipient's RSA-2048 public key</p>
                </div>

                <div className="p-4 bg-[#F59E0B]/5 border-2 border-[#F59E0B] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                      <span className="font-bold text-[#F59E0B]">4</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <p className="font-bold text-[#1E1E1E] mb-1">Transmit Package</p>
                  <p className="text-sm text-[#717182]">Encrypted Data + Encrypted Key + IV</p>
                </div>
              </div>
            </div>

            {/* Time Breakdown Pie Chart */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Encryption Time Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={encryptionTimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {encryptionTimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-[#717182] mt-2">Total: 1.0ms</p>
            </div>
          </>
        )}

        {/* TAB 3: PERFORMANCE COMPARISON */}
        {activeTab === 'comparison' && (
          <>
            {/* Comparison Chart */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-6">Encryption Method Comparison</h3>
              
              <div className="space-y-6">
                {/* RSA Only */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#1E1E1E]">Standard RSA Only</h4>
                    <span className="text-sm text-[#717182]">Slow but secure</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#717182]">Speed</span>
                        <span className="font-semibold text-[#C01C28]">10% (100ms)</span>
                      </div>
                      <div className="w-full h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
                        <div className="h-full bg-[#C01C28] rounded-full" style={{ width: '10%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#717182]">Security</span>
                        <span className="font-semibold text-[#2EC27E]">90%</span>
                      </div>
                      <div className="w-full h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2EC27E] rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* AES Only */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#1E1E1E]">Standard AES Only</h4>
                    <span className="text-sm text-[#717182]">Fast but key exchange risk</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#717182]">Speed</span>
                        <span className="font-semibold text-[#2EC27E]">100% (1ms)</span>
                      </div>
                      <div className="w-full h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2EC27E] rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#717182]">Security</span>
                        <span className="font-semibold text-[#E5A50A]">70%</span>
                      </div>
                      <div className="w-full h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
                        <div className="h-full bg-[#E5A50A] rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hybrid (Ours) */}
                <div className="border-2 border-[#1A5FB4] rounded-lg p-4 bg-[#1A5FB4]/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-[#1E1E1E]">Hybrid (AES+RSA)</h4>
                      <span className="px-2 py-1 bg-[#F59E0B] text-white text-xs font-bold rounded">⭐ YOUR MODEL</span>
                    </div>
                    <span className="text-sm text-[#1A5FB4] font-semibold">Best of both worlds</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#717182]">Speed</span>
                        <span className="font-semibold text-[#2EC27E]">100% (1ms)</span>
                      </div>
                      <div className="w-full h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2EC27E] rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#717182]">Security</span>
                        <span className="font-semibold text-[#16A34A]">98%</span>
                      </div>
                      <div className="w-full h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
                        <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '98%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Efficiency Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#2EC27E] to-[#16A34A] rounded-xl p-6 shadow-lg text-white">
                <TrendingUp className="w-10 h-10 mb-3" />
                <p className="text-3xl font-bold mb-1">18%</p>
                <p className="text-sm opacity-90">Speed Improvement</p>
                <p className="text-xs opacity-75 mt-2">Faster than RSA-only encryption</p>
              </div>

              <div className="bg-gradient-to-br from-[#1A5FB4] to-[#1e40af] rounded-xl p-6 shadow-lg text-white">
                <ShieldCheck className="w-10 h-10 mb-3" />
                <p className="text-3xl font-bold mb-1">40%</p>
                <p className="text-sm opacity-90">Security Enhancement</p>
                <p className="text-xs opacity-75 mt-2">More secure than AES-only encryption</p>
              </div>

              <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl p-6 shadow-lg text-white">
                <Award className="w-10 h-10 mb-3" />
                <p className="text-3xl font-bold mb-1">95%</p>
                <p className="text-sm opacity-90">Overall Efficiency</p>
                <p className="text-xs opacity-75 mt-2">Optimal speed + security balance</p>
              </div>
            </div>

            {/* Technical Advantages */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Technical Advantages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2EC27E] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">AES-256 for fast encryption</p>
                    <p className="text-sm text-[#717182]">Handles large datasets efficiently</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2EC27E] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">RSA-2048 for secure key exchange</p>
                    <p className="text-sm text-[#717182]">No pre-shared secrets needed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2EC27E] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">GCM mode authenticated encryption</p>
                    <p className="text-sm text-[#717182]">Built-in integrity verification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2EC27E] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">Optimal speed + security</p>
                    <p className="text-sm text-[#717182]">Best of both cryptographic worlds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Healthcare Use Cases */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Healthcare Use Cases</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#F6F5F4] rounded-lg">
                  <Shield className="w-5 h-5 text-[#1A5FB4] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">IoT Device Transmission Protection</p>
                    <p className="text-sm text-[#717182]">Secures vital signs data from medical sensors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#F6F5F4] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#2EC27E] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">HIPAA-Compliant Encryption</p>
                    <p className="text-sm text-[#717182]">Meets healthcare data protection standards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#F6F5F4] rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-[#1A5FB4] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">Prevents Man-in-the-Middle Attacks</p>
                    <p className="text-sm text-[#717182]">RSA key exchange prevents interception</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#F6F5F4] rounded-lg">
                  <Zap className="w-5 h-5 text-[#F59E0B] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">Real-Time Encryption Capability</p>
                    <p className="text-sm text-[#717182]">Sub-millisecond encryption for continuous monitoring</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#F6F5F4] rounded-lg">
                  <Activity className="w-5 h-5 text-[#2EC27E] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">Scalable to 50-100 Concurrent Patients</p>
                    <p className="text-sm text-[#717182]">Efficient enough for hospital-wide deployment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Findings Summary Table */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-4">Research Findings Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#E9EBEF]">
                      <th className="text-left py-3 px-4 text-[#717182] font-semibold">Metric</th>
                      <th className="text-left py-3 px-4 text-[#717182] font-semibold">Value</th>
                      <th className="text-left py-3 px-4 text-[#717182] font-semibold">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E9EBEF] hover:bg-[#F6F5F4]">
                      <td className="py-3 px-4 font-medium">LSTM Accuracy</td>
                      <td className="py-3 px-4 font-bold text-[#2EC27E]">92.15%</td>
                      <td className="py-3 px-4 text-[#717182]">High reliability for anomaly detection</td>
                    </tr>
                    <tr className="border-b border-[#E9EBEF] hover:bg-[#F6F5F4] bg-[#FAFAFA]">
                      <td className="py-3 px-4 font-medium">Encryption Speed</td>
                      <td className="py-3 px-4 font-bold text-[#1A5FB4]">1.0ms</td>
                      <td className="py-3 px-4 text-[#717182]">Real-time capable for IoT devices</td>
                    </tr>
                    <tr className="border-b border-[#E9EBEF] hover:bg-[#F6F5F4]">
                      <td className="py-3 px-4 font-medium">Speed vs RSA</td>
                      <td className="py-3 px-4 font-bold text-[#2EC27E]">18% faster</td>
                      <td className="py-3 px-4 text-[#717182]">Significant efficiency gain</td>
                    </tr>
                    <tr className="border-b border-[#E9EBEF] hover:bg-[#F6F5F4] bg-[#FAFAFA]">
                      <td className="py-3 px-4 font-medium">Security vs AES</td>
                      <td className="py-3 px-4 font-bold text-[#1A5FB4]">40% better</td>
                      <td className="py-3 px-4 text-[#717182]">Major vulnerability reduction</td>
                    </tr>
                    <tr className="border-b border-[#E9EBEF] hover:bg-[#F6F5F4]">
                      <td className="py-3 px-4 font-medium">False Positive Rate</td>
                      <td className="py-3 px-4 font-bold text-[#E5A50A]">7.8%</td>
                      <td className="py-3 px-4 text-[#717182]">Acceptable for healthcare context</td>
                    </tr>
                    <tr className="border-b border-[#E9EBEF] hover:bg-[#F6F5F4] bg-[#FAFAFA]">
                      <td className="py-3 px-4 font-medium">Inference Time</td>
                      <td className="py-3 px-4 font-bold text-[#2EC27E]">1.2ms</td>
                      <td className="py-3 px-4 text-[#717182]">Sub-millisecond anomaly detection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}