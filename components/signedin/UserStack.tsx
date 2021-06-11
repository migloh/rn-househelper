import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UsersList from './UsersList';
import UserDetail from './UserDetail';
import Inbox from './Inbox';
import {UserRoute, UserStackParamList} from '../Routes';

const Stack = createStackNavigator<UserStackParamList>();

export default function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={UserRoute.UsersList} component={UsersList} />
      <Stack.Screen name={UserRoute.UserDetail} component={UserDetail} />
    </Stack.Navigator>
  );
}