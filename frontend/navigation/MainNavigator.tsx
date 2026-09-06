import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScanner from '../screens/HomeScanner';
import InventoryList from '../screens/InventoryList';
import CatalogGenerator from '../screens/CatalogGenerator';
import AnalyticsDashboard from '../screens/AnalyticsDashboard';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScanner} />
        <Tab.Screen name="Inventory" component={InventoryList} />
        <Tab.Screen name="Scan" component={CatalogGenerator} />
        <Tab.Screen name="Analytics" component={AnalyticsDashboard} />
        <Tab.Screen name="More" component={MoreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
