import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { showTopToast } from '../components/TopToast';
import ScannerOverlay from '../components/ScannerOverlay';
import ProductConfirm from './ProductConfirm';

export default function HomeScanner() {
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
  const [scanning, setScanning] = React.useState(false);
  const [detectedData, setDetectedData] = React.useState<any>(null);
  const cameraRef = React.useRef<any>(null);
  const [showConfirm, setShowConfirm] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onStartScan = async () => {
    showTopToast('Scanning started... Please wait');
    setScanning(true);
    setTimeout(() => {
      const sample = {
        name: 'Organic Milk 1L',
        brand: 'Zukertort Farms',
        category: 'Dairy',
        barcode: '8901234567890',
        quantity: 12,
        unit: 'pcs',
        mrp: 65.0,
        purchasePrice: 50.0,
        sellingPrice: 55.0,
        manufactureDate: '2026-08-01',
        expiryDate: '2026-09-01',
        location: 'Back Shelf A3',
        thumbnail: null,
      };
      setDetectedData(sample);
      setScanning(false);
      showTopToast('Product detected! Please confirm the product name');
      setShowConfirm(true);
    }, 2000);
  };

  if (hasPermission === null) return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
  if (hasPermission === false) return <View style={styles.center}><Text>No access to camera</Text></View>;

  return (
    <View style={styles.container}>
      {!showConfirm ? (
        <>
          <Camera style={styles.camera} ref={cameraRef} ratio="16:9">
            <ScannerOverlay />
            <View style={styles.topStatus}><Text style={styles.statusText}>{scanning ? 'Scanning...' : 'Ready to scan'}</Text></View>
          </Camera>
          <View style={styles.bottom}>
            <Text style={styles.helper}>Point camera at product</Text>
            <TouchableOpacity style={styles.scanBtn} onPress={onStartScan}>
              {scanning ? <ActivityIndicator color="#fff" /> : <Text style={styles.scanText}>Start Scan</Text>}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ProductConfirm initial={detectedData} onDone={() => setShowConfirm(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  bottom: { padding: 16, backgroundColor: '#fff' },
  helper: { textAlign: 'center', marginBottom: 10, color: '#374151' },
  scanBtn: { backgroundColor: '#111827', padding: 14, borderRadius: 10, alignItems: 'center' },
  scanText: { color: '#fff', fontWeight: '700' },
  topStatus: { position: 'absolute', top: 10, left: 10, padding: 8, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 6 },
  statusText: { color: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
