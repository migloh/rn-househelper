import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee,faChevronLeft, faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import {Blues, Grays} from './Colors';
import {LoginProps, AuthRoutes} from './Routes';
import auth from '@react-native-firebase/auth'; 
import {AuthContext} from './context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({route, navigation}: LoginProps) {
  const [mail, setMail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [inputBorder1, setInputBorder1] = useState<boolean>(false);
  const [inputBorder2, setInputBorder2] = useState<boolean>(false);
  const passInputRef = useRef<TextInput>(null);
  const {signIn} = React.useContext(AuthContext);

  const storeID = async (value: string) => {
    try {
      await AsyncStorage.setItem('currentID', value)
      storeRole(value);
    } catch (e) {
      // saving error
      console.log(e.message);
    }
  };

  const storeRole = async (eeID: string|undefined) => {
    var userRef = firestore().collection('users').doc(eeID);
    var userInfo = await userRef.get();
    if (!userInfo.exists){
      console.log('Ne trouve pas les informations');
    } else {
      let res = userInfo.data();
      if(res !== undefined) {
        console.log(res.role);
        await AsyncStorage.setItem('userRole', res.role)
        .catch(e => console.log(e.message));
      }
    }
  };

  const __doSignIn = async (lmeo: string, pwd: string) => {
    try {
      let response = await auth().signInWithEmailAndPassword(
        lmeo,
        pwd
        )
      if (response && response.user) {
        console.log(response.user.uid);
        storeID(response.user.uid);
        if(signIn) signIn();
      }
    } catch (e) {
      Alert.alert("Warning", e.message);
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
        <Text style={styles.headerTitle}>Login</Text>
      </View>
      <View style={styles.lowerSpace}>
        <ScrollView style={styles.scrollableContent}>
          {/* <Text style={{color: Grays.gray_0}}>Log in with one of following options</Text>
          <View style={styles.signinOptions}>
            <TouchableOpacity style={styles.signinOptionButton}>
              <FontAwesome5 name={'google'} size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signinOptionButton}>
              <FontAwesome5 name={'apple'} size={24} color="white" />
            </TouchableOpacity>
          </View> */}
          <View style={styles.lowerLine}>
            <Text style={{color: Grays.gray_0}}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(AuthRoutes.Signup)}
            >
              <Text style={styles.actionText}> Sign up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={[styles.inputArea, {borderColor: inputBorder1 == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "tim@apple.com"
              onFocus={() => setInputBorder1(true)}
              onBlur={() => setInputBorder1(false)}
              onSubmitEditing={() => passInputRef.current?.focus()}
              returnKeyType="next"
              blurOnSubmit={false}
              placeholderTextColor={Grays.gray_0}
              autoCapitalize='none'
              value={mail}
              onChangeText={setMail}
            />
          </View>
          <Text style={styles.inputTitle}>Password</Text>
          <View style={[styles.inputArea, {borderColor: inputBorder2 == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "Enter your password"
              ref={passInputRef}
              onFocus={() => setInputBorder2(true)}
              onBlur={() => setInputBorder2(false)}
              placeholderTextColor={Grays.gray_0}
              autoCapitalize='none'
              value={pass}
              onChangeText={setPass}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if(mail === '' || pass === '') Alert.alert("Warning", "Empty string")
              else __doSignIn(mail, pass)
            }}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.lowerLine}>
            <Text style={{color: Grays.gray_0}}>Forgot password?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(AuthRoutes.Recovery)}
            >
              <Text style={styles.actionText}> Password recovery</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 20
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