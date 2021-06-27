import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

export default function AvailableuserDetail() {
	return (
		<View style={styles.container}>
			<Text style={{color: 'black'}}>User Detail</Text>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});