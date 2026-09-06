import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { showTopToast } from '../components/TopToast';

export default function ProductConfirm({ initial, onDone }: { initial: any, onDone: () => void }) {
  const [form, setForm] = React.useState<any>(initial || {});
  const steps = [
    'name','brand','category','barcode','quantity','unit','mrp','purchasePrice','sellingPrice','manufactureDate','expiryDate','location'
  ];
  const [currentStep, setCurrentStep] = React.useState(0);

  const onNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(c => c + 1);
      showTopToast(`${steps[currentStep+1]} — please confirm`);
    }
  };

  const onSave = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showTopToast('Product saved to inventory!');
        onDone();
      } else {
        const err = await res.text();
        Alert.alert('Error', err);
      }
    } catch (e) {
      Alert.alert('Network error', String(e));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Confirm product details</Text>
      {steps.map((k, i) => (
        <View key={k} style={styles.row}>
          <Text style={styles.label}>{k}</Text>
          <Text style={styles.value}>{String(form[k] ?? '')}</Text>
          <Text style={[styles.check, { color: form[k] ? '#10b981' : '#cbd5e1' }]}>{form[k] ? '✓' : '○'}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.nextBtn} onPress={onNext}><Text style={{ color: '#fff' }}>Next field</Text></TouchableOpacity>
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}><Text style={{ color: '#fff', fontWeight: '700' }}>Save to Inventory</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f1f5f9' },
  label: { textTransform: 'capitalize', color: '#374151' },
  value: { flex: 1, paddingHorizontal: 12 },
  check: { width: 20, textAlign: 'center' },
  nextBtn: { marginTop: 12, padding: 12, backgroundColor: '#06b6d4', borderRadius: 8, alignItems: 'center' },
  saveBtn: { marginTop: 8, padding: 14, backgroundColor: '#111827', borderRadius: 8, alignItems: 'center' },
});
