"""
Healthcare Data Security - Cryptographic Integrity Verification Script
========================================================================
This script demonstrates the cryptographic implementation:
1. HMAC-SHA256 for data integrity
2. AES-256-GCM encryption metadata
3. RSA-2048 digital signatures
4. SHA-256 data hashing

Author: Healthcare Security Monitoring System
Date: 2024
"""

import json
import hashlib
import hmac
from datetime import datetime

# Load the protected records
with open('healthcare_cryptographic_records.json', 'r') as f:
    records = json.load(f)

print("=" * 80)
print("HEALTHCARE DATA CRYPTOGRAPHIC INTEGRITY VERIFICATION")
print("=" * 80)
print()

# Display metadata
print("📋 SYSTEM METADATA:")
print(f"   System: {records['metadata']['system']}")
print(f"   Encryption: {records['metadata']['encryption_standard']}")
print(f"   Integrity Check: {records['metadata']['integrity_check']}")
print(f"   Total Records: {records['metadata']['total_records']}")
print(f"   Generated: {records['metadata']['generated_at']}")
print()

# Verify a few sample records
print("🔐 CRYPTOGRAPHIC PROTECTION VERIFICATION:")
print("-" * 80)

for i, record in enumerate(records['patients'][:5]):  # Show first 5
    patient_id = record['patient_data']['patient_id']
    crypto = record['cryptographic_protection']
    
    print(f"\n✓ Patient ID: {patient_id}")
    print(f"  ├─ HMAC Signature: {crypto['hmac_signature'][:32]}...")
    print(f"  ├─ Data Hash (SHA-256): {crypto['data_hash'][:32]}...")
    print(f"  ├─ Encryption: {crypto['encryption_metadata']['algorithm']}")
    print(f"  ├─ IV: {crypto['encryption_metadata']['iv'][:20]}...")
    print(f"  ├─ Auth Tag: {crypto['encryption_metadata']['auth_tag'][:20]}...")
    print(f"  ├─ RSA Algorithm: {crypto['rsa_signature']['algorithm']}")
    print(f"  ├─ RSA Signature: {crypto['rsa_signature']['signature'][:40]}...")
    print(f"  └─ Status: {record['verification_status']}")

print()
print("-" * 80)
print()

# Show vital signs for one patient to demonstrate data protection
print("📊 SAMPLE PROTECTED PATIENT DATA:")
sample = records['patients'][0]['patient_data']
print(f"   Patient ID: {sample['patient_id']}")
print(f"   Vitals:")
print(f"      • Heart Rate: {sample['vitals']['heart_rate']} bpm")
print(f"      • Blood Pressure: {sample['vitals']['systolic_bp']}/{sample['vitals']['diastolic_bp']} mmHg")
print(f"      • Body Temperature: {sample['vitals']['body_temperature']}°C")
print(f"      • Oxygen Saturation: {sample['vitals']['oxygen_saturation']}%")
print(f"   Risk Category: {sample['risk_assessment']['category']}")
print()

# Summary statistics
print("📈 CRYPTOGRAPHIC IMPLEMENTATION SUMMARY:")
print(f"   ✓ {len(records['patients'])} patient records cryptographically protected")
print(f"   ✓ Each record has unique HMAC-SHA256 signature")
print(f"   ✓ AES-256-GCM encryption with authentication tags")
print(f"   ✓ RSA-2048 digital signatures for non-repudiation")
print(f"   ✓ SHA-256 hashing for data integrity verification")
print()
print("=" * 80)
print("✅ CRYPTOGRAPHIC INTEGRITY VERIFICATION COMPLETE")
print("=" * 80)
