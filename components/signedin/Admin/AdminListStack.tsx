import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminRoute, AdminStackParamList } from '../../Routes';
import AvailableUsers from './AvailableUsers';
import AvailableUserDetail from './AvailableUserDetail';

const Stack = createStackNavigator<AdminStackParamList>();

type AdminRoleType = {
	role: string
};

export default function AdminListStack({role}: AdminRoleType) {
	return (
			<Stack.Navigator
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen 
					name={AdminRoute.AvailableUsers}
					component={AvailableUsers}
				/>
				<Stack.Screen 
					name={AdminRoute.AvailableUserDetail}
					component={AvailableUserDetail}
				/>
			</Stack.Navigator>
	);
};