import React from 'react';
import {
	View,
	Text
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Locations from './Locations';
import UserDetail from './UserDetail';
import {LocationsRoute, LocationsStackParamList} from '../Routes';

const Stack = createStackNavigator<LocationsStackParamList>();

export default function LocationsStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name={LocationsRoute.Locations} component={Locations} />
			<Stack.Screen name={LocationsRoute.UserDetail} component={UserDetail} />
		</Stack.Navigator>
	)
}