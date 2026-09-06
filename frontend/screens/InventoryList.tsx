import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const sample = [
  { id: '1', title: 'Organic Milk 1L', pack: '1L', stock: 12, category: 'Dairy' },
  { id: '2', title: 'Salted Chips', pack: 'Pack 70g', stock: 3, category: 'Snacks' },
  { id: '3', title: 'Sparkling Water', pack: '500ml', stock: 20, category: 'Beverages' },
];

export default function InventoryList() {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('All');
  const items = sample.filter(it => (filter === 'All' || it.category === filter) && (it.title.toLowerCase().includes(q.toLowerCase()) || it.category.toLowerCase().includes(q.toLowerCase())));

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <TextInput placeholder="Search by name, brand or category" value={q} onChangeText={setQ} style={styles.search} />
      <View style={styles.chips}>
        {['All','Dairy','Snacks','Beverages'].map(c => (
          <TouchableOpacity key={c} onPress={() => setFilter(c)} style={[styles.chip, filter===c && styles.chipActive]}><Text style={filter===c?{color:'#fff'}:{}}>{c}</Text></TouchableOpacity>
        ))}
      </View>
      <FlatList data={items} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.card}>
          <View style={{flex:1}}>
            <Text style={{fontWeight:'700'}}>{item.title}</Text>
            <Text style={{color:'#6b7280'}}>{item.pack}</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Text style={{fontWeight:'700'}}>{item.stock}</Text>
            <View style={[styles.badge, {backgroundColor: item.stock < 5 ? '#f97316' : '#10b981'}]}>
              <Text style={{color:'#fff'}}>{item.stock < 5 ? 'Low Stock' : 'In Stock'}</Text>
            </View>
          </View>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  search: { padding: 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, marginBottom: 10 },
  chips: { flexDirection: 'row', marginBottom: 10 },
  chip: { padding: 8, borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb', marginRight: 8 },
  chipActive: { backgroundColor: '#111827', borderColor: '#111827' },
  card: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, elevation: 1 },
  badge: { marginTop: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
});
