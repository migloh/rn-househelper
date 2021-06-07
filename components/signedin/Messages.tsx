import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Dimensions } from 'react-native'; 
import {inBlack, Blues, Grays} from '../Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import Inbox from './Inbox'

const windowWidth : number = Dimensions.get('window').width;

const fakeMessage = [
  {
    id: '1',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    latest: 'New message un',
  },
  {
    id: '2',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    latest: 'new message deux',
  },
  {
    id: '3',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    latest: 'New message trois',
  },
  {
    id: '4',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    latest: 'New message trois',
  },
  {
    id: '5',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    latest: 'New message trois',
  },
  {
    id: '6',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    latest: 'New message trois',
  }
];

export default function Messages() {
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const renderUser = ({ item }: any) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={
        item == fakeMessage[0] 
        ? styles.userCardFirst 
        : item == fakeMessage[fakeMessage.length - 1] 
        ? styles.userCardLast 
        : styles.userCard
      }
      onPress={() => setMessageVisible(!messageVisible)}
    >
      <Image 
        source={require('../../assets/images/misaka.png')}
        style={styles.userImage}
      />
      <View style={styles.infoArea}>
        <Text style={styles.userName}>{item.fname}</Text>
        <Text style={styles.userPreview}>{item.latest}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View style={styles.upperBar}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <View style={[styles.lowerSpace, {paddingTop: 20}]}>
      <FlatList
        data={fakeMessage}
        renderItem={renderUser}
        keyExtractor={item => item.id}
      />
      </View>
      <Modal
          animationIn='fadeInUp'
          animationOut='fadeOutDown'
          style={{margin: 0}}
          coverScreen={true}
          isVisible={messageVisible}>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.upperBar}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setMessageVisible(!messageVisible)}
              >
                <FontAwesomeIcon icon={faChevronLeft} color="white" size={20}/>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Misaka</Text>
            </View>
            <Inbox />
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
  messageContainer:{
   width: windowWidth - 30,
   height: 'auto',
   backgroundColor: inBlack.black_2
  },
  userCard: {
    width: '100%',
    height: 'auto',
    paddingVertical: 10,
    backgroundColor: inBlack.black_2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCardFirst: {
    width: '100%',
    height: 'auto',
    paddingVertical: 10,
    backgroundColor: inBlack.black_2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCardLast: {
    width: '100%',
    height: 'auto',
    paddingVertical: 10,
    backgroundColor: inBlack.black_2,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginHorizontal: 15
  },
  infoArea: {
    flex: 1
  },
  userName: {
    color: 'white', 
    fontSize: 18, 
  },
  userPreview: {
    color: Grays.gray_1, 
    fontSize: 18
  },
});