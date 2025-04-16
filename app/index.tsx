import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { Cookbook } from './types';
import HomeScreen from "@/app/app/(tabs)";

const Stack = createNativeStackNavigator();

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
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Mixology',
            }}
          />
          {/* Additional screens will be added here */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;