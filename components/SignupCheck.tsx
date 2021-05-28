import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ModalDropdown from 'react-native-modal-dropdown';
import {Routes, SignupCheckProps} from './Routes';
import {Blues, Grays} from './Colors';

export default function SignupCheck({route, navigation}: SignupCheckProps) {
  const [str, setStr] = useState<string>('khum');
  const lmao = ['Seek for a househelper', 'Be a househelper'];
  return (
    <View style={styles.container}>
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
        <Text style={styles.asking}>What do you want?</Text>
        <View style={styles.dropdownOuter}>
          <ModalDropdown 
            style={{width: 250}}
            textStyle={{fontSize: 16, color: 'white'}}
            dropdownStyle={{width: "80%", borderRadius: 15}} 
            dropdownTextStyle={{fontSize: 16}}
            options={lmao}
            animated={false}
            defaultValue="I want to ..."
            onSelect={(num) => {
              setStr(lmao[num]);
              // console.log(str);
            }}
          />
          <FontAwesomeIcon icon={faCaretDown} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(Routes.Signup)}
        >
          <Text style={styles.buttonText}>Next</Text>
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
    justifyContent: 'center' ,
    flex: 1
  },
  asking: {
    marginLeft: 10,
    color: 'white'
  },
  dropdownOuter: {
    height: 60,
    width: "100%",
    borderWidth: 2,
    borderColor: Blues.blue_2,
    borderRadius: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
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