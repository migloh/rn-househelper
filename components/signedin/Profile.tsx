import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Blues, Grays, inBlack} from '../Colors';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import EditProfile from './EditProfile';
import EditAccount from './EditAccount';
import EditAvailability from './EditAvailability';
import EditDescription from './EditDescription';
import Modal from 'react-native-modal';
import {AuthContext} from '../context';
import { InfoCard } from './UserDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const lorem: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export type ratingType = Array<{
  raterName: string,
  rating: number
}>; 

export const toDate = (byou: number) => {
  let time = new Date(1970, 0, 1);
  time.setSeconds(byou);
  return time;
};

export default function Profile() {
  const [uName, setUName] = useState<string>('');
  const [uRole, setURole] = useState<string>('');
  const [uGender, setUGender] = useState<string>('');
  const [uDob, setUDob] = useState<string>('');
  const [uPhone, setUPhone] = useState<string>('');
  const [uMail, setUMail] = useState<string>('');
  const [uDress, setUDress] = useState<string>('');
  const [star, setStar] = useState<ratingType>();
  const [availabilite, setAvailabilite] = useState<string>('');
  const [modalProfile, setModalProfile] = useState<boolean>(false);
  const [modalSecurite, setModalSecurite] = useState<boolean>(false);
  const [modalAvail, setModalAvail] = useState<boolean>(false);
  const [modalDes, setModalDes] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [fullData, setFullData] = useState<FirebaseFirestoreTypes.DocumentData>();
  const { signOut } = React.useContext(AuthContext);
  const curUid: string|undefined = auth().currentUser?.uid;
  const userRef = firestore().collection('users1').doc(curUid);
  
  useEffect(() => {
    const fetchEmployee = async () => {
      var employeeRef = firestore().collection('employees').doc(curUid);
      var employeeInfo = await employeeRef.get();
      if (!employeeInfo.exists){
        console.log('Ne trouve pas les informations');
      } else {
        let res = employeeInfo.data();
        if(res !== undefined) {
          setStar(res.rating);
          console.log(res.rating);
          setAvailabilite(res.availability);
        }
      }
    };
    const fetchInfo = async () => {
      var lmeo = await userRef.get();
        if (!lmeo.exists){
          setLoading(false);
          console.log('aduma nogay gere');
        } else {
          // console.log('les doc: ', lmeo.data());
          let res = lmeo.data();
          if(res !== undefined){
            setLoading(false);
            setFullData(res);
            if(res.role === 'Employee') fetchEmployee();
            let fadd = res.address;
            let dal: Date = toDate(res.dob.seconds);
            setUName(res.fname);
            setURole(res.role.toUpperCase());
            setUGender(res.gender.charAt(0).toUpperCase() + res.gender.slice(1));
            setUDob(dal.getDate() + '/' + (dal.getMonth() + 1) + '/' + dal.getFullYear());
            setUPhone(res.pnumber);
            setUMail(res.email);
            setUDress(fadd.homeNumber + ', ' + fadd.ward + ', ' + fadd.district + ', ' + fadd.province);
            setDescription(res.description);
          }
        } 
      };
      fetchInfo();
  }, []);

  const __doSignOut = async () => {
    try{
        await AsyncStorage.clear();
        await auth()
          .signOut()
          .then(() => signOut && signOut());
    } catch (e){
      console.log('Async', e.message);
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
              <Text style={[styles.headerTitle, {fontSize: 30}]}>{uName}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.userStatusBorder}>
                  <Text style={styles.userRole}>{uRole}</Text>
                </View>
              </View>        
            </View>
          </View>
          {
            uRole === 'EMPLOYEE'
            ? (
              <View style={styles.outterBasicInfo}>
                <View style={styles.basicInfo}>
                  <Text style={styles.basicTitle}>Average Rating</Text>
                  <Text style={styles.basicDetail}>{
                    star?.length == 0 ? 'N/A'
                    : 'arimasu' 
                  }</Text>
                </View>
                <TouchableOpacity
                  style={styles.basicInfo}
                  onPress={() => setModalAvail(!modalAvail)}  
                 >
                  <Text style={styles.basicTitle}>Availability</Text>
                  <Text style={styles.basicDetail}>{availabilite}</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
          <View style={[styles.selfIntro, {marginBottom: 30}]}>
            <View style={{flexDirection: 'row'}}>
              <InfoCard style={styles.infoCard} title="Sex" detail={uGender} />
              <View style={{width: '40%', height: 'auto'}} />
              <InfoCard style={styles.infoCard} title="Date of Birth" detail={uDob} />
            </View>
            <InfoCard style={styles.infoCard} title="Phone Number" detail={uPhone} />
            <InfoCard style={styles.infoCard} title="Email" detail={uMail} />
            <InfoCard style={styles.infoCard} title="Address" detail={uDress} />
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => setModalProfile(!modalProfile)}
            >
              <Text style={styles.cardTextButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoField}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Account settings</Text>
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
          <EditProfile data={fullData}/>
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
            <Text style={styles.headerTitle}>Description</Text>
          </View>
          <EditDescription />
        </View>
      </Modal>
      <Modal
        animationIn='fadeInUp'
        animationOut='fadeOutDown'
        style={{margin: 0}}
        isVisible={modalAvail}>
        <View style={styles.container}>
          <View style={styles.upperBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModalAvail(!modalAvail)}
            >
              <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Availabiliy</Text>
          </View>
          <EditAvailability />
        </View>
      </Modal>
      <Modal 
        isVisible={loading}
        animationIn='fadeIn'
        animationOut='fadeOut'
       >
        <View>
          <ActivityIndicator size='large' color='blue'/>
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
  outterBasicInfo: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basicInfo: {
    width: '45%',
    height: 'auto',
    backgroundColor: inBlack.black_2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 10
  },
  basicTitle: {
    fontSize: 18,
    color: Grays.gray_1
  },
  basicDetail: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
});