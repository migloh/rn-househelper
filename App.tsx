import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import SignupCheck from './components/SignupCheck';
import Signup from './components/Signup';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes, RootStackParamList } from './components/Routes';
import Home from './components/Home';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => SplashScreen.hide());
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={auth().currentUser === null ? Routes.Welcome : Routes.Home}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name={Routes.Welcome} component={Welcome} />
        <Stack.Screen name={Routes.SignupCheck} component={SignupCheck} />
        <Stack.Screen name={Routes.Signup} component={Signup} />
        <Stack.Screen name={Routes.Login} component={Login} />
        <Stack.Screen name={Routes.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};