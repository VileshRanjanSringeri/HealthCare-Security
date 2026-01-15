/**
 * Attack Demonstration Dashboard
 * Visual demonstration of attacks and how the system blocks them
 */

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Shield, AlertTriangle, Lock, Unlock, CheckCircle, 
  XCircle, Activity, Zap, Eye, Play, RotateCcw, ChevronRight,
  AlertCircle, Database, Server, Wifi
} from 'lucide-react';

interface AttackDemonstrationDashboardProps {
  onBack: () => void;
}

type AttackPhase = 'initial' | 'attempt' | 'detection' | 'blocking' | 'prevented';

interface AttackScenario {
  id: string;
  name: string;
  type: string;
  severity: 'high' | 'critical';
  description: string;
  targetPatient: string;
  targetDevice: string;
  attackerIP: string;
  steps: {
    phase: AttackPhase;
    title: string;
    description: string;
    icon: any;
    color: string;
    status: 'success' | 'danger' | 'warning' | 'info';
  }[];
}

const attackScenarios: AttackScenario[] = [
  {
    id: 'attack-1',
    name: 'Data Tampering Attack',
    type: 'Man-in-the-Middle',
    severity: 'critical',
    description: 'Attacker attempts to modify heart rate data in transit from IoT sensor to database',
    targetPatient: 'John Doe (Room 304)',
    targetDevice: 'IoT-Device-3A (Heart Monitor)',
    attackerIP: '192.168.1.55',
    steps: [
      {
        phase: 'initial',
        title: 'Normal Operation',
        description: 'Heart monitor sends encrypted vital signs (Heart Rate: 72 BPM) to central server using AES-256-GCM encryption',
        icon: Activity,
        color: '#2EC27E',
        status: 'success',
      },
      {
        phase: 'attempt',
        title: 'Attack Initiated',
        description: 'Attacker intercepts network packet and attempts to modify heart rate value from 72 to 135 BPM (fake critical reading)',
        icon: AlertTriangle,
        color: '#C01C28',
        status: 'danger',
      },
      {
        phase: 'detection',
        title: 'HMAC Verification Failure',
        description: 'System detects HMAC-SHA256 signature mismatch. Tampered data has invalid authentication tag.',
        icon: Shield,
        color: '#E5A50A',
        status: 'warning',
      },
      {
        phase: 'blocking',
        title: 'Attack Blocked',
        description: 'Hybrid encryption system rejects tampered packet. Original encrypted data remains intact. Attack source logged.',
        icon: Lock,
        color: '#1A5FB4',
        status: 'info',
      },
      {
        phase: 'prevented',
        title: 'Data Protected',
        description: 'Authentic heart rate (72 BPM) displayed. No false alarm triggered. Patient safety maintained. Attack logged for security review.',
        icon: CheckCircle,
        color: '#2EC27E',
        status: 'success',
      },
    ],
  },
  {
    id: 'attack-2',
    name: 'Replay Attack',
    type: 'Session Hijacking',
    severity: 'high',
    description: 'Attacker captures old vital signs packet and replays it to hide current critical condition',
    targetPatient: 'Emily Johnson (Room 412)',
    targetDevice: 'IoT-Device-7B (Blood Pressure Monitor)',
    attackerIP: '10.0.0.102',
    steps: [
      {
        phase: 'initial',
        title: 'Normal Reading Captured',
        description: 'BP monitor sends reading: 118/76 mmHg at 14:15:20. Packet encrypted with timestamp and nonce.',
        icon: Activity,
        color: '#2EC27E',
        status: 'success',
      },
      {
        phase: 'attempt',
        title: 'Replay Attack Detected',
        description: 'Attacker replays old packet (14:15:20) at 14:28:45 to hide current critical BP: 185/110 mmHg',
        icon: AlertTriangle,
        color: '#C01C28',
        status: 'danger',
      },
      {
        phase: 'detection',
        title: 'Timestamp Validation Failure',
        description: 'System detects packet timestamp is 13 minutes old. Nonce already used (replay detected).',
        icon: Shield,
        color: '#E5A50A',
        status: 'warning',
      },
      {
        phase: 'blocking',
        title: 'Packet Rejected',
        description: 'Replay packet discarded. System requests fresh reading from device. Attack logged with source IP.',
        icon: Lock,
        color: '#1A5FB4',
        status: 'info',
      },
      {
        phase: 'prevented',
        title: 'Critical Alert Triggered',
        description: 'Actual BP (185/110) detected via fresh reading. Critical alert sent to medical staff. Patient receives immediate care.',
        icon: CheckCircle,
        color: '#2EC27E',
        status: 'success',
      },
    ],
  },
  {
    id: 'attack-3',
    name: 'Unauthorized Access Attempt',
    type: 'Key Compromise',
    severity: 'critical',
    description: 'Attacker attempts to decrypt patient data using stolen/guessed AES key',
    targetPatient: 'Michael Brown (Room 215)',
    targetDevice: 'IoT-Device-2F (Glucose Monitor)',
    attackerIP: '172.16.0.88',
    steps: [
      {
        phase: 'initial',
        title: 'Data Encrypted & Transmitted',
        description: 'Glucose reading (145 mg/dL) encrypted with AES-256. AES key encrypted with RSA-2048 public key.',
        icon: Lock,
        color: '#2EC27E',
        status: 'success',
      },
      {
        phase: 'attempt',
        title: 'Decryption Attempt',
        description: 'Attacker captures encrypted packet and attempts brute-force decryption using stolen AES key from different session.',
        icon: Unlock,
        color: '#C01C28',
        status: 'danger',
      },
      {
        phase: 'detection',
        title: 'Key Mismatch Detected',
        description: 'Each packet uses unique AES key. Stolen key from previous session cannot decrypt current packet.',
        icon: Shield,
        color: '#E5A50A',
        status: 'warning',
      },
      {
        phase: 'blocking',
        title: 'Hybrid Encryption Protection',
        description: 'RSA-2048 encrypted AES key requires private key to decrypt. Attacker cannot access session key. Data remains encrypted.',
        icon: Lock,
        color: '#1A5FB4',
        status: 'info',
      },
      {
        phase: 'prevented',
        title: 'Data Remains Secure',
        description: 'Patient glucose data never exposed. Session-based key exchange prevents key reuse. Attack attempt logged.',
        icon: CheckCircle,
        color: '#2EC27E',
        status: 'success',
      },
    ],
  },
];

