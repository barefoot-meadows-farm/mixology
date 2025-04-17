import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';

import { Cookbook } from './types';

// Temporary mock data
const mockCookbook: Cookbook = {
  id: '1',
  name: 'Classic Cocktails',
  description: 'A collection of timeless cocktail recipes',
  recipes: [],
  author: 'John Doe',
  createdAt: new Date()
};

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {/* Redirect to the home tab in the Expo Router structure */}
      <Redirect href="/(tabs)" />
    </SafeAreaProvider>
  );
};

export default App;