import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  // Modal,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { UserRoute, UserDetailProps } from '../Routes';
import Inbox from './Inbox';
import { Blues, Grays, inBlack } from '../Colors';
import { lorem } from './Profile';
import Modal from 'react-native-modal';

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
              <Text style={[styles.headerTitle, {fontSize: 30}]}>Misaka Mikoto</Text>
              <View style={styles.userStatusBorder}>
                <Text style={styles.userRole}>EMPLOYER</Text>
              </View>
              <View style={styles.optionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setModalVisible(!modalVisible)}
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
          <View style={styles.outterBasicInfo}>
            <View style={styles.basicInfo}>
              <Text style={styles.basicTitle}>Average Rating</Text>
              <Text style={styles.basicDetail}>4.5/5</Text>
            </View>
            <View style={styles.basicInfo}>
              <Text style={styles.basicTitle}>Availability</Text>
              <Text style={styles.basicDetail}>Part-time</Text>
            </View>
          </View>
          <View style={styles.selfIntro}>
            <Text style={styles.selfIntroTitle}>Self Introduction</Text>
            <Text style={styles.selfIntroContent}>{lorem}</Text>
          </View>
          <View style={[styles.selfIntro, {marginBottom: 30}]}>
            <View style={{flexDirection: 'row'}}>
              <InfoCard style={styles.infoCard} title="Sex" detail="Male" />
              <View style={{width: '40%', height: 'auto'}} />
              <InfoCard style={styles.infoCard} title="Age" detail="18" />
            </View>
            <InfoCard style={styles.infoCard} title="Phone Number" detail="0981273645" />
            <InfoCard style={styles.infoCard} title="Email" detail="email@email.com" />
            <InfoCard style={styles.infoCard} title="Address" detail="18 Hoang Quoc Viet, Nghia Do, Cau Giay, Hanoi" />
          </View>
        </ScrollView>
        <Modal
          animationIn='fadeInUp'
          animationOut='fadeOutDown'
          style={{margin: 0}}
          coverScreen={true}
          isVisible={modalVisible}>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.upperBar}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Misaka</Text>
              <Button title="BETA" onPress={() => setModalVisible(!modalVisible)} />
            </View>
            <Inbox />
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