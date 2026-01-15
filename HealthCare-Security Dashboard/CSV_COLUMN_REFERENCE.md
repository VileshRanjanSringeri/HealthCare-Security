# CSV Column Reference

## Expected CSV Structure for MedSec-25 Dataset

This application automatically maps these columns from your CSV file:

### Required Columns (Case-insensitive matching)

| Column Name Pattern | Description | Example Values |
|-------------------|-------------|----------------|
| `Flow ID` / `flow_id` | Unique flow identifier | flow-12345, abc123 |
| `Src IP` / `src_ip` / `source_ip` | Source IP address | 192.168.1.100 |
| `Dst IP` / `dst_ip` / `destination_ip` | Destination IP | 10.0.0.50 |
| `Src Port` / `src_port` | Source port number | 443, 8080, 3000 |
| `Dst Port` / `dst_port` | Destination port | 80, 443, 22 |
| `Protocol` | Network protocol | 6 (TCP), 17 (UDP) |
| `Timestamp` | Flow capture time | 2024-12-18 14:30:00 |
| `Label` | **Attack type or "BENIGN"** | DoS, DDoS, BENIGN, Normal |

### Optional Columns (Enhanced Analysis)

| Column Name | Description |
|------------|-------------|
| `Flow Duration` | Duration in seconds |
| `Tot Fwd Pkts` | Total forward packets |
| `Tot Bwd Pkts` | Total backward packets |
| `Flow Byts/s` | Flow bytes per second |
| `Flow Pkts/s` | Flow packets per second |
| `FIN Flag Cnt` | FIN flag count |
| `SYN Flag Cnt` | SYN flag count |
| `RST Flag Cnt` | RST flag count |
| `PSH Flag Cnt` | PSH flag count |
| `ACK Flag Cnt` | ACK flag count |

## Example CSV Format

```csv
Flow ID,Src IP,Src Port,Dst IP,Dst Port,Protocol,Timestamp,Flow Duration,Tot Fwd Pkts,Tot Bwd Pkts,Flow Byts/s,Flow Pkts/s,FIN Flag Cnt,SYN Flag Cnt,RST Flag Cnt,PSH Flag Cnt,ACK Flag Cnt,Label
192.168.1.1-10.0.0.1-443-80-6,192.168.1.1,443,10.0.0.1,80,6,12/18/2024 14:30,120,100,50,5000,10,1,1,0,5,50,BENIGN
192.168.1.5-10.0.0.2-8080-443-6,192.168.1.5,8080,10.0.0.2,443,6,12/18/2024 14:31,5,1000,0,50000,200,0,100,0,0,0,DoS
192.168.1.10-10.0.0.3-3000-22-6,192.168.1.10,3000,10.0.0.3,22,6,12/18/2024 14:32,30,50,50,2000,3,1,1,0,2,48,BENIGN
```

## Attack Label Examples

The **Label** column should contain one of these values:

### Benign Traffic
- `BENIGN`
- `Normal`
- `NORMAL`
- (any variation is detected as normal traffic)

### Attack Types
- `DoS` - Denial of Service
- `DDoS` - Distributed Denial of Service
- `Probe` - Network Probing/Scanning
- `Scan` - Port Scanning
- `Injection` - SQL/Code Injection
- `Tampering` - Data Tampering
- `Replay` - Replay Attack
- `Spoofing` - IP/DNS Spoofing
- Custom attack names (automatically detected)

## Parser Behavior

### Column Name Matching
The parser uses **flexible matching**:
- Case-insensitive
- Ignores spaces, underscores, and hyphens
- Matches partial names

Examples:
- `Src IP` = `src_ip` = `source_ip` = `SRC_IP`
- `Flow ID` = `flow_id` = `flowid` = `FLOW-ID`

### Missing Data Handling
- Missing columns: Uses default values
- Empty cells: Filled with sensible defaults
- Invalid values: Skips row with warning

### Attack Detection
The system detects attacks by analyzing the `Label` column:
- **Contains "benign" or "normal"** → Normal traffic (0-10% anomaly)
- **Contains "dos" or "ddos"** → DoS attack (85-99% anomaly)
- **Contains "probe" or "scan"** → Scanning (70-85% anomaly)
- **Contains "injection"** → Injection attack (80-95% anomaly)
- **Any other label** → Generic attack (65-85% anomaly)

## Troubleshooting

### "No valid records found"
- Ensure CSV has a header row
- Check that columns are comma-separated
- Verify file encoding is UTF-8

### "Attack types not showing"
- Check Label column has attack types (not all "BENIGN")
- Ensure attack labels match examples above
- Try increasing patient count to sample more flows

### "Incorrect IP addresses"
- Verify Src IP column has valid IP format
- Check for leading/trailing spaces
- Ensure IPs are not empty

## Quick Test

Save this as `test.csv` to verify format:

```csv
Flow ID,Src IP,Src Port,Dst IP,Dst Port,Protocol,Timestamp,Label
flow-1,192.168.1.1,443,10.0.0.1,80,6,2024-12-18 14:30:00,BENIGN
flow-2,192.168.1.2,8080,10.0.0.2,443,6,2024-12-18 14:31:00,DoS
flow-3,192.168.1.3,3000,10.0.0.3,22,6,2024-12-18 14:32:00,BENIGN
flow-4,192.168.1.4,5000,10.0.0.4,80,6,2024-12-18 14:33:00,Probe
flow-5,192.168.1.5,443,10.0.0.5,443,6,2024-12-18 14:34:00,BENIGN
```

Upload this test file to verify the parser works correctly!

---

For more details, see [DATASET_INTEGRATION_GUIDE.md](/DATASET_INTEGRATION_GUIDE.md)
