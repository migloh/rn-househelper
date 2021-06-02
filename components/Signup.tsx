import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faChevronLeft, faAppleAlt} from '@fortawesome/free-solid-svg-icons'
import {Blues, Grays} from './Colors';
import {AuthRoutes, SignupProps} from './Routes';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Signup({route, navigation}: SignupProps) {
  const [mail, setMail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [fname, setFname] = useState<string>('');
  const [inputBorder1, setInputBorder1] = useState<boolean>(false);
  const [inputBorder2, setInputBorder2] = useState<boolean>(false);
  const [inputBorder3, setInputBorder3] = useState<boolean>(false);

  const __doCreateUser = async (lmail: string, password: string, lame: string) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        lmail,
        password
      )
      if (response && response.user) {
        Alert.alert("Success", "Account created successfully");
        console.log(JSON.stringify(response.user.uid));
        const userID: string = response.user.uid;
        firestore().collection('users').doc(userID).set({
          fname: lame,
          email: lmail
        })
        .then(() => console.log('ok created'))
        navigation.navigate(AuthRoutes.Login);
      }
    } catch (e) {
      // console.error(e.message);
      Alert.alert("Failed", e.message)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View style={styles.upperBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>
      <View style={styles.lowerSpace}>
        <ScrollView style={styles.scrollableContent}>
          <Text style={{color: Grays.gray_0}}>Sign up with one of following options</Text>
          <View style={styles.signinOptions}>
            <TouchableOpacity style={styles.signinOptionButton}>
              <FontAwesome5 name={'google'} size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signinOptionButton}>
              <FontAwesome5 name={'apple'} size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.lowerLine}>
            <Text style={{color: Grays.gray_0}}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(AuthRoutes.Login)}
            >
              <Text style={styles.actionText}> Log in</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>Name</Text>
          <View style={[styles.inputArea, {borderColor: inputBorder1 == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "Full name" 
              onFocus={() => setInputBorder1(true)}
              onBlur={() => setInputBorder1(false)}
              placeholderTextColor = {Grays.gray_0}
              value={fname}
              onChangeText={setFname}
            />
          </View>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={[styles.inputArea, {borderColor: inputBorder2 == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "tim@apple.com" 
              onFocus={() => setInputBorder2(true)}
              onBlur={() => setInputBorder2(false)}
              placeholderTextColor = {Grays.gray_0}
              value={mail}
              onChangeText={setMail}
            />
          </View>
          <Text style={styles.inputTitle}>Password</Text>
          <View style={[styles.inputArea, {borderColor: inputBorder3 == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "Pick a strong password"
              onFocus={() => setInputBorder3(true)}
              onBlur={() => setInputBorder3(false)}
              placeholderTextColor = {Grays.gray_0}
              secureTextEntry={true}
              value={pass}
              onChangeText={setPass}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if(mail === '' || pass === '' || fname === '') Alert.alert("Warning", "Empty string")
              else __doCreateUser(mail, pass, fname)
            }}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
  backButton: {
    borderRadius: 10, 
    borderColor: Grays.gray_2, 
    width: 43,
    height: 43,
    borderWidth: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white'
  },
  lowerSpace: {
    flex: 1,
    paddingHorizontal: 20, 
  },
  scrollableContent: {
    paddingTop: 30
  },
  signinOptions: {
    width: "100%", 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 15, 
    marginBottom: 15
  },
  signinOptionButton: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Grays.gray_2,
    width: "47%",
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Grays.gray_button
  },
  inputTitle: {
    color: 'white',
    marginLeft: 10
  },
  textInput: {
    color: 'white',
    width: "100%"
  },
  inputArea: {
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 20,
    width: "100%",
    height: 60,
    borderColor: Grays.gray_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Grays.gray_button
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Blues.blue_1,
    marginVertical: 10
  },
  buttonText: { 
    fontSize: 16,
    color: 'white',  
    fontWeight: 'bold'
  },
  lowerLine: {
    marginTop: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold'
  }
});