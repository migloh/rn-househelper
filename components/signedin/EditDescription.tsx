import React, {useState} from 'react';
import {
	View,
	Text,
	Alert,
	TextInput,
	TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {Grays, Blues} from '../Colors';
import {styles} from '../Signup';

var currentID: string|undefined = auth().currentUser?.uid;

export default function EditDescription () {
	const [value, setValue] = useState<string>('');
  const [inputBorder, setInputBorder] = useState<boolean>(false);

	const setDescription = async () => {
		try {
			var res = await firestore()
				.collection('users')
				.doc(currentID)
				.update({
					description: value 
			});
			console.log(JSON.stringify(res));
		} catch (err) {
			Alert.alert('Error!', err.message);
		}
	}

	return (
		<View style={[styles.container, {paddingHorizontal: 15}]}>
			<Text style={styles.inputTitle}>Edit description</Text>
			<View style={[styles.inputArea, {borderColor: inputBorder == true ? Blues.blue_2 : Grays.gray_2, height: 'auto' }]}>
				<TextInput 
					style={styles.textInput}
					placeholder= "Your description..." 
					placeholderTextColor = {Grays.gray_0}
					value={value}
					onChangeText={setValue}
					multiline={true}
					onFocus={() => setInputBorder(true)}
					onBlur={() => setInputBorder(false)}
				/>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setDescription()}
			>
				<Text style={styles.buttonText}>Save</Text>
			</TouchableOpacity>
		</View>
	);
}