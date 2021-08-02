import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {switchProvince} from '../../../assets/vietnam_dataset/province';
import {toDate} from '../../../notgood/FonctionsUtiles';
import {Blues, inBlack, Grays} from '../../Colors';
import {API_GEO, baseUrl, hostUrl} from '../../../notgood/geocodingAPI';
import {districtType, wardType, styles} from '../../Signup';
import {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import axios, {AxiosProxyConfig} from 'axios';
import Modal from 'react-native-modal';
import {CoordinateType} from '../../Signup';

type dataType = {
  uID: string;
  data: FirebaseFirestoreTypes.DocumentData | undefined;
};

export default function EditProfile({uID, data}: dataType) {
  const [fName, setFname] = useState<string>(data?.firstName);
  const [lName, setLName] = useState<string>(data?.lastName);
  const [phone, setPhone] = useState<string>(data?.pnumber);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [dob, setDob] = useState<Date>(toDate(data?.dob.seconds));
  const [inputBorderFName, setinputBorderFName] = useState<boolean>(false);
  const [inputBorderLName, setinputBorderLName] = useState<boolean>(false);
  const [inputBorderPhone, setInputBorderPhone] = useState<boolean>(false);
  const [inputBorderAddr, setInputBorderAddr] = useState<boolean>(false);
  const [gender, setGender] = useState<string>(data?.gender);
  const [province, setProvince] = useState<string>(data?.address.province);
  const [districtList, setDistrictList] = useState<districtType>([]);
  const [district, setDistrict] = useState<string>(data?.address.district);
  const [wardList, setWardList] = useState<wardType>([]);
  const [ward, setWard] = useState<string>(data?.address.ward);
  const [homeAdd, setHomeAdd] = useState<string>(data?.address.homeNumber);
  const [addCoor, setAddCoor] = useState<CoordinateType | undefined>();
  const [queryStt, setQueryStt] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  var fullAdd: string =
    homeAdd + ', ' + ward + ', ' + district + ', ' + province;
  const prv = require('../../../assets/vietnam_dataset/Index.json');
  const queryCoor = async (adrs: string) => {
    const dataInput: AxiosProxyConfig = {
      method: 'GET',
      url: baseUrl,
      params: {address: adrs},
      headers: {
        'x-rapidapi-key': API_GEO,
        'x-rapidapi-host': hostUrl,
      },
    };

    await axios
      .request(dataInput)
      .then(function (response: any) {
        console.log(JSON.stringify(response.data));
        setAddCoor(response.data.results[0].geometry.location);
        setQueryStt(true);
        setLoading(false);
        Alert.alert('Query done', 'Query success!');
      })
      .catch(function (error: any) {
        setLoading(false);
        Alert.alert('Error', error);
        console.error(error);
      });
  };

  const __doUpdateUser = async (
    fname: string,
    lname: string,
    sex: string,
    born: Date,
    pnum: string,
    prov: string,
    dist: string,
    ward: string,
    addh: string,
    coor: CoordinateType | undefined,
  ) => {
    try {
      await firestore()
        .collection('users1')
        .doc(uID)
        .update({
          firstName: fname,
          lastName: lname,
          gender: sex,
          dob: born,
          pnumber: pnum,
          description: '',
          address: {
            province: prov,
            district: dist,
            ward: ward,
            homeNumber: addh,
            homeCoor: coor,
          },
        });
      setLoading(false);
      Alert.alert('Success', 'User infomation updated!');
    } catch (e) {
      // console.error(e.message);
      Alert.alert('Failed', e.message);
    }
  };

  const onClickUpdate = () => {
    setLoading(true);
    if (queryStt === false)
      Alert.alert('Warning!', 'Please query your address first!');
    else if (
      fName === '' ||
      lName === '' ||
      gender === '' ||
      phone === '' ||
      province === '' ||
      district === '' ||
      ward === '' ||
      homeAdd === ''
    )
      Alert.alert('Warning', 'Empty string');
    else
      __doUpdateUser(
        fName,
        lName,
        gender,
        dob,
        phone,
        province,
        district,
        ward,
        homeAdd,
        addCoor,
      );
  };

  return (
    <View style={[styles.container, {paddingHorizontal: 15}]}>
      <ScrollView style={styles.scrollableContent}>
        <Text style={styles.inputTitle}>First name</Text>
        <View
          style={[
            styles.inputArea,
            {
              borderColor:
                inputBorderFName == true ? Blues.blue_2 : Grays.gray_2,
            },
          ]}>
          <TextInput
            style={styles.textInput}
            placeholder="Full name"
            onFocus={() => setinputBorderFName(true)}
            onBlur={() => setinputBorderFName(false)}
            placeholderTextColor={Grays.gray_0}
            autoCapitalize="words"
            value={fName}
            onChangeText={setFname}
          />
        </View>
        <Text style={styles.inputTitle}>Name</Text>
        <View
          style={[
            styles.inputArea,
            {
              borderColor:
                inputBorderLName == true ? Blues.blue_2 : Grays.gray_2,
            },
          ]}>
          <TextInput
            style={styles.textInput}
            placeholder="Full name"
            onFocus={() => setinputBorderLName(true)}
            onBlur={() => setinputBorderLName(false)}
            placeholderTextColor={Grays.gray_0}
            autoCapitalize="words"
            value={lName}
            onChangeText={setLName}
          />
        </View>
        <Text style={styles.inputTitle}>Gender</Text>
        <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
          <Picker
            style={gender === '' ? styles.pickerNone : styles.pickerPicked}
            selectedValue={gender}
            dropdownIconColor={Grays.gray_0}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
            <Picker.Item label="No change" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        <Text style={styles.inputTitle}>Date of birth</Text>
        <View style={[styles.inputArea, {justifyContent: 'flex-start'}]}>
          <TouchableOpacity
            onPress={() => {
              setShowDateModal(true);
            }}>
            <Text style={[styles.textInput, {marginLeft: 10}]}>
              {JSON.stringify(dob).slice(1, 11)}
            </Text>
          </TouchableOpacity>
          {showDateModal && (
            <DateTimePicker
              testID="dateTimePicker"
              maximumDate={new Date()}
              value={dob}
              mode="date"
              display="spinner"
              onChange={(event: Event, dal: Date | undefined) => {
                if (dal !== undefined) {
                  setDob(dal);
                  console.log(dal);
                  setShowDateModal(false);
                }
              }}
            />
          )}
        </View>
        <Text style={styles.inputTitle}>Phone number</Text>
        <View
          style={[
            styles.inputArea,
            {
              borderColor:
                inputBorderPhone == true ? Blues.blue_2 : Grays.gray_2,
            },
          ]}>
          <TextInput
            style={styles.textInput}
            placeholder="0123456789"
            onFocus={() => setInputBorderPhone(true)}
            onBlur={() => setInputBorderPhone(false)}
            placeholderTextColor={Grays.gray_0}
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <Text style={styles.inputTitle}>Province</Text>
        <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
          <Picker
            style={province === '' ? styles.pickerNone : styles.pickerPicked}
            selectedValue={province}
            dropdownIconColor={Grays.gray_0}
            onValueChange={(itemValue, itemIndex) => {
              setProvince(itemValue);
              console.log(itemValue);
              setWardList([]);
              setDistrict('');
              setWard('');
              let lmeo = switchProvince(itemValue);
              if (lmeo == undefined) setDistrictList([]);
              else setDistrictList(lmeo.district);
            }}>
            <Picker.Item label="No change" value="" />
            {prv.map((element: any, index: any) => (
              <Picker.Item
                key={index}
                label={element.city}
                value={element.code}
              />
            ))}
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
            <Picker.Item label="No change" value="" />
            {districtList.length !== 0
              ? districtList.map((item: any, index: any) => (
                  <Picker.Item
                    key={index}
                    label={item.name}
                    value={item.name}
                  />
                ))
              : null}
          </Picker>
        </View>
        <Text style={styles.inputTitle}>Ward</Text>
        <View style={[styles.inputArea, {paddingHorizontal: 0}]}>
          <Picker
            style={ward === '' ? styles.pickerNone : styles.pickerPicked}
            selectedValue={gender}
            dropdownIconColor={Grays.gray_0}
            onValueChange={(itemValue, itemIndex) => setWard(itemValue)}>
            <Picker.Item label="No change" value="" />
            {wardList.length !== 0
              ? wardList.map((item: any, index: any) => (
                  <Picker.Item
                    key={index}
                    label={item.name}
                    value={item.name}
                  />
                ))
              : null}
          </Picker>
        </View>
        <Text style={styles.inputTitle}>Home address</Text>
        <View
          style={[
            styles.inputArea,
            {
              borderColor:
                inputBorderAddr == true ? Blues.blue_2 : Grays.gray_2,
            },
          ]}>
          <TextInput
            style={[styles.textInput, {marginLeft: 20}]}
            placeholder="123 Name street"
            placeholderTextColor={Grays.gray_0}
            autoCapitalize="words"
            value={homeAdd}
            onChangeText={setHomeAdd}
            onFocus={() => setInputBorderAddr(true)}
            onBlur={() => setInputBorderAddr(false)}
          />
          <TouchableOpacity
            disabled={loading}
            style={{padding: 10, marginRight: 20}}
            onPress={() => {
              setLoading(true);
              queryCoor(fullAdd);
            }}>
            <FontAwesome5 name={'search'} size={24} color={Blues.blue_1} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, {marginBottom: 50}]}
          onPress={() => onClickUpdate()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal isVisible={loading}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Blues.blue_2} />
        </View>
      </Modal>
    </View>
  );
}
