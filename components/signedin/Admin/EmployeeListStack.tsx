import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EmployeeRoute, EmployeeStackParamList} from '../../Routes';
import AvailableEmployees from './AvailableEmployees';
import AvailableUserDetail from './AvailableUserDetail';

const Stack = createStackNavigator<EmployeeStackParamList>();

type AdminRoleType = {
  role: string;
};

export default function EmployeeListStack({role}: AdminRoleType) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={EmployeeRoute.AvailableEmployees}
        component={AvailableEmployees}
      />
      <Stack.Screen
        name={EmployeeRoute.AvailableUserDetail}
        component={AvailableUserDetail}
      />
    </Stack.Navigator>
  );
}
