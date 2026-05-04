/**
 * Emergency Alert Center
 * Real-time critical patient notifications dashboard
 */

import { useState, useEffect } from 'react';
import { AlertTriangle, Activity, Heart, ArrowLeft, CheckCircle, Clock, Shield, MapPin, User, Siren, RefreshCw } from 'lucide-react';
import { Alert } from '../App';
import { formatTime12Hour, formatDateShort } from '../utils/timeFormat';

interface EmergencyAlertsCenterProps {
  alerts: Alert[];
  onAcknowledge?: (alertId: string) => void;
  onBack?: () => void;
}

export default function EmergencyAlertsCenter({ 
  alerts,
  onAcknowledge,
  onBack
}: EmergencyAlertsCenterProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh every 3 seconds
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      setLastUpdated(new Date());
    }, 3000);
    return () => clearInterval(refreshTimer);
  }, []);

  // Calculate statistics
  const activeAlerts = alerts.filter(a => !a.acknowledged);
  const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical');
  const warningAlerts = activeAlerts.filter(a => a.severity === 'warning');
  const acknowledgedAlerts = alerts.filter(a => a.acknowledged);

  // Get time ago
  const getTimeAgo = (timeStr: string) => {
    // Simple mock - in real app, parse the time string
    const parts = timeStr.split(' ');
    return timeStr;
  };

  // Handle acknowledge
  const handleAcknowledge = (alertId: string) => {
    if (onAcknowledge) {
      onAcknowledge(alertId);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#C01C28]/10 flex items-center justify-center animate-pulse">
                <Siren className="w-6 h-6 text-[#C01C28]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1E1E1E]">Emergency Alert Center</h1>
                <p className="text-sm text-[#717182]">Real-time Patient Monitoring</p>
              </div>
            </div>

            {/* Real-time Timestamp */}
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <Clock className="w-4 h-4 text-[#717182]" />
                <p className="text-xs text-[#717182]">Real-time Updates</p>
              </div>
              <p className="text-lg font-mono font-semibold text-[#1E1E1E]">
                {formatTime12Hour(currentTime)}
              </p>
              <p className="text-xs text-[#717182]">
                {formatDateShort(currentTime)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-6 space-y-6">
        {/* STATISTICS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Active Alerts */}
          <div className="bg-gradient-to-br from-[#C01C28] to-[#C01C28]/80 rounded-xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-1">Total Active Alerts</p>
            <p className="text-4xl font-bold">{activeAlerts.length}</p>
            <p className="text-xs opacity-75 mt-1">Requires immediate attention</p>
          </div>

          {/* Critical */}
          <div className="bg-gradient-to-br from-[#991B1B] to-[#7F1D1D] rounded-xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-1">Critical</p>
            <p className="text-4xl font-bold">{criticalAlerts.length}</p>
            <p className="text-xs opacity-75 mt-1">Life-threatening conditions</p>
          </div>

          {/* Warnings */}
          <div className="bg-gradient-to-br from-[#E5A50A] to-[#D97706] rounded-xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-1">Warnings</p>
            <p className="text-4xl font-bold">{warningAlerts.length}</p>
            <p className="text-xs opacity-75 mt-1">Monitoring required</p>
          </div>

          {/* Acknowledged */}
          <div className="bg-gradient-to-br from-[#2EC27E] to-[#16A34A] rounded-xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-1">Acknowledged</p>
            <p className="text-4xl font-bold">{acknowledgedAlerts.length}</p>
            <p className="text-xs opacity-75 mt-1">Handled alerts (24h)</p>
          </div>
        </div>

        {/* ALERT FEED */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1E1E1E]">Active Alerts</h2>
            <div className="flex items-center gap-2 text-sm text-[#717182]">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Auto-refreshing... Updated {Math.floor((Date.now() - lastUpdated.getTime()) / 1000)}s ago</span>
            </div>
          </div>

          {/* Alert Cards */}
          <div className="space-y-4">
            {activeAlerts.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <CheckCircle className="w-16 h-16 text-[#2EC27E] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">No Active Alerts</h3>
                <p className="text-[#717182]">All patients are stable. System is monitoring continuously.</p>
              </div>
            )}

            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                  alert.severity === 'critical' 
                    ? 'border-[#C01C28]' 
                    : 'border-[#E5A50A]'
                }`}
              >
                {/* Top Bar */}
                <div className={`px-6 py-3 ${
                  alert.severity === 'critical'
                    ? 'bg-[#C01C28]'
                    : 'bg-[#E5A50A]'
                } text-white flex items-center gap-2`}>
                  <span className="text-lg">
                    {alert.severity === 'critical' ? '🚨' : '⚠️'}
                  </span>
                  <span className="font-bold text-lg">
                    {alert.severity === 'critical' ? 'CRITICAL ALERT' : 'WARNING'}
                  </span>
                  <span className="ml-auto text-sm opacity-90">
                    {getTimeAgo(alert.timeDetected)}
                  </span>
                </div>

                {/* Alert Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Patient Info */}
                      <div>
                        <p className="text-sm text-[#717182] mb-1">Patient</p>
                        <p className="text-xl font-bold text-[#1E1E1E]">
                          {alert.patientName} <span className="text-sm text-[#717182] font-normal">| Room {alert.room}</span>
                        </p>
                      </div>

                      {/* Alert Type */}
                      <div>
                        <p className="text-sm text-[#717182] mb-1">Alert Type</p>
                        <p className="text-lg font-semibold text-[#1E1E1E]">{alert.type}</p>
                      </div>

                      {/* Vital Sign */}
                      <div>
                        <p className="text-sm text-[#717182] mb-1">Affected Vital Sign</p>
                        <p className="text-lg font-semibold text-[#1E1E1E]">{alert.vitalSign}</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Value */}
                      <div className={`p-4 rounded-lg ${
                        alert.severity === 'critical'
                          ? 'bg-[#C01C28]/10 border border-[#C01C28]/20'
                          : 'bg-[#E5A50A]/10 border border-[#E5A50A]/20'
                      }`}>
                        <p className="text-sm text-[#717182] mb-1">Current Value</p>
                        <p className={`text-3xl font-bold ${
                          alert.severity === 'critical' ? 'text-[#C01C28]' : 'text-[#E5A50A]'
                        }`}>
                          {alert.value}
                        </p>
                        <p className="text-xs text-[#717182] mt-1">
                          Normal: {alert.normalRange}
                        </p>
                      </div>

                      {/* AI Score */}
                      <div>
                        <p className="text-sm text-[#717182] mb-2">AI Anomaly Score</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                alert.severity === 'critical' ? 'bg-[#C01C28]' : 'bg-[#E5A50A]'
                              }`}
                              style={{ width: `${alert.aiScore * 100}%` }}
                            />
                          </div>
                          <span className="text-lg font-bold text-[#1E1E1E]">
                            {alert.aiScore.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-[#717182] mt-1">
                          {alert.aiScore > 0.8 ? 'High confidence detection' : 'Moderate confidence'}
                        </p>
                      </div>

                      {/* Crypto Verified */}
                      <div className="flex items-center gap-2">
                        {alert.cryptoVerified ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-[#2EC27E]" />
                            <span className="text-sm font-semibold text-[#2EC27E]">
                              Cryptographically Verified
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-[#717182]">Verification pending</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-6 border-t border-[#E9EBEF]">
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="w-full md:w-auto px-8 py-3 bg-[#1A5FB4] hover:bg-[#155A9F] text-white font-semibold rounded-lg transition-colors shadow-lg"
                    >
                      Acknowledge Alert
                    </button>
                    <p className="text-xs text-[#717182] mt-2">
                      Acknowledging will mark this alert as handled and notify the medical team
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AUTO-REFRESH INDICATOR (Fixed Bottom Right) */}
        <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow-xl border border-[#E9EBEF] px-4 py-3">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-[#1A5FB4] animate-spin" />
            <div>
              <p className="text-sm font-semibold text-[#1E1E1E]">Auto-refreshing...</p>
              <p className="text-xs text-[#717182]">
                Updated {Math.floor((Date.now() - lastUpdated.getTime()) / 1000)}s ago
              </p>
            </div>
          </div>
        </div>

        {/* Recently Acknowledged Alerts */}
        {acknowledgedAlerts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">Recently Acknowledged</h2>
            <div className="space-y-3">
              {acknowledgedAlerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-[#E9EBEF] opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-5 h-5 text-[#2EC27E]" />
                      <div>
                        <p className="font-semibold text-[#1E1E1E]">
                          {alert.patientName} - {alert.type}
                        </p>
                        <p className="text-sm text-[#717182]">
                          {alert.vitalSign}: {alert.value}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-[#717182]">{alert.timeDetected}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}