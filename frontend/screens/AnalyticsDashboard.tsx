import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnalyticsDashboard() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{fontSize:20,fontWeight:'700'}}>Overview</Text>
      <View style={styles.kpis}>
        <View style={styles.kpi}><Text>Total Products</Text><Text style={styles.kpiValue}>128</Text></View>
        <View style={styles.kpi}><Text>Total Stock Value</Text><Text style={styles.kpiValue}>₹56,450</Text></View>
        <View style={styles.kpi}><Text>Low Stock</Text><Text style={styles.kpiValue}>12</Text></View>
        <View style={styles.kpi}><Text>Expiring Soon</Text><Text style={styles.kpiValue}>4</Text></View>
      </View>

      <View style={{marginTop:16}}>
        <Text style={{fontWeight:'700'}}>Category Breakdown</Text>
        <View style={{height:200, backgroundColor:'#f8fafc', borderRadius:12, marginTop:8, alignItems:'center', justifyContent:'center'}}><Text>Doughnut chart placeholder</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kpis: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  kpi: { width: '48%', padding: 12, backgroundColor: '#fff', margin: '1%', borderRadius: 8 },
  kpiValue: { fontWeight: '800', marginTop: 6 }
});
