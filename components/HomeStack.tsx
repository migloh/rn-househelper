import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import {HomeRoutes, HomeStackParamList, HomeStackProps} from './Routes';

const StackHome = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <StackHome.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <StackHome.Screen name={HomeRoutes.Home} component={Home} />
    </StackHome.Navigator>
  );
}