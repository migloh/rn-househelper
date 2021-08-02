import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AdminRoute, AvailableUserDetailProps} from '../../Routes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Blues, Grays, inBlack} from '../../Colors';
import firestore from '@react-native-firebase/firestore';
import {toDate, ratingType} from '../Profile';
import Modal from 'react-native-modal';
import ModalDescription from './ModalDescription';
import ModalProfile from './ModalProfile';
import {boshi} from '../UserDetail';

export const InfoCard = ({title, detail, style}: any) => (
  <View style={{...style}}>
    <Text style={styles.selfIntroTitle}>{title}</Text>
    <Text style={[styles.basicDetail, {fontSize: 20}]}>{detail}</Text>
  </View>
);

export default function AvailableuserDetail({
  route,
  navigation,
}: AvailableUserDetailProps) {
  const [star, setStar] = useState<string | number>('');
  const [availabilite, setAvailabilite] = useState<string>('');
  const [desModal, setDesModal] = useState<boolean>(false);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  var passData = route.params.data;
  var passAddr = passData.address;
  var guessID: string = route.params.id;
  var guessName: string = passData.lastName + ' ' + passData.firstName;
  var guessRole: string = passData.role;
  var guessGender: string =
    passData.gender.charAt(0).toUpperCase() + passData.gender.slice(1);
  var guessDate: Date = toDate(passData.dob.seconds);
  var guessDescription: string = passData.description;
  var guessDob: string =
    guessDate.getDate() +
    '/' +
    (guessDate.getMonth() + 1) +
    '/' +
    guessDate.getFullYear();
  var guessPhone: string = passData.pnumber;
  var guessMail: string = passData.email;
  var guessAddr: string =
    passAddr.homeNumber +
    ', ' +
    passAddr.ward +
    ', ' +
    passAddr.district +
    ', ' +
    passAddr.province;
  useEffect(() => {
    const fetchEmployee = async () => {
      var employeeRef = firestore().collection('employees1').doc(guessID);
      var employeeInfo = await employeeRef.get();
      if (!employeeInfo.exists) {
        console.log('Ne trouve pas les informations');
      } else {
        let res = employeeInfo.data();
        if (res !== undefined) {
          setAvailabilite(res.availability);
        }
      }
    };
    fetchEmployee();
  }, []);
  useEffect(() => {
    const getRating = async () => {
      try {
        var ratingRef = firestore()
          .collection('employees1')
          .doc(guessID)
          .collection('rating');
        var rateTotal = await ratingRef.get();
        if (rateTotal.empty) setStar('N/A');
        else {
          var boshiArray: Array<number> = [];
          rateTotal.forEach(doc => {
            boshiArray.push(doc.data()?.rating);
            console.log(doc.data());
          });
          setStar(boshi(boshiArray));
        }
      } catch (error) {
        console.log('gerRating Error: ', error.message);
      }
    };
    getRating();
  }, []);

  const deleteAccount = async () => {
    try {
      await firestore().collection('user1').doc(guessID).delete();
      navigation.popToTop();
    } catch (error) {
      console.log('Delete account error: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </View>
      <View style={styles.lowerSpace}>
        <ScrollView style={styles.scrollableContent}>
          <View style={styles.overallInfo}>
            <Image
              source={require('../../../assets/images/userimg.png')}
              style={styles.userImage}
            />
            <View style={styles.infoCol}>
              <Text style={[styles.headerTitle, {fontSize: 30}]}>
                {guessName}
              </Text>
              <View style={styles.userStatusBorder}>
                <Text style={styles.userRole}>{guessRole}</Text>
              </View>
            </View>
          </View>
          {guessRole == 'Employee' ? (
            <View style={styles.outterBasicInfo}>
              <View style={styles.basicInfo}>
                <Text style={styles.basicTitle}>Average Rating</Text>
                <Text style={styles.basicDetail}>
                  {star}
                  {typeof star == 'number' ? '/5' : null}
                </Text>
              </View>
              <View style={styles.basicInfo}>
                <Text style={styles.basicTitle}>Availability</Text>
                <Text style={styles.basicDetail}>{availabilite}</Text>
              </View>
            </View>
          ) : null}
          <View style={styles.selfIntro}>
            <Text style={styles.selfIntroTitle}>Self Introduction</Text>
            <Text style={styles.selfIntroContent}>
              {guessDescription == '' ? 'Nothing to display' : guessDescription}
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => setDesModal(!desModal)}>
              <Text style={styles.cardTextButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.selfIntro, {marginBottom: 30}]}>
            <View style={{flexDirection: 'row'}}>
              <InfoCard
                style={styles.infoCard}
                title="Sex"
                detail={guessGender}
              />
              <View style={{width: '40%', height: 'auto'}} />
              <InfoCard
                style={styles.infoCard}
                title="Date of Birth"
                detail={guessDob}
              />
            </View>
            <InfoCard
              style={styles.infoCard}
              title="Phone Number"
              detail={guessPhone}
            />
            <InfoCard
              style={styles.infoCard}
              title="Email"
              detail={guessMail}
            />
            <InfoCard
              style={styles.infoCard}
              title="Address"
              detail={guessAddr}
            />
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => setDetailModal(!detailModal)}>
              <Text style={styles.cardTextButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              {marginBottom: '17%', backgroundColor: '#CC3300'},
            ]}
            onPress={() => deleteAccount()}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{margin: 0}}
        isVisible={detailModal}>
        <View style={styles.container}>
          <View style={styles.upperBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setDetailModal(!detailModal)}>
              <FontAwesomeIcon icon={faChevronLeft} color="white" size={20} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Personal</Text>
          </View>
          <ModalProfile uID={guessID} data={passData} />
        </View>
      </Modal>
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{margin: 0}}
        coverScreen={true}
        isVisible={desModal}>
        <View style={styles.container}>
          <View style={styles.upperBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setDesModal(!desModal)}>
              <FontAwesomeIcon icon={faChevronLeft} color="white" size={20} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Description</Text>
          </View>
          <ModalDescription uID={guessID} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  upperBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
    color: 'white',
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
    marginRight: 20,
  },
  infoCol: {
    alignItems: 'flex-start',
  },
  userRole: {
    color: 'white',
    fontWeight: 'bold',
  },
  userStatusBorder: {
    borderWidth: 2,
    borderColor: Blues.blue_1,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: 85,
    height: 35,
    borderRadius: 10,
    backgroundColor: inBlack.black_2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
  },
  outterBasicInfo: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  basicInfo: {
    width: '45%',
    height: 'auto',
    backgroundColor: inBlack.black_2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 10,
  },
  basicTitle: {
    fontSize: 18,
    color: Grays.gray_1,
  },
  basicDetail: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  selfIntro: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 15,
    backgroundColor: inBlack.black_2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  selfIntroTitle: {
    color: Grays.gray_1,
    fontSize: 18,
  },
  selfIntroContent: {
    color: 'white',
    fontSize: 16,
  },
  infoCard: {
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: inBlack.black_0,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  cardTextButton: {
    fontWeight: 'bold',
    color: 'white',
  },
  ratingMoguessDate: {
    backgroundColor: Grays.gray_4,
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  inRatingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
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
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Blues.blue_1,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
