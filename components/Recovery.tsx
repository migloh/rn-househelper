import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { RecoveryProps } from './Routes';
import {Blues, Grays} from './Colors';

export default function Recovery({route, navigation}: RecoveryProps) {
  const [mail, setMail] = useState<string>('');
  const [inputBorder1, setInputBorder1] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={styles.upperBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recovery</Text>
      </View>
      <View style={styles.lowerSpace}>
        <Text style={styles.askingText}>To recover your password, enter an email address that is associated with your account</Text>
        <Text style={styles.inputTitle}>Your email address</Text>
        <View style={[styles.inputArea, {borderColor: inputBorder1 == true ? Blues.blue_2 : Grays.gray_2 }]}>
          <TextInput 
            style={styles.textInput}
            placeholder= "tim@apple.com"
            onFocus={() => setInputBorder1(true)}
            onBlur={() => setInputBorder1(false)}
            returnKeyType="next"
            blurOnSubmit={false}
            placeholderTextColor={Grays.gray_0}
            value={mail}
            onChangeText={setMail}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Sent", "Please check your mail")}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20, 
    justifyContent: 'center',
    flex: 1
  },
  askingText: {
    color: 'white', 
    textAlign: 'center', 
    fontSize: 15, 
    width: '80%', 
    marginBottom: '15%',
    alignSelf: 'center'
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
});