import React, {useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions
} from 'react-native';
import { 
	TabBar, 
	TabView, 
} from 'react-native-tab-view';
import AdminListStack from './AdminListStack';
import {Blues} from '../../Colors';

type TabLayoutType = Array<{
	key: string,
	title: string
}>;

export default function AdminUserList() {
	const layout = useWindowDimensions();
	const [index, setIndex] = useState<number>(0);
	const [routes] = useState<TabLayoutType>([
		{key: 'first', title: 'Employers'},
		{key: 'second', title: 'Employees'},
	]);
	
	const renderScene = ({route}: any) => {
		switch (route.key) {
			case 'first':
				return <AdminListStack role='Employer'/>
			case 'second':
				return <AdminListStack role='Employee'/>
			default:
				return null;
		}
	};

	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: Blues.blue_3 }}
			style={{ backgroundColor: 'black' }}
		/>
	);

	return (
		<View style={styles.container}>
      <View style={styles.upperBar}>
        <Text style={styles.headerTitle}>Utilisateurs</Text>
      </View>
			<TabView
				renderTabBar={renderTabBar}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
  upperBar: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20
  },
  headerTitle: {
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white'
  },
});