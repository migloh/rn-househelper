import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  StatusBar
} from 'react-native'
import axios, { AxiosProxyConfig } from 'axios';
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
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_GEO, baseUrl, hostUrl } from '../notgood/geocodingAPI';
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

type CoordinateType = {
  lat: number,
  lng: number
};

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
  const [role, setRole] = useState<string>('');
  const [gender, setGender] = useState<string>('none');
  const [availabilite, setAvailabilite] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [districtList, setDistrictList] = useState<districtType>([]);
  const [district, setDistrict] = useState<string>('');
  const [wardList, setWardList] = useState<wardType>([]);
  const [ward, setWard] = useState<string>('');
  const [homeAdd, setHomeAdd] = useState<string>('');
  const [queryStt, setQueryStt] = useState<boolean>(false);
  const [addCoor, setAddCoor] = useState<CoordinateType|undefined>();
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const prv = require('../assets/vietnam_dataset/Index.json');

  const mailCond = /^[a-zA-Z0-9\._]{3,50}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,1}$/;

  var fullAdd: string = homeAdd + ', ' + ward + ', ' + district + ', ' + province;

  const queryCoor = async ( adrs: string ) => { 
    const dataInput: AxiosProxyConfig = {
      method: 'GET',
      url: baseUrl,
      params: {address: adrs},
      headers: {
        'x-rapidapi-key': API_GEO,
        'x-rapidapi-host': hostUrl
      }
    };

    await axios.request(dataInput).then(function (response: any) {
      console.log(JSON.stringify(response.data));
      setAddCoor(response.data.results[0].geometry.location)
      setQueryStt(true);
      setLoading(false);
      Alert.alert('Query done', 'Query success!');
    }).catch(function (error: any) {
      setLoading(false);
      Alert.alert('Error', error);
      console.error(error);
    });
  }

  const __doCreateUser = async (
    lmail: string, 
    password: string, 
    lame: string, 
    sex: string, 
    born: Date, 
    pnum: string, 
    rooru: string,
    avail: string,
    prov: string,
    dist: string,
    ward: string,
    addh: string,
    // lati: number,
    // longi: number
    coor: CoordinateType|undefined
    ) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        lmail,
        password
      )
      if (response && response.user) {
        Alert.alert("Success", "Account created successfully");
        console.log(JSON.stringify(response.user.uid));
        var userID: string = response.user.uid;
        firestore().collection('users').doc(userID).set({
          fname: lame,
          gender: sex,
          dob: born,
          pnumber: pnum,
          email: lmail,
          role: rooru,
          description: '',
          address: [
           {
             addName: {
               province: prov,
               district: dist,
               ward: ward,
               homeNumber: addh
             },
             homeCoor: coor           
           } 
          ]
        })
        .then(() => console.log('ok created'))
        if(rooru === 'Employee') {
          firestore().collection('employees').doc(userID).set({
            availability: avail,
            rating: []
          })
        }
        setLoading(false);
        navigation.navigate(AuthRoutes.Login);
      }
    } catch (e) {
      // console.error(e.message);
      Alert.alert("Failed", e.message)
    }
  }

  const onClickSignUp = () =>  {
    setLoadingButton(true);
    if (role === 'Employee' && availabilite === '') Alert.alert('Warning!', 'Please check your availability!');
    else if (queryStt === false) Alert.alert('Warning!', 'Please query your address first!');
    else if(
      fname === '' || 
      gender === '' || 
      phone === '' || 
      mail === '' || 
      pass === '' || 
      role === '' || 
      province === '' || 
      district === '' || 
      ward === '' || 
      homeAdd === ''
    ) Alert.alert("Warning", "Empty string")
    else __doCreateUser(mail, pass, fname, gender, dob, phone, role, availabilite, province, district, ward, homeAdd, addCoor);
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
          {/* <Text style={{color: Grays.gray_0}}>Sign up with one of following options</Text>
          <View style={styles.signinOptions}>
            <TouchableOpacity style={styles.signinOptionButton}>
              <FontAwesome5 name={'google'} size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signinOptionButton}>
              <FontAwesome5 name={'apple'} size={24} color="white" />
            </TouchableOpacity>
          </View> */}
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
              style={gender === '' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={gender}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) =>
                setGender(itemValue)
              }>
              <Picker.Item label="Choose one" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          <Text style={styles.inputTitle}>Date of birth</Text>
          <View style={[styles.inputArea, {justifyContent: 'flex-start'}]}>
            <TouchableOpacity
              onPress={() => {setShowDateModal(true)}}
            > 
              <Text style={[styles.textInput, {marginLeft: 10}]}>{JSON.stringify(dob).slice(1, 11)}</Text>
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
              style={role === '' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={role}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) =>
                setRole(itemValue)
              }>
              <Picker.Item label="Choose one" value="" />
              <Picker.Item label="Employee" value="Employee" />
              <Picker.Item label="Employer" value="Employer" />
            </Picker>
          </View>
          {
            role === 'Employee'
            ? (
              <>
                <Text style={styles.inputTitle}>Availability</Text>
                <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
                  <Picker
                    style={availabilite === '' ? styles.pickerNone : styles.pickerPicked}
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
              onValueChange={(itemValue: any, itemIndex) => {
                setProvince(itemValue.city);
                console.log(itemValue.code);
                setWardList([]);
                setDistrict('');
                setWard('');
                let lmeo = switchProvince(itemValue.code);
                if(lmeo == undefined) setDistrictList([]);
                else setDistrictList(lmeo.district);
              }}>
              <Picker.Item label="Choose one" value="" />
              {
                prv.map((element: any, index: any) => (
                  <Picker.Item key={index} label={element.city} value={element} /> 
                ))
              }
            </Picker>
          </View>
          <Text style={styles.inputTitle}>District</Text>
          <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
            <Picker
              style={district === '' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={district}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) => {
                setDistrict(itemValue);
                setWardList([]);
                setWard('');
                let res = districtList.find(element => element.name == itemValue);
                if (res == undefined) setWardList([]);
                else setWardList(res?.ward);
              }}>
              <Picker.Item label="Choose one" value="" />
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
              style={ward === '' ? styles.pickerNone : styles.pickerPicked}
              selectedValue={gender}
              dropdownIconColor={Grays.gray_0}
              onValueChange={(itemValue, itemIndex) =>
                setWard(itemValue)
              }>
              <Picker.Item label="Choose one" value="" />
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
              style={[styles.textInput, {marginLeft: 20}]}
              placeholder= "123 Name street" 
              placeholderTextColor = {Grays.gray_0}
              autoCapitalize='words'
              value={homeAdd}
              onChangeText={(kotoba) => {
                setHomeAdd(kotoba);
                // if (kotoba !== '') setQueryStt(false)
                // else setQueryStt(true); 
              }}
              onFocus={() => setInputBorderAddr(true)}
              onBlur={() => setInputBorderAddr(false)}
            />
            <TouchableOpacity
              disabled={loading}
              style={{padding: 10, marginRight: 20}}
              onPress={() => {
                setLoading(true);
                queryCoor(fullAdd);
              }}
            > 
              <FontAwesome5 name={'search'} size={24} color={Blues.blue_1} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, {marginBottom: 50}]}
            onPress={() => onClickSignUp()}
          >
          { 
            loading 
            ? <ActivityIndicator size='small' color={Blues.blue_0} />
            : <Text style={styles.buttonText}>Create Account</Text>
          }
          </TouchableOpacity>
        </ScrollView>
      </View>
       <Modal isVisible={loading}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large' color={Blues.blue_2} />
        </View>
      </Modal>
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
    justifyContent: 'space-around',
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
