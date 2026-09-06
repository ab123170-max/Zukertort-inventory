import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigator from './navigation/MainNavigator';
import TopToast from './components/TopToast';

export default function App() {
  return (
    <PaperProvider>
      <MainNavigator />
      <TopToast />
    </PaperProvider>
  );
}
