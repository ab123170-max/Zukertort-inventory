import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function CatalogGenerator() {
  const products = [
    { id: '1', title: 'Organic Milk 1L', price: 65 },
    { id: '2', title: 'Salted Chips', price: 30 },
  ];

  const generate = async (format: 'pdf'|'excel'|'image') => {
    alert('Catalog generation started: ' + format);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{fontSize:18,fontWeight:'700', marginBottom: 8}}>My Shop Product Catalog</Text>
      <FlatList data={products} keyExtractor={p=>p.id} renderItem={({item}) => (
        <View style={{padding:8, borderBottomWidth:1, borderColor:'#f3f4f6'}}><Text>{item.title} — ₹{item.price}</Text></View>
      )} />
      <View style={{flexDirection:'row', marginTop:12}}>
        <TouchableOpacity style={styles.btn} onPress={()=>generate('pdf')}><Text style={{color:'#fff'}}>Export PDF</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn,{marginLeft:8, backgroundColor:'#06b6d4'}]} onPress={()=>generate('excel')}><Text style={{color:'#fff'}}>Export Excel</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn,{marginLeft:8, backgroundColor:'#111827'}]} onPress={()=>generate('image')}><Text style={{color:'#fff'}}>Export Image</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: { padding: 12, backgroundColor: '#10b981', borderRadius: 8 }
});
