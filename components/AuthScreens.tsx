import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Signup from './Signup';
import Login from './Login';
import Recovery from './Recovery';
import { AuthRoutes, AuthStackParamList } from './Routes';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthScreens() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen name={AuthRoutes.Welcome} component={Welcome} />
      <AuthStack.Screen name={AuthRoutes.Signup} component={Signup} />
      <AuthStack.Screen name={AuthRoutes.Login} component={Login} />
      <AuthStack.Screen name={AuthRoutes.Recovery} component={Recovery} />
    </AuthStack.Navigator>
  ); 
}