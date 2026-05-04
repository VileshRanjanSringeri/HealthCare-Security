/**
 * Compact Patient List View
 * Displays patients in a table format with click-to-view details
 */

import { useState, useEffect, useRef } from 'react';
import { Patient } from '../App';
import { Heart, Activity, Shield, AlertTriangle, CheckCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface PatientListViewProps {
  patients: Patient[];
  onViewPatient: (patientId: string) => void;
  externalFilter?: 'all' | 'normal' | 'warning' | 'critical';
  itemsPerPage?: number;
}

export default function PatientListView({ patients, onViewPatient, externalFilter, itemsPerPage = 10 }: PatientListViewProps) {
  const [sortBy, setSortBy] = useState<'status' | 'name' | 'room'>('status');
  const [filterStatus, setFilterStatus] = useState<'all' | 'normal' | 'warning' | 'critical'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  // Sync with external filter when it changes
  useEffect(() => {
    if (externalFilter) {
      setFilterStatus(externalFilter);
      setCurrentPage(1); // Reset to first page when filter changes
    }
  }, [externalFilter]);

  // Scroll to top when page changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusPriority = (status: string) => {
    switch (status) {
      case 'critical': return 3;
      case 'warning': return 2;
      case 'normal': return 1;
      default: return 0;
    }
  };

  // Filter and sort patients
  let filteredPatients = patients;
  if (filterStatus !== 'all') {
    filteredPatients = patients.filter(p => p.status === filterStatus);
  }

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortBy === 'status') {
      return getStatusPriority(b.status) - getStatusPriority(a.status);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'room') {
      return a.room.localeCompare(b.room);
    }
    return 0;
  });

  const normalCount = patients.filter(p => p.status === 'normal').length;
  const warningCount = patients.filter(p => p.status === 'warning').length;
  const criticalCount = patients.filter(p => p.status === 'critical').length;

  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  const currentPatients = sortedPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-4">
      {/* Scroll Anchor */}
      <div ref={topRef} />
      
      {/* Sort Controls Only */}
      <div className="bg-white rounded-xl border-2 border-[#1A5FB4]/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#1E1E1E]">Patient List</h2>
            <p className="text-sm text-[#717182] mt-1">
              Showing {currentPatients.length} of {sortedPatients.length} patients
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A5FB4] focus:border-transparent"
            >
              <option value="status">Status</option>
              <option value="name">Name</option>
              <option value="room">Room</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl border-2 border-[#1A5FB4]/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F6F5F4] border-b-2 border-[#1A5FB4]/10">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                Heart Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                Blood Pressure
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                SpO2
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                AI Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#717182] uppercase tracking-wider">
                Crypto
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#717182] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPatients.map((patient, index) => (
              <tr
                key={patient.id}
                className="hover:bg-[#F6F5F4]/50 transition-colors cursor-pointer group"
                onClick={() => onViewPatient(patient.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-[#1A5FB4]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="font-semibold text-[#1E1E1E]">{patient.name}</div>
                    <div className="text-sm text-[#717182]">Age {patient.age} • {patient.weight}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-[#1E1E1E] font-semibold">{patient.room}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="font-semibold text-[#1E1E1E]">{patient.vitalSigns.heartRate}</span>
                    <span className="text-xs text-[#717182]">BPM</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold text-[#1E1E1E]">{patient.vitalSigns.bloodPressure}</span>
                  <span className="text-xs text-[#717182] ml-1">mmHg</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-[#1E1E1E]">{patient.vitalSigns.oxygen}</span>
                    <span className="text-xs text-[#717182]">%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.aiAnalysis.status === 'anomaly' ? (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-700 font-medium">Anomaly</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-700 font-medium">Normal</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.cryptoStatus.verified ? (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-700 font-medium">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-700 font-medium">Failed</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPatient(patient.id);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A5FB4] hover:bg-[#155A9F] text-white text-sm font-medium rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedPatients.length === 0 && (
        <div className="bg-white rounded-xl border-2 border-[#1A5FB4]/10 p-12 text-center">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patients Found</h3>
          <p className="text-gray-600">Try adjusting your filters to see patients.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="bg-white rounded-xl border-2 border-[#1A5FB4]/10 p-4">
          <div className="flex items-center justify-center gap-4">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-[#1A5FB4] text-white hover:bg-[#155A9F] shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}
            <span className="text-sm font-semibold text-[#1E1E1E]">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-[#1A5FB4] text-white hover:bg-[#155A9F] shadow-md"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}