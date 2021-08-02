import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {inBlack, Blues, Grays} from '../Colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import Inbox from './Inbox';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GetName} from '../../notgood/FonctionsUtiles';
import {responseType} from './UsersList';

var currentUid: string | undefined = auth().currentUser?.uid;

const windowWidth: number = Dimensions.get('window').width;

export default function Messages() {
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<any>();
  const [inboxID, setInboxID] = useState<string>();
  const [headerName, setHeaderName] = useState<string>('Chatting');
  useEffect(() => {
    // const getMessage = async () => {
    //   try{
    //     var returned = await firestore()
    //       .collection('userMessages')
    //       .doc(currentUid)
    //       .get();
    //     // console.log('BTCBTC: ', JSON.stringify(returned.data().messageList));
    //     if (returned.data() !== undefined) setMessageList(returned.data()?.messageList);
    //   } catch(e) {
    //     console.log(e.message);
    //   }
    // };
    // getMessage();
    // const subscriber = firestore()
    // .collection('userMessages')
    // .doc(currentUid)
    // .onSnapshot(documentSnapshot => {
    //   console.log('User data: ', JSON.stringify(documentSnapshot.data()));
    //   setMessageList(documentSnapshot.data()?.messageList);
    // });
    const subscriber = firestore()
      .collection('users1')
      .doc(currentUid)
      .collection('messages')
      .onSnapshot((docSnap: any) => {
        var temp: any = [];
        docSnap.forEach((element: any) => {
          let newData: any = {
            id: element.id,
            data: element.data(),
          };
          temp.push(newData);
        });
        console.log(temp);
        setMessageList(temp);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [currentUid]);
  const renderUser = ({item}: any) => {
    // var senderName: string = '';
    // var listVar: any = item.participants;
    // for (const property in listVar) {
    //   console.log(`${property}: ${listVar[property]}`);
    //   if(`${listVar[property].id}` !== currentUid) {
    //     senderName = `${listVar[property].fname}`
    //     console.log('sendername: ', senderName);
    //     // setTimeout(() => setHeaderName(senderName), 0);
    //   }
    // }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={
          // item == fakeMessage[0]
          // ? styles.userCardFirst
          // : item == fakeMessage[fakeMessage.length - 1]
          // ? styles.userCardLast
          // : styles.userCard
          styles.userCard
        }
        onPress={() => {
          // setHeaderName(item.data.receiver.fname);
          setInboxID(item.data.msgID);
          setMessageVisible(!messageVisible);
        }}>
        <Image
          source={require('../../assets/images/userimg.png')}
          style={styles.userImage}
        />
        <View style={styles.infoArea}>
          <Text style={styles.userName}>{item.data.receiver.fname}</Text>
          <Text style={styles.userPreview}>Utilisateur</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View style={styles.upperBar}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <View style={[styles.lowerSpace, {paddingTop: 20}]}>
        <FlatList
          data={messageList}
          renderItem={renderUser}
          keyExtractor={item => messageList.indexOf(item)}
        />
      </View>
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={{margin: 0}}
        coverScreen={true}
        isVisible={messageVisible}>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View style={styles.upperBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setMessageVisible(!messageVisible)}>
              <FontAwesomeIcon icon={faChevronLeft} color="white" size={20} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{headerName}</Text>
          </View>
          <Inbox iid={inboxID} />
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
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
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
  messageContainer: {
    width: windowWidth - 30,
    height: 'auto',
    backgroundColor: inBlack.black_2,
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
    marginHorizontal: 15,
  },
  infoArea: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 18,
  },
  userPreview: {
    color: Grays.gray_1,
    fontSize: 18,
  },
});
