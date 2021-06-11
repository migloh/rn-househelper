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
// import {HomeProps} from '../Routes';
import {Blues, Grays, inBlack} from '../Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faChevronLeft, faAppleAlt} from '@fortawesome/free-solid-svg-icons'
import EditProfile from './EditProfile';
import EditAccount from './EditAccount';
import Modal from 'react-native-modal';
import {AuthContext} from '../context';
import { InfoCard } from './UserDetail';

export const lorem: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function Profile() {
  const [modalProfile, setModalProfile] = useState<boolean>(false);
  const [modalSecurite, setModalSecurite] = useState<boolean>(false);
  const [modalDes, setModalDes] = useState<boolean>(false);
  const [inputBorder, setInputBorder] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const { signOut } = React.useContext(AuthContext);

  const __doSignOut = async () => {
    try{
        let response = await auth()
          .signOut()
          .then(() => signOut && signOut());
    } catch (e){
      console.log(e.message);
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
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.userStatusBorder}>
                  <Text style={styles.userRole}>EMPLOYER</Text>
                </View>
              </View>        
            </View>
          </View>
          <View style={[styles.selfIntro, {marginBottom: 30}]}>
            <View style={{flexDirection: 'row'}}>
              <InfoCard style={styles.infoCard} title="Sex" detail="Male" />
              <View style={{width: '40%', height: 'auto'}} />
              <InfoCard style={styles.infoCard} title="Date of Birth" detail="02/05/1994" />
            </View>
            <InfoCard style={styles.infoCard} title="Phone Number" detail="0981273645" />
            <InfoCard style={styles.infoCard} title="Email" detail="email@email.com" />
            <InfoCard style={styles.infoCard} title="Address" detail="18 Hoang Quoc Viet, Nghia Do, Cau Giay, Hanoi" />
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => setModalProfile(!modalProfile)}
            >
              <Text style={styles.cardTextButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoField}>
            <Text style={styles.infoCard}>Account settings</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => setModalSecurite(!modalSecurite)}
            >
              <Text style={styles.cardTextButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoField}>
            <View style={[styles.cardInfo, {alignItems: 'flex-start'}]}>
              <Text style={styles.cardTitle}>Job description</Text>
              <View>
                <Text style={styles.descriptionText}>
                  {description == '' 
                    ? 'Add description...' 
                    : description
                  }
                </Text>
              </View>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => setModalDes(!modalDes)}
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
      <Modal
        animationIn='fadeInUp'
        animationOut='fadeOutDown'
        style={{margin: 0}}
        isVisible={modalProfile}>
        <View style={styles.container}>
          <View style={styles.upperBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModalProfile(!modalProfile)}
            >
              <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Personal</Text>
          </View>
          <EditProfile />
        </View>
      </Modal>
      <Modal
        animationIn='fadeInUp'
        animationOut='fadeOutDown'
        style={{margin: 0}}
        coverScreen={true}
        isVisible={modalSecurite}>
        <View style={styles.container}>
          <View style={styles.upperBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModalSecurite(!modalSecurite)}
            >
              <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account</Text>
          </View>
          <EditAccount />
        </View>
      </Modal>
      <Modal
        animationIn='fadeInUp'
        animationOut='fadeOutDown'
        style={{margin: 0}}
        coverScreen={true}
        isVisible={modalDes}>
        <View style={styles.container}>
          <View style={styles.upperBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModalDes(!modalDes)}
            >
              <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account</Text>
          </View>
          <View style={[styles.container, {paddingHorizontal: 15}]}>
            <Text style={styles.inputTitle}>Edit description</Text>
            <View style={[styles.inputArea, {borderColor: inputBorder == true ? Blues.blue_2 : Grays.gray_2, height: 'auto' }]}>
              <TextInput 
                style={styles.textInput}
                placeholder= "Your description..." 
                placeholderTextColor = {Grays.gray_0}
                value={description}
                multiline={true}
                onChangeText={setDescription}
                onFocus={() => setInputBorder(true)}
                onBlur={() => setInputBorder(false)}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalDes(!modalDes)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingTop: 20,
  },
  overallInfo: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20
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
  userRole: {
    color: 'white', 
    fontWeight: 'bold'
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
    color: Grays.gray_1,
    fontSize: 15
  },
  innerCard: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  infoCard: {
    marginBottom: 10
  },
  cardButton: {
    backgroundColor: inBlack.black_0, 
    paddingVertical: 7, 
    paddingHorizontal: 15, 
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  cardTextButton: {
    fontWeight: 'bold',
    color: 'white'
  },
  descriptionText: {
    color: 'white',
    fontSize: 16
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
  selfIntro: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 15,
    backgroundColor: inBlack.black_2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30
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
});