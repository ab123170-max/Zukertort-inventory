import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ScannerOverlay() {
  return (
    <View style={styles.overlay}>
      <View style={styles.box} />
      <View style={styles.bottomBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  box: {
    width: '78%', height: '40%',
    borderColor: '#06b6d4', borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center', justifyContent: 'center'
  },
  bottomBox: { position: 'absolute', bottom: 40 }
});
