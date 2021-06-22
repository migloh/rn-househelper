import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { UserRoute, UserDetailProps } from '../Routes';
import Inbox from './Inbox';
import { Blues, Grays, inBlack } from '../Colors';
import { lorem } from './Profile';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import {toDate, ratingType} from './Profile';
import auth from '@react-native-firebase/auth'; 
import { GetName, FaireID } from '../../notgood/FonctionsUtiles';
import AsyncStorage from '@react-native-async-storage/async-storage';

var currentUserId: string|undefined = auth().currentUser?.uid;

export const InfoCard = ({title, detail, style}: any) => (
  <View style={{...style}}>
    <Text style={styles.selfIntroTitle}>{title}</Text>
    <Text style={[styles.basicDetail, {fontSize: 20}]}>{detail}</Text>
  </View>
);


export default function UserDetail({route, navigation}: UserDetailProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [ratingModal, setRatingModal] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [star, setStar] = useState<ratingType>();
  const [availabilite, setAvailabilite] = useState<string>('');
  const [currentFName, setCurrentFName] = useState<string>();
  const [inboxID, setInboxID] = useState<string>();
  var passData = route.params.data;
  var passAddr = passData.address;
  var guessID: string = route.params.id; 
  var guessName: string = passData.fname;
  var guessRole : string= passData.role;
  var guessGender: string = passData.gender.charAt(0).toUpperCase() + passData.gender.slice(1);
  var guessDate: Date = toDate(passData.dob.seconds);
  var guessDescription: string = passData.description;
  var guessAge: number = new Date().getFullYear() -  guessDate.getFullYear();
  var guessPhone: string = passData.pnumber;
  var guessMail: string = passData.email;
  var guessAddr: string = passAddr.homeNumber + ', ' 
                              + passAddr.ward + ', ' 
                              + passAddr.district + ', ' 
                              + passAddr.province; 
  // console.log(JSON.stringify(passData));
  const ContactClick = async ( senderName: string|undefined, senderID: string|undefined, receiverName: string, receiverID: string ) => {
    let newMessageID: string = FaireID();
    setInboxID(newMessageID);
    try {
      var messageQuery = firestore().collection('users1').doc(currentUserId).collection('messages').doc(receiverID);
      var getQuery = await messageQuery.get()
      if (!getQuery.exists) {
        await messageQuery.set({
          msgID: newMessageID,
          lastestMessage: '',
          lastestDate: new Date(),
          receiver: {
            fname: receiverName,
            id: receiverID
          } 
        });
        await firestore().collection('users1').doc(receiverID).collection('messages').doc(currentUserId).set({
          msgID: newMessageID,
          lastestMessage: '',
          lastestDate: new Date(),
          receiver: {
            fname: senderName,
            id: senderID 
          } 
        })
      }
      else {
        setInboxID(getQuery.data()?.msgID);
      }
      setModalVisible(!modalVisible)
    } catch (e) {
      console.log('Message no koto: ', e.message);
    }
    };
  
  // useEffect(() => {
  //   const toConsole = async() => {
  //     var refSender = firestore()
  //       .collection('userMessages')
  //       .doc(currentUserId);
  //     var getSender = await refSender.get();
  //     if(!getSender.exists) {
  //       console.log('attention: ', getSender.exists)
  //     }
  //     else {
  //       console.log('Another attention: ', getSender.exists);
  //       console.log('les info: ', getSender.data());
  //     }
  //   }
  //   toConsole();
  // }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      var employeeRef = firestore().collection('employees1').doc(guessID);
      var employeeInfo = await employeeRef.get();
      if (!employeeInfo.exists){
        console.log('Ne trouve pas les informations');
      } else {
        let res = employeeInfo.data();
        if(res !== undefined) {
          setStar(res.rating);
          // console.log(res.rating);
          setAvailabilite(res.availability);
        }
      }
    };
    fetchEmployee();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userName');
        if(value !== null) {
          // value previously stored
          console.log(value);
          setCurrentFName(value);
        }
      } catch(e) {
        // error reading value
        console.log(e.message);
      }
    }
    getData();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.upperBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </View>
      <View style={styles.lowerSpace}>
        <ScrollView style={styles.scrollableContent}>
          <View style={styles.overallInfo}>
            <Image
              source={require('../../assets/images/misaka.png')}
              style={styles.userImage}
            />
            <View style={styles.infoCol}>
              <Text style={[styles.headerTitle, {fontSize: 30}]}>{guessName}</Text>
              <View style={styles.userStatusBorder}>
                <Text style={styles.userRole}>{guessRole}</Text>
              </View>
              <View style={styles.optionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => ContactClick(currentFName, currentUserId, guessName, guessID)}
                >
                  <Text style={styles.actionText}>Contact</Text>
                </TouchableOpacity>
                <View style={{width: 20, height: 'auto'}} />
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => setRatingModal(!ratingModal)}
                >
                  <Text style={styles.actionText}>Rate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {
            guessRole == 'Employee'
            ? (
              <View style={styles.outterBasicInfo}>
                <View style={styles.basicInfo}>
                  <Text style={styles.basicTitle}>Average Rating</Text>
                  <Text style={styles.basicDetail}>{
                    star?.length == 0 ? 'N/A'
                    : 'arimasu' 
                  }</Text>
                </View>
                <View style={styles.basicInfo}>
                  <Text style={styles.basicTitle}>Availability</Text>
                  <Text style={styles.basicDetail}>{availabilite}</Text>
                </View>
              </View>
            )
            : null
          }
          <View style={styles.selfIntro}>
            <Text style={styles.selfIntroTitle}>Self Introduction</Text>
            <Text style={styles.selfIntroContent}>{
              guessDescription == ''
              ? 'Nothing to display'
              : guessDescription
            }</Text>
          </View>
          <View style={[styles.selfIntro, {marginBottom: 30}]}>
            <View style={{flexDirection: 'row'}}>
              <InfoCard style={styles.infoCard} title="Sex" detail={guessGender} />
              <View style={{width: '40%', height: 'auto'}} />
              <InfoCard style={styles.infoCard} title="Age" detail={guessAge} />
            </View>
            <InfoCard style={styles.infoCard} title="Phone Number" detail={guessPhone} />
            <InfoCard style={styles.infoCard} title="Email" detail={guessMail} />
            <InfoCard style={styles.infoCard} title="Address" detail={guessAddr} />
          </View>
        </ScrollView>
        <Modal
          animationIn='fadeInUp'
          animationOut='fadeOutDown'
          style={{margin: 0}}
          isVisible={modalVisible}>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.upperBar}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{GetName(guessName)}</Text>
            </View>
            <Inbox iid={inboxID} />
          </View>
        </Modal>
        <Modal
          isVisible={ratingModal}
          style={{alignSelf: 'center'}}
          animationIn='fadeIn'
          animationOut='fadeOut'
        >
          <View style={styles.ratingModal}>
            <Text style={styles.inRatingText}>Your rating</Text>
            <AirbnbRating
              count={5}
              reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
              defaultRating={ratingValue}
              selectedColor={Blues.blue_1}
              reviewColor={Blues.blue_1}
              onFinishRating={(val) => setRatingValue(val)}
              size={30}
              starContainerStyle={{marginBottom: 40}}
              ratingContainerStyle={{marginTop: 30}}
            />
            <TouchableOpacity
              style={[styles.actionRating, {backgroundColor: Blues.blue_2}]}
              onPress={() => setRatingModal(!ratingModal)}
            >
              <Text style={styles.ratingText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionRating, {backgroundColor: inBlack.black_2}]}
              onPress={
                useCallback(() => {
                  setRatingModal(!ratingModal);
                  setRatingValue(0);
                }, [])
              }
            >
              <Text style={styles.ratingText}>Delete rating</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    flex: 1,
    paddingHorizontal: 20, 
  },
  scrollableContent: {
    paddingTop: 20,
  },
  overallInfo: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30,
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
    marginTop: 5,
    marginBottom: 10
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionButton: {
    width: 85,
    height: 35,
    borderRadius: 10,
    backgroundColor: inBlack.black_2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionText: {
    color: 'white',
    fontSize: 16
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
  selfIntroTitle: {
    color: Grays.gray_1,
    fontSize: 18
  },
  selfIntroContent: {
    color: 'white',
    fontSize: 16
  },
  infoCard: {
    marginBottom: 10
  },
  ratingModal: {
    backgroundColor: Grays.gray_4 , 
    alignItems: 'center', 
    borderRadius: 15, 
    paddingVertical: 30, 
    paddingHorizontal: 20
  },
  inRatingText: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 30
  },
  actionRating: {
    width: 250, 
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 20, 
    color: 'white',
    fontWeight: 'bold'
  }
});