import React, {useState} from 'react';
import {
	View,
	Text,
	Alert,
	TextInput,
	TouchableOpacity
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Grays, Blues} from '../../Colors';
import {styles} from '../../Signup';

type desType = {
	uID: string
};

export default function ModalDescription({uID}: desType) {
	const [value, setValue] = useState<string>('');
  const [inputBorder, setInputBorder] = useState<boolean>(false);

	const setDescription = async () => {
		try {
			var res = await firestore()
				.collection('users1')
				.doc(uID)
				.update({
					description: value 
			});
			Alert.alert('Sucess', 'Description updated!');
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