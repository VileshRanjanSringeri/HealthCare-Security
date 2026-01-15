import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import EnhancedDashboard from './components/EnhancedDashboard';
import PatientDetailView from './components/PatientDetailView';
import AlertDetectionScreen from './components/AlertDetectionScreen';
import SecurityAnalyticsDashboard from './components/SecurityAnalyticsDashboard';
import ModelPerformanceDashboard from './components/ModelPerformanceDashboard';
import AttackDemonstrationDashboard from './components/AttackDemonstrationDashboard';
import { CSVUpload } from './components/CSVUpload';
import { mockPatients, mockAlerts, securityMetrics as mockSecurityMetrics, attackTypeDistribution } from './data/mockData';
import { isAuthenticated, logout as authLogout } from './utils/auth';

export type Screen = 'login' | 'dashboard' | 'patient-detail' | 'alert' | 'security' | 'model-performance' | 'attack-demo' | 'csv-upload';

export interface Patient {
  id: string;
  name: string;
  room: string;
  status: 'normal' | 'warning' | 'critical';
  age: number;
  weight: string;
  conditions: string[];
  medications: string[];
  doctor: string;
  vitalSigns: {
    heartRate: number;
    bloodPressure: string;
    oxygen: number;
    glucose: number;
    temperature: number;
  };
  aiAnalysis: {
    status: 'normal' | 'anomaly';
    confidence: number;
    pattern?: string;
  };
  cryptoStatus: {
    verified: boolean;
    lastVerified: string;
    sensorId: string;
    signatureValid: boolean;
  };
  networkFlows?: any[]; // Optional: Store real network flow data
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  room: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  vitalSign: string;
  value: string;
  normalRange: string;
  timeDetected: string;
  aiScore: number;
  cryptoVerified: boolean;
  acknowledged: boolean;
  attackType?: string;
  attackSource?: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  
  // State for loaded dataset
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [securityMetrics, setSecurityMetrics] = useState<any>(mockSecurityMetrics);
  const [attackDistribution, setAttackDistribution] = useState<any[]>(attackTypeDistribution);
  const [usingRealData, setUsingRealData] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const authenticated = isAuthenticated();
    setIsAuthenticatedState(authenticated);
    if (authenticated) {
      setCurrentScreen('dashboard');
    } else {
      setCurrentScreen('login');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticatedState(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    authLogout();
    setIsAuthenticatedState(false);
    setCurrentScreen('login');
  };

  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentScreen('patient-detail');
  };

  const handleShowAlert = (alert: Alert) => {
    setCurrentAlert(alert);
    setCurrentScreen('alert');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedPatientId(null);
    setCurrentAlert(null);
  };

  const handleViewSecurity = () => {
    setCurrentScreen('security');
  };

  const handleViewModelPerformance = () => {
    setCurrentScreen('model-performance');
  };

  const handleViewAttackDemo = () => {
    setCurrentScreen('attack-demo');
  };

  const handleCSVUpload = () => {
    setCurrentScreen('csv-upload');
  };
  
  const handleDataLoaded = (data: {
    patients: Patient[];
    alerts: Alert[];
    securityMetrics: any;
    attackDistribution: any[];
  }) => {
    setPatients(data.patients);
    setAlerts(data.alerts);
    setSecurityMetrics(data.securityMetrics);
    setAttackDistribution(data.attackDistribution);
    setUsingRealData(true);
    setCurrentScreen('dashboard');
  };
  
  const handleResetToMockData = () => {
    setPatients(mockPatients);
    setAlerts(mockAlerts);
    setSecurityMetrics(mockSecurityMetrics);
    setAttackDistribution(attackTypeDistribution);
    setUsingRealData(false);
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}
      
      {currentScreen === 'dashboard' && (
        <EnhancedDashboard
          patients={patients}
          alerts={alerts}
          securityMetrics={securityMetrics}
          attackDistribution={attackDistribution}
          usingRealData={usingRealData}
          onViewPatient={handleViewPatient}
          onShowAlert={handleShowAlert}
          onViewSecurity={handleViewSecurity}
          onViewModelPerformance={handleViewModelPerformance}
          onViewAttackDemo={handleViewAttackDemo}
          onLogout={handleLogout}
          onCSVUpload={handleCSVUpload}
          onResetData={handleResetToMockData}
        />
      )}
      
      {currentScreen === 'patient-detail' && selectedPatientId && (
        <PatientDetailView
          patient={patients.find(p => p.id === selectedPatientId)!}
          patientId={selectedPatientId}
          onBack={handleBackToDashboard}
          onShowAlert={handleShowAlert}
        />
      )}
      
      {currentScreen === 'alert' && currentAlert && (
        <AlertDetectionScreen
          alert={currentAlert}
          alerts={alerts}
          onBack={handleBackToDashboard}
        />
      )}
      
      {currentScreen === 'security' && (
        <SecurityAnalyticsDashboard
          securityMetrics={securityMetrics}
          attackDistribution={attackDistribution}
          alerts={alerts}
          onBack={handleBackToDashboard}
        />
      )}
      
      {currentScreen === 'model-performance' && (
        <ModelPerformanceDashboard
          onBack={handleBackToDashboard}
        />
      )}
      
      {currentScreen === 'attack-demo' && (
        <AttackDemonstrationDashboard
          onBack={handleBackToDashboard}
        />
      )}
      
      {currentScreen === 'csv-upload' && (
        <CSVUpload
          onDataLoaded={handleDataLoaded}
          onClose={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;