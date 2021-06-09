import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {switchProvince} from '../../assets/vietnam_dataset/province';

import { Blues, inBlack, Grays } from '../Colors';
import { districtType, wardType, styles } from '../Signup';

export default function EditProfile() {
  const [mail, setMail] = useState<string>('');
  const [fname, setFname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [dob, setDob] = useState<Date>(new Date());
  const [inputBorderName, setinputBorderName] = useState<boolean>(false);
  const [inputBorderMail, setinputBorderMail] = useState<boolean>(false);
  const [inputBorderPhone, setInputBorderPhone] = useState<boolean>(false);
  const [inputBorderAddr, setInputBorderAddr] = useState<boolean>(false)
  const [gender, setGender] = useState<string>('none');
  const [province, setProvince] = useState<string>('none');
  const [districtList, setDistrictList] = useState<districtType>([]);
  const [district, setDistrict] = useState<string>('none');
  const [wardList, setWardList] = useState<wardType>([]);
  const [ward, setWard] = useState<string>('none');
  const [homeAdd, setHomeAdd] = useState<string>('');

  const prv = require('../../assets/vietnam_dataset/Index.json');
  const mailCond = /^[a-zA-Z0-9\._]{3,50}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,1}$/;

  return (
    <View style={[styles.container, {paddingHorizontal: 15}]}>
      <ScrollView style={styles.scrollableContent}>
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
            onPress={() => null}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
};