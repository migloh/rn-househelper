import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { styles } from '../Signup';
import { Blues, inBlack, Grays } from '../Colors';

export default function EditAccount() {
  const [pass, setPass] = useState<string>('');
  const [rePass, setRePass] = useState<string>('');
  const [inputBorderPass, setinputBorderPass] = useState<boolean>(false);
  const [inputBorderNewPass, setinputBorderNewPass] = useState<boolean>(false);

  const updatePass = async () => {
    try {
      await auth().currentUser?.updatePassword(pass);
      Alert.alert('Success', 'Password updated!');      
    } catch (error) {
      Alert.alert('Warning', error.message)
    }
  }

  const onChangePass = () => {
    if (pass == '' || rePass == '') Alert.alert('Warning', 'One or more field are left blank!');
    else if (pass != rePass) Alert.alert('Warning', 'Not match!');
    else updatePass();
  }

  return (
    <View style={[styles.container, {paddingHorizontal: 15}]}>
      <Text style={styles.inputTitle}>Password</Text>
      <View style={[styles.inputArea, {borderColor: inputBorderPass == true ? Blues.blue_2 : Grays.gray_2 }]}>
        <TextInput 
          style={styles.textInput}
          placeholder= "Pick a strong password"
          onFocus={() => setinputBorderPass(true)}
          onBlur={() => setinputBorderPass(false)}
          placeholderTextColor = {Grays.gray_0}
          autoCapitalize='none'
          secureTextEntry={true}
          value={pass}
          onChangeText={setPass}
        />
      </View>
      <Text style={styles.inputTitle}>Retype new password</Text>
      <View style={[styles.inputArea, {borderColor: inputBorderNewPass == true ? Blues.blue_2 : Grays.gray_2 }]}>
        <TextInput 
          style={styles.textInput}
          placeholder= "Enter your new password"
          onFocus={() => setinputBorderNewPass(true)}
          onBlur={() => setinputBorderNewPass(false)}
          placeholderTextColor = {Grays.gray_0}
          autoCapitalize='none'
          secureTextEntry={true}
          value={rePass}
          onChangeText={setRePass}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, {marginBottom: 50}]}
        onPress={() => onChangePass()}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}