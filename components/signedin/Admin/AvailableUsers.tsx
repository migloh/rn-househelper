import React from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet
} from 'react-native';
import {AdminRoute, AvailableUsersProps} from '../../Routes';

type ScreenType = {
	roleList: string
};

export default function AvailableUsers({route, navigation}: AvailableUsersProps){
	return (
		<View style={styles.container}>
			<Text style={{color: 'white'}}>Available users lst</Text>
			<Button 
				title='next page'
				onPress={() => navigation.navigate(AdminRoute.AvailableUserDetail, {lmeo: 'lmeo'})}
			/>
		</View>
	);
}; 

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});