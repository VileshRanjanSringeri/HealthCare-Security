import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Shield, Activity, Phone, X, User } from 'lucide-react';
import { Alert } from '../App';

interface AlertDetectionScreenProps {
  alert: Alert;
  alerts: Alert[];
  onBack: () => void;
}

export default function AlertDetectionScreen({ alert, alerts, onBack }: AlertDetectionScreenProps) {
  const [acknowledged, setAcknowledged] = useState(alert.acknowledged);
  const [markedFalsePositive, setMarkedFalsePositive] = useState(false);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const handleFalsePositive = () => {
    setMarkedFalsePositive(true);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background/95 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Emergency Alert Modal */}
        <div className="bg-card rounded-xl shadow-2xl overflow-hidden border-2 border-[#C01C28]">
          {/* Alert Header */}
          <div className="bg-[#C01C28] text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">CRITICAL ALERT</h2>
                  <p className="text-white/90">Patient {alert.patientId.toUpperCase()}</p>
                </div>
              </div>
              <button 
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-white/70 text-sm mb-1">Patient</p>
                <p className="font-semibold">{alert.patientName}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Location</p>
                <p className="font-semibold">Room {alert.room}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Time Detected</p>
                <p className="font-semibold">{alert.timeDetected}</p>
              </div>
            </div>
          </div>

          {/* Alert Details */}
          <div className="p-6 space-y-6">
            {/* Alert Type and Values */}
            <div className="bg-[#C01C28]/10 border-2 border-[#C01C28] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#C01C28] mb-4">{alert.type}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-[#717182] mb-2">Current {alert.vitalSign}</p>
                  <p className="text-3xl font-semibold text-[#C01C28]">{alert.value}</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-[#717182] mb-2">Normal Range</p>
                  <p className="text-3xl font-semibold text-[#2EC27E]">{alert.normalRange}</p>
                </div>
              </div>
            </div>

            {/* Verification Steps */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-[#1E1E1E] mb-4">Verification Steps</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#2EC27E]/10">
                  <CheckCircle className="w-5 h-5 text-[#2EC27E] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">AI Detection</p>
                    <p className="text-sm text-[#717182]">Anomaly score: {(alert.aiScore * 100).toFixed(1)}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#2EC27E]/10">
                  <CheckCircle className="w-5 h-5 text-[#2EC27E] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Cryptographic Verification</p>
                    <p className="text-sm text-[#717182]">Data untampered - HMAC verified</p>
                  </div>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg ${
                  acknowledged ? 'bg-[#2EC27E]/10' : 'bg-[#E5A50A]/10'
                }`}>
                  {acknowledged ? (
                    <CheckCircle className="w-5 h-5 text-[#2EC27E] flex-shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-[#E5A50A] flex-shrink-0 animate-pulse" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">Manual Verification</p>
                    <p className="text-sm text-[#717182]">
                      {acknowledged ? 'Alert acknowledged by medical staff' : 'Pending medical staff review'}
                    </p>
                  </div>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg ${
                  acknowledged ? 'bg-[#2EC27E]/10' : 'bg-accent'
                }`}>
                  {acknowledged ? (
                    <CheckCircle className="w-5 h-5 text-[#2EC27E] flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-border rounded flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">Alert Acknowledged</p>
                    <p className="text-sm text-[#717182]">
                      {acknowledged ? 'Response protocol initiated' : 'Awaiting acknowledgment'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Analysis */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-[#1E1E1E] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#2EC27E]" />
                Security Analysis
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#2EC27E]/10">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#2EC27E]" />
                    <span className="text-sm font-medium">Data Integrity</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2EC27E]">Verified ✓</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#2EC27E]/10">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#2EC27E]" />
                    <span className="text-sm font-medium">Sensor Status</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2EC27E]">Active ✓</span>
                </div>

                {alert.attackType && (
                  <div className="p-4 rounded-lg bg-[#C01C28]/10 border border-[#C01C28]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-[#C01C28]">Security Event Detected</p>
                      <span className="px-2 py-1 rounded bg-[#C01C28] text-white text-xs font-medium">
                        BLOCKED
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#717182]">Type:</span>
                        <span className="font-medium">{alert.attackType}</span>
                      </div>
                      {alert.attackSource && (
                        <div className="flex justify-between">
                          <span className="text-[#717182]">Source:</span>
                          <span className="font-mono text-xs">{alert.attackSource}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-[#717182]">Action Taken:</span>
                        <span className="font-medium text-[#2EC27E]">Blocked & Logged</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {!acknowledged && !markedFalsePositive && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAcknowledge}
                  className="py-4 rounded-lg bg-[#1A5FB4] text-white font-semibold hover:bg-[#164c91] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Acknowledge Alert
                </button>
                
                <button
                  onClick={handleFalsePositive}
                  className="py-4 rounded-lg border-2 border-border text-[#717182] font-semibold hover:bg-accent transition-colors"
                >
                  Mark as False Positive
                </button>
              </div>
            )}

            {!acknowledged && !markedFalsePositive && (
              <div className="grid grid-cols-2 gap-4">
                <button className="py-4 rounded-lg bg-[#C01C28] text-white font-semibold hover:bg-[#9a1620] transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Medical Team
                </button>
                
                <button className="py-4 rounded-lg border-2 border-border text-[#1E1E1E] font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2">
                  <User className="w-5 h-5" />
                  View Patient History
                </button>
              </div>
            )}

            {acknowledged && (
              <div className="p-6 rounded-lg bg-[#2EC27E]/10 border-2 border-[#2EC27E] text-center">
                <CheckCircle className="w-12 h-12 text-[#2EC27E] mx-auto mb-2" />
                <p className="text-lg font-semibold text-[#2EC27E]">Alert Acknowledged</p>
                <p className="text-sm text-[#717182] mt-1">Medical team has been notified</p>
              </div>
            )}

            {markedFalsePositive && (
              <div className="p-6 rounded-lg bg-[#E5A50A]/10 border-2 border-[#E5A50A] text-center">
                <Activity className="w-12 h-12 text-[#E5A50A] mx-auto mb-2" />
                <p className="text-lg font-semibold text-[#E5A50A]">Marked as False Positive</p>
                <p className="text-sm text-[#717182] mt-1">AI model will be updated to improve accuracy</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}