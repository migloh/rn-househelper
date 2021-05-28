import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  BackHandler
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Routes, WelcomeProps } from './Routes';
import { Blues, Grays } from './Colors';

export default function Welcome({route, navigation}: WelcomeProps) {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='black' />
      <View style={{alignItems: 'center'}}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: Blues.blue_2}}>AppName</Text>
        <Text style={{ color: 'white' }}>Your household helper</Text>
      </View>
      <FontAwesomeIcon style={styles.mainIcon} icon={faHome} size={200} color={Blues.blue_0} />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate(Routes.SignupCheck)}
        >
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      <View style={styles.lowerLine}>
        <Text style={{color: Grays.gray_0}}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.Login)}
        >
          <Text style={{color: 'white'}}> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20
  },
  mainIcon: {
    marginVertical: 90
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
    flexDirection: 'row'
  }
});