export default function AttackDemonstrationDashboard({ onBack }: AttackDemonstrationDashboardProps) {
  const [selectedScenario, setSelectedScenario] = useState<AttackScenario>(attackScenarios[0]);
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && currentPhase < selectedScenario.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPhase(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (currentPhase >= selectedScenario.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentPhase, selectedScenario]);

  const handlePlaySimulation = () => {
    setCurrentPhase(0);
    setIsPlaying(true);
  };

  const handleResetSimulation = () => {
    setCurrentPhase(0);
    setIsPlaying(false);
  };

  const handleSelectScenario = (scenario: AttackScenario) => {
    setSelectedScenario(scenario);
    setCurrentPhase(0);
    setIsPlaying(false);
  };

  const currentStep = selectedScenario.steps[currentPhase];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HEADER with Back Button */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-8 py-5">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F6F5F4] hover:bg-[#E9EBEF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Dashboard</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">
            Attack Demonstration & System Protection
          </h1>
          <p className="text-sm text-[#717182] mt-1">
            Visual demonstration of how attacks are detected and blocked in real-time
          </p>
        </div>
      </header>

      <div className="px-8 py-6 space-y-6">
        {/* Scenario Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {attackScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleSelectScenario(scenario)}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                selectedScenario.id === scenario.id
                  ? 'border-[#1A5FB4] bg-[#1A5FB4]/5 shadow-lg'
                  : 'border-[#E9EBEF] bg-white hover:border-[#1A5FB4]/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  scenario.severity === 'critical' ? 'bg-[#C01C28]/10' : 'bg-[#F59E0B]/10'
                }`}>
                  <AlertCircle className={`w-6 h-6 ${
                    scenario.severity === 'critical' ? 'text-[#C01C28]' : 'text-[#F59E0B]'
                  }`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  scenario.severity === 'critical' 
                    ? 'bg-[#C01C28] text-white' 
                    : 'bg-[#F59E0B] text-white'
                }`}>
                  {scenario.severity.toUpperCase()}
                </span>
              </div>
              <h3 className="font-bold text-[#1E1E1E] mb-1">{scenario.name}</h3>
              <p className="text-xs text-[#717182] mb-2">{scenario.type}</p>
              <p className="text-sm text-[#717182]">{scenario.description}</p>
            </button>
          ))}
        </div>

        {/* Attack Details Card */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1E1E1E]">Attack Scenario Details</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetSimulation}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F6F5F4] hover:bg-[#E9EBEF] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-semibold">Reset</span>
              </button>
              <button
                onClick={handlePlaySimulation}
                disabled={isPlaying}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A5FB4] text-white hover:bg-[#1A5FB4]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {isPlaying ? 'Playing...' : 'Play Simulation'}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-[#F6F5F4] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-[#1A5FB4]" />
                <p className="text-xs text-[#717182] font-semibold">Target Patient</p>
              </div>
              <p className="font-bold text-[#1E1E1E]">{selectedScenario.targetPatient}</p>
            </div>
            <div className="p-4 bg-[#F6F5F4] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="w-4 h-4 text-[#1A5FB4]" />
                <p className="text-xs text-[#717182] font-semibold">Target Device</p>
              </div>
              <p className="font-bold text-[#1E1E1E]">{selectedScenario.targetDevice}</p>
            </div>
            <div className="p-4 bg-[#F6F5F4] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4 text-[#C01C28]" />
                <p className="text-xs text-[#717182] font-semibold">Attacker IP</p>
              </div>
              <p className="font-bold text-[#1E1E1E] font-mono">{selectedScenario.attackerIP}</p>
            </div>
          </div>
        </div>

        {/* Attack Timeline Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E9EBEF]">
          <h2 className="text-lg font-bold text-[#1E1E1E] mb-6">Attack Timeline & Defense Mechanism</h2>
          
          {/* Timeline Steps */}
          <div className="space-y-4">
            {selectedScenario.steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentPhase;
              const isPast = index < currentPhase;
              const isFuture = index > currentPhase;

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-500 ${
                    isActive ? 'scale-105' : ''
                  }`}
                >
                  {/* Connector Line */}
                  {index < selectedScenario.steps.length - 1 && (
                    <div className={`absolute left-6 top-14 w-0.5 h-16 transition-colors duration-500 ${
                      isPast ? 'bg-[#2EC27E]' : 'bg-[#E9EBEF]'
                    }`} />
                  )}

                  {/* Step Card */}
                  <div className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-500 ${
                    isActive 
                      ? `border-${step.color} bg-[${step.color}]/5 shadow-lg` 
                      : isPast
                      ? 'border-[#2EC27E]/30 bg-[#2EC27E]/5'
                      : 'border-[#E9EBEF] bg-white opacity-60'
                  }`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isActive
                        ? `bg-${step.color}/20 ring-4 ring-${step.color}/20`
                        : isPast
                        ? 'bg-[#2EC27E]/20'
                        : 'bg-[#E9EBEF]'
                    }`}>
                      {isPast ? (
                        <CheckCircle className="w-6 h-6 text-[#2EC27E]" />
                      ) : (
                        <StepIcon className={`w-6 h-6 ${
                          isActive ? `text-[${step.color}]` : 'text-[#717182]'
                        }`} style={{ color: isActive ? step.color : undefined }} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-bold transition-colors duration-500 ${
                          isActive ? 'text-[#1E1E1E]' : isPast ? 'text-[#2EC27E]' : 'text-[#717182]'
                        }`}>
                          {step.title}
                        </h3>
                        {isActive && (
                          <span className="px-2 py-1 bg-[#1A5FB4] text-white text-xs font-bold rounded-full animate-pulse">
                            ACTIVE
                          </span>
                        )}
                        {isPast && (
                          <CheckCircle className="w-4 h-4 text-[#2EC27E]" />
                        )}
                      </div>
                      <p className={`text-sm transition-colors duration-500 ${
                        isActive ? 'text-[#1E1E1E]' : 'text-[#717182]'
                      }`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Step Number */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isActive
                        ? 'bg-[#1A5FB4] text-white'
                        : isPast
                        ? 'bg-[#2EC27E] text-white'
                        : 'bg-[#E9EBEF] text-[#717182]'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#717182]">Defense Progress</span>
              <span className="text-sm font-bold text-[#1A5FB4]">
                {Math.round(((currentPhase + 1) / selectedScenario.steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 bg-[#E9EBEF] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1A5FB4] to-[#2EC27E] transition-all duration-500 rounded-full"
                style={{ width: `${((currentPhase + 1) / selectedScenario.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Outcome Summary */}
        {currentPhase === selectedScenario.steps.length - 1 && (
          <div className="bg-gradient-to-r from-[#2EC27E] to-[#16A34A] rounded-xl p-6 shadow-lg text-white animate-fadeIn">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8" />
              <h2 className="text-xl font-bold">Attack Successfully Blocked!</h2>
            </div>
            <p className="mb-4 opacity-90">
              The hybrid encryption system (AES-256-GCM + RSA-2048) combined with LSTM anomaly detection successfully prevented the {selectedScenario.type} attack. Patient data remains secure and integrity is maintained.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-75 mb-1">Data Integrity</p>
                <p className="text-lg font-bold">100% Protected</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-75 mb-1">Response Time</p>
                <p className="text-lg font-bold">1.2ms Detection</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-75 mb-1">Patient Safety</p>
                <p className="text-lg font-bold">Maintained</p>
              </div>
            </div>
          </div>
        )}

        {/* Information Box */}
        <div className="bg-[#1A5FB4]/5 border-l-4 border-[#1A5FB4] rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-[#1A5FB4] mt-0.5" />
            <div>
              <h3 className="font-bold text-[#1E1E1E] mb-1">Real-Time Protection Demonstration</h3>
              <p className="text-sm text-[#717182]">
                This visualization shows how the Healthcare Data Security system detects and blocks attacks in real-time. 
                The combination of cryptographic verification (HMAC-SHA256), hybrid encryption (AES-256 + RSA-2048), 
                and AI-powered anomaly detection (LSTM model) provides multiple layers of defense against cyber threats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
