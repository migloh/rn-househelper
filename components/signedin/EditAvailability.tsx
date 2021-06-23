import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 
import { Grays, Blues } from '../Colors';

var currentUid: string|undefined = auth().currentUser?.uid;

const setAval = async (avail: string) => {
  try {
    await firestore().collection('employees1').doc(currentUid).update({
      availability: avail 
    });
  } catch (error) {
    console.log('Set avail error: ', error.message);    
  }
};

export default function EditAvailability () {
  const [availabilite, setAvailabilite] = useState<string>('')
  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>Availability</Text>
      <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
        <Picker
          style={availabilite === 'none' ? styles.pickerNone : styles.pickerPicked}
          selectedValue={availabilite}
          dropdownIconColor={Grays.gray_0}
          onValueChange={(itemValue, itemIndex) =>
            setAvailabilite(itemValue)
          }>
          <Picker.Item label="Choose one" value="" />
          <Picker.Item label="Not available" value="na" />
          <Picker.Item label="Part-time" value="Part-time" />
          <Picker.Item label="Full-time" value="Full-time" />
        </Picker>
      </View>
      <TouchableOpacity
        style={[styles.button, {marginBottom: 50}]}
        onPress={() => setAval(availabilite)}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black',
    paddingHorizontal: 20
  },
  pickerNone: {
    flex: 1, 
    color: Grays.gray_0
  },
  pickerPicked: {
    flex: 1,
    color: 'white'
  },
  inputTitle: {
    color: 'white',
    marginLeft: 10
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
    justifyContent: 'space-around',
    alignItems: 'center',
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