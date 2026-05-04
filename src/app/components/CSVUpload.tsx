/**
 * CSV Upload Component
 * 
 * Allows users to upload the MedSec-25 IoMT dataset CSV file
 * and transform it into patient monitoring data
 */

import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { loadCSVFile, sampleRecords, NetworkFlowRecord, PatientHealthRecord } from '../utils/csvParser';
import { transformToPatientData, transformPatientHealthRecords, calculateSecurityMetrics, generateAttackDistribution } from '../utils/dataTransformer';
import { Patient, Alert as AlertType } from '../App';

interface CSVUploadProps {
  onDataLoaded: (data: {
    patients: Patient[];
    alerts: AlertType[];
    securityMetrics: any;
    attackDistribution: any[];
  }) => void;
  onClose: () => void;
}

export function CSVUpload({ onDataLoaded, onClose }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [patientCount, setPatientCount] = useState(50);
  const [stats, setStats] = useState<{
    totalRecords: number;
    sampledRecords: number;
    attackRecords: number;
    normalRecords: number;
  } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Please select a valid CSV file');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Parse CSV file
      console.log('📂 Loading CSV file...');
      const records = await loadCSVFile(file);
      console.log(`✅ Loaded ${records.length} records`);

      if (records.length === 0) {
        throw new Error('No valid records found in CSV file');
      }

      // Check if this is patient health data or network flow data
      const isPatientHealthData = 'heartRate' in records[0];

      if (isPatientHealthData) {
        // Patient Health Monitoring Data
        console.log(`📊 Processing patient health data...`);
        const healthRecords = records as PatientHealthRecord[];
        
        const { patients, alerts, securityMetrics, attackDistribution } = 
          transformPatientHealthRecords(healthRecords, patientCount);

        console.log(`✅ Transformed ${patients.length} patients`);
        console.log(`🚨 Generated ${alerts.length} alerts`);

        // Update stats
        setStats({
          totalRecords: healthRecords.length,
          sampledRecords: patients.length,
          attackRecords: alerts.length,
          normalRecords: patients.filter(p => p.status === 'normal').length,
        });

        // Send transformed data to parent
        onDataLoaded({
          patients,
          alerts,
          securityMetrics,
          attackDistribution,
        });

        setSuccess(true);
      } else {
        // Network Flow Data (original format)
        console.log(`📊 Processing network flow data...`);
        const networkRecords = records as NetworkFlowRecord[];

        // Sample records (50-100 patients)
        const sampledRecords = sampleRecords(networkRecords, Math.min(patientCount * 2, 200)); // 2 flows per patient avg
        console.log(`📊 Sampled ${sampledRecords.length} records for ${patientCount} patients`);

        // Calculate stats
        const attackRecords = sampledRecords.filter(r => 
          !r.label.toLowerCase().includes('benign') && 
          !r.label.toLowerCase().includes('normal')
        ).length;
        const normalRecords = sampledRecords.length - attackRecords;

        setStats({
          totalRecords: networkRecords.length,
          sampledRecords: sampledRecords.length,
          attackRecords,
          normalRecords,
        });

        // Transform to patient data
        console.log('🔄 Transforming network data to patient records...');
        const { patients, alerts, deviceMappings } = transformToPatientData(sampledRecords, patientCount);
        console.log(`✅ Generated ${patients.length} patients with ${alerts.length} alerts`);

        // Calculate security metrics
        const securityMetrics = calculateSecurityMetrics(deviceMappings);
        const attackDistribution = generateAttackDistribution(deviceMappings);

        // Pass data to parent
        onDataLoaded({
          patients,
          alerts,
          securityMetrics,
          attackDistribution,
        });

        setSuccess(true);
      }
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      console.error('❌ Error processing CSV:', err);
      setError(err instanceof Error ? err.message : 'Failed to process CSV file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1A5FB4]">Load Dataset</h2>
            <p className="text-sm text-gray-600 mt-1">
              Upload MedSec-25 IoMT Cybersecurity Dataset (CSV)
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Convert Excel to CSV:</strong> File → Save As → CSV (Comma delimited)</li>
            <li>• <strong>Required columns:</strong> patientId, heartRate, bodyTemp, oxygenSaturation, systolicBP, diastolicBP</li>
            <li>• Select your CSV file using the upload button below</li>
            <li>• Choose number of patients to generate (50 recommended for presentations)</li>
            <li>• Click "Process Dataset" to load your data</li>
          </ul>
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-xs text-yellow-800">
              💡 <strong>First time?</strong> See the DATASET_UPLOAD_GUIDE.md file in your project for detailed CSV format examples
            </p>
          </div>
        </div>

        {/* Patient Count Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Patients to Generate
          </label>
          <select
            value={patientCount}
            onChange={(e) => setPatientCount(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5FB4] focus:border-transparent"
            disabled={loading}
          >
            <option value={25}>25 patients</option>
            <option value={50}>50 patients (Recommended)</option>
            <option value={75}>75 patients</option>
            <option value={100}>100 patients</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label
            htmlFor="csv-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1A5FB4] hover:bg-blue-50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {file ? (
                <>
                  <FileText className="w-8 h-8 text-[#1A5FB4] mb-2" />
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload CSV file</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </>
              )}
            </div>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              disabled={loading}
            />
          </label>
        </div>

        {/* Stats Display */}
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRecords.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Sampled Records</p>
              <p className="text-2xl font-bold text-[#1A5FB4]">{stats.sampledRecords}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-700">Normal Traffic</p>
              <p className="text-2xl font-bold text-green-600">{stats.normalRecords}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-xs text-red-700">Attack Traffic</p>
              <p className="text-2xl font-bold text-red-600">{stats.attackRecords}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              ✅ Dataset processed successfully! Loading dashboard...
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="flex-1 bg-[#1A5FB4] hover:bg-[#155A9F] text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              '🚀 Process Dataset'
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="px-6"
          >
            Cancel
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          💡 This will transform real network security data into patient monitoring records
        </p>
      </Card>
    </div>
  );
}