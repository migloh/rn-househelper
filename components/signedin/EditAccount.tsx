import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  StatusBar,
  StyleSheet,
  ScrollView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { styles } from '../Signup';
import { Blues, inBlack, Grays } from '../Colors';

export default function EditAccount() {
  const [curPass, setCurPass] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [rePass, setRePass] = useState<string>('');
  const [inputBorderCurPass, setinputBorderCurPass] = useState<boolean>(false);
  const [inputBorderPass, setinputBorderPass] = useState<boolean>(false);
  const [inputBorderNewPass, setinputBorderNewPass] = useState<boolean>(false);

  return (
    <View style={[styles.container, {paddingHorizontal: 15}]}>
      <Text style={styles.inputTitle}>Current password</Text>
      <View style={[styles.inputArea, {borderColor: inputBorderCurPass == true ? Blues.blue_2 : Grays.gray_2 }]}>
        <TextInput 
          style={styles.textInput}
          placeholder= "YourPassword"
          onFocus={() => setinputBorderPass(true)}
          onBlur={() => setinputBorderPass(false)}
          placeholderTextColor = {Grays.gray_0}
          autoCapitalize='none'
          secureTextEntry={true}
          value={curPass}
          onChangeText={setPass}
        />
      </View>
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
          onFocus={() => setinputBorderPass(true)}
          onBlur={() => setinputBorderPass(false)}
          placeholderTextColor = {Grays.gray_0}
          autoCapitalize='none'
          secureTextEntry={true}
          value={rePass}
          onChangeText={setPass}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, {marginBottom: 50}]}
        onPress={() => null}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}