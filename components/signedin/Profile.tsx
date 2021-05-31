import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  StatusBar,
  StyleSheet,
  ScrollView
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {HomeProps, Routes} from '../Routes';
import {Blues, Grays, inBlack} from '../Colors';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faChevronLeft, faAppleAlt} from '@fortawesome/free-solid-svg-icons'
import { API_GEO, baseUrl, hostUrl } from '../../notgood/geocodingAPI';
import {AuthContext} from '../../App';


export default function Profile({route, navigation}: HomeProps) {
  const { globalDispatch } = React.useContext(AuthContext);
  // const [stt, setStt] = useState<boolean>(false);  const [addObj, setAddObj] = useState<object>({});
  // const addQuery = async ( adrs: string ) => { 
  //   const dataInput = {
  //     method: 'GET',
  //     url: baseUrl,
  //     params: {address: adrs},
  //     headers: {
  //       'x-rapidapi-key': API_GEO,
  //       'x-rapidapi-host': hostUrl
  //     }
  //   };

  //   await axios.request(dataInput).then(function (response: any) {
  //     console.log(JSON.stringify(response.data));
  //     setAddObj(response.data);
  //     setStt(true);
  //   }).catch(function (error: any) {
  //     console.error(error);
  //   });
  // }
  const lorem: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const __doSignOut = async () => {
    try{
        let response = await auth()
          .signOut()
          .then(() => Alert.alert("Success", "Signed out"));
          if(globalDispatch)
            globalDispatch({type: 'SIGN_OUT'});
        // navigation.navigate(Routes.Welcome);
    } catch (e){
      console.error(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View style={styles.upperBar}>
        <Text style={styles.headerTitle}>My Account</Text>
      </View>
      <View style={styles.lowerSpace}>
        <ScrollView style={styles.scrollableContent}>
          <View style={styles.overallInfo}>
            <Image
              source={require('../../assets/images/misaka.png')}
              style={styles.userImage}
            />
            <View style={styles.infoCol}>
              <Text style={[styles.headerTitle, {fontSize: 30}]}>Misaka Mikoto</Text>
              <View style={styles.userStatusBorder}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>EMPLOYER</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoField}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Display Name</Text>
              <View style={styles.innerCard}>
                <Text style={styles.infoCard}>Misaka Mikoto</Text>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardTextButton}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Email</Text>
              <View style={styles.innerCard}>
                <Text style={styles.infoCard}>misaka@index.com</Text>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardTextButton}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Password</Text>
              <View style={styles.innerCard}>
                <Text style={styles.infoCard}>*********</Text>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardTextButton}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.infoField}>
            <View style={[styles.cardInfo, {alignItems: 'flex-start'}]}>
              <Text style={styles.cardTitle}>Job description</Text>
              <View>
                <Text style={styles.descriptionText}>{lorem}</Text>
              </View>
              <TouchableOpacity
                style={[styles.cardButton, {marginTop: 10}]}
              >
                <Text style={styles.cardTextButton}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.button, {marginBottom: "17%"}]}
            onPress={() => __doSignOut()}
          >
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

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
    paddingTop: 30,
  },
  overallInfo: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30
  },
  userImage: {
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    marginRight: 20
  },
  infoCol: {
    alignItems: 'flex-start'
  },
  userStatusBorder: {
    borderWidth: 2, 
    borderColor: Blues.blue_1, 
    borderRadius: 10, 
    paddingVertical: 2, 
    paddingHorizontal: 5, 
    alignItems: 'center', 
    marginTop: 5
  },
  infoField: {
    backgroundColor: inBlack.black_2, 
    width: '100%', 
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20
  },
  cardInfo: {
    marginVertical: 7
  },
  cardTitle: {
    color: Grays.gray_1
  },
  innerCard: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  infoCard: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 20
  },
  cardButton: {
    backgroundColor: inBlack.black_0, 
    paddingVertical: 7, 
    paddingHorizontal: 15, 
    borderRadius: 10
  },
  cardTextButton: {
    fontWeight: 'bold',
    color: 'white'
  },
  descriptionText: {
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
});