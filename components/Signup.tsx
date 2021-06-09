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
import { faChevronLeft, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import {Blues, Grays} from './Colors';
import {AuthRoutes, SignupProps} from './Routes';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {switchProvince} from '../assets/vietnam_dataset/province';

export type districtType = Array<{
  'name': string,
  'pre': string,
  'ward': Array<{
    'name': string,
    'pre': string
  }>,
}>;

export type wardType = Array<{
  'name': string,
  'pre': string
}>;


export default function Signup({route, navigation}: SignupProps) {
  const [mail, setMail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [fname, setFname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [dob, setDob] = useState<Date>(new Date());
  const [inputBorderName, setinputBorderName] = useState<boolean>(false);
  const [inputBorderMail, setinputBorderMail] = useState<boolean>(false);
  const [inputBorderPass, setinputBorderPass] = useState<boolean>(false);
  const [inputBorderPhone, setInputBorderPhone] = useState<boolean>(false);
  const [inputBorderAddr, setInputBorderAddr] = useState<boolean>(false)
  const [role, setRole] = useState<string>('none');
  const [gender, setGender] = useState<string>('none');
  const [availabilite, setAvailabilite] = useState<string>('none');
  const [province, setProvince] = useState<string>('none');
  const [districtList, setDistrictList] = useState<districtType>([]);
  const [district, setDistrict] = useState<string>('none');
  const [wardList, setWardList] = useState<wardType>([]);
  const [ward, setWard] = useState<string>('none');
  const [homeAdd, setHomeAdd] = useState<string>('');

  const prv = require('../assets/vietnam_dataset/Index.json');

  const mailCond = /^[a-zA-Z0-9\._]{3,50}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,1}$/;

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
          <View style={[styles.inputArea, {borderColor: inputBorderName == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "Full name" 
              onFocus={() => setinputBorderName(true)}
              onBlur={() => setinputBorderName(false)}
              placeholderTextColor = {Grays.gray_0}
              autoCapitalize='words'
              value={fname}
              onChangeText={setFname}
            />
          </View>
          <Text style={styles.inputTitle}>Gender</Text>
          <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
            <Picker
              style={gender === 'none' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={gender}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) =>
                setGender(itemValue)
              }>
              <Picker.Item label="Choose one" value="none" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          <Text style={styles.inputTitle}>Date of birth</Text>
          <View style={styles.inputArea}>
            <TouchableOpacity
              onPress={() => {setShowDateModal(true)}}
            > 
              <Text style={styles.textInput}>{JSON.stringify(dob).slice(1, 11)}</Text>
            </TouchableOpacity>
            {
              showDateModal && (
                <DateTimePicker
                  testID="dateTimePicker"
                  maximumDate={new Date()}
                  value={dob}
                  mode='date'
                  display="spinner"
                  onChange={(event: Event, dal: Date|undefined) => {
                    if (dal !== undefined){ 
                      setDob(dal);
                      console.log(dal);
                      setShowDateModal(false);
                    }
                  }}
                />
              )
            }
          </View>
          <Text style={styles.inputTitle}>Phone number</Text>
          <View style={[styles.inputArea, {borderColor: inputBorderPhone == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "0123456789" 
              onFocus={() => setInputBorderPhone(true)}
              onBlur={() => setInputBorderPhone(false)}
              placeholderTextColor = {Grays.gray_0}
              keyboardType='number-pad'
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={[styles.inputArea, {borderColor: inputBorderMail == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "tim@apple.com" 
              onFocus={() => setinputBorderMail(true)}
              onBlur={() => setinputBorderMail(false)}
              placeholderTextColor = {Grays.gray_0}
              autoCapitalize='none'
              value={mail}
              onChangeText={setMail}
            />
           {
              mailCond.test(mail) 
              ?  (
                <FontAwesomeIcon
                  style={{marginLeft: -20}}
                  icon={faCheckCircle} 
                  color={Blues.blue_2} 
                  size={20}
                />
              )
              :  null
            }
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
          <Text style={styles.inputTitle}>What do you want to be?</Text>
          <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
            <Picker
              style={role === 'none' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={role}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) =>
                setRole(itemValue)
              }>
              <Picker.Item label="Choose one" value="none" />
              <Picker.Item label="Employee" value="eee" />
              <Picker.Item label="Employer" value="eer" />
            </Picker>
          </View>
          {
            role === 'eer'
            ? (
              <>
                <Text style={styles.inputTitle}>Availability</Text>
                <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
                  <Picker
                    style={availabilite === 'none' ? styles.pickerNone : styles.pickerPicked}
                    selectedValue={availabilite}
                    dropdownIconColor={Grays.gray_0}
                    onValueChange={(itemValue, itemIndex) =>
                      setAvailabilite(itemValue)
                    }>
                    <Picker.Item label="Choose one" value="none" />
                    <Picker.Item label="Not available" value="na" />
                    <Picker.Item label="Part-time" value="parttime" />
                    <Picker.Item label="Full-time" value="fulltime" />
                  </Picker>
                </View>
              </>
            )
            : null
          }

          <Text style={styles.inputTitle}>Province</Text>
          <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
            <Picker
              style={province === 'none' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={province}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) => {
                setProvince(itemValue);
                console.log(itemValue);
                setWardList([]);
                setDistrict('none');
                setWard('none');
                let lmeo = switchProvince(itemValue);
                if(lmeo == undefined) setDistrictList([]);
                else setDistrictList(lmeo.district);
              }}>
              <Picker.Item label="Choose one" value="none" />
              {
                prv.map((element: any, index: any) => (
                  <Picker.Item key={index} label={element.city} value={element.code} /> 
                ))
              }
            </Picker>
          </View>
          <Text style={styles.inputTitle}>District</Text>
          <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
            <Picker
              style={district === 'none' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={district}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) => {
                setDistrict(itemValue);
                setWardList([]);
                setWard('none');
                let res = districtList.find(element => element.name == itemValue);
                if (res == undefined) setWardList([]);
                else setWardList(res?.ward);
              }}>
              <Picker.Item label="Choose one" value="none" />
              {
                districtList.length !== 0
                ? districtList.map((item: any, index: any) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
                ))
                : null
              }
            </Picker>
          </View>
          <Text style={styles.inputTitle}>Ward</Text>
          <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
            <Picker
              style={ward === 'none' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={gender}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) =>
                setWard(itemValue)
              }>
              <Picker.Item label="Choose one" value="none" />
              {
                wardList.length !== 0
                ? wardList.map((item: any, index: any) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
                ))
                : null
              }
            </Picker>
          </View>
          <Text style={styles.inputTitle}>Home address</Text>
          <View style={[styles.inputArea, {borderColor: inputBorderAddr == true ? Blues.blue_2 : Grays.gray_2 }]}>
            <TextInput 
              style={styles.textInput}
              placeholder= "123 Name street" 
              placeholderTextColor = {Grays.gray_0}
              autoCapitalize='words'
              value={homeAdd}
              onChangeText={setHomeAdd}
              onFocus={() => setInputBorderAddr(true)}
              onBlur={() => setInputBorderAddr(false)}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, {marginBottom: 50}]}
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

export const styles = StyleSheet.create({
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
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Grays.gray_button
  },
  pickerNone: {
    flex: 1, 
    color: Grays.gray_0
  },
  pickerPicked: {
    flex: 1,
    color: 'white'
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