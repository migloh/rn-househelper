import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { Blues, inBlack, Grays } from '../Colors';
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 
import { responseType } from './UsersList';

var currentUid: string|undefined = auth().currentUser?.uid;

const windowWidth : number = Dimensions.get('window').width;

type propType = {
  sender: number,
  message: string
};

const Transmit = ({item}: any) => (
  <View style={styles.transmitter}>
    <TouchableOpacity
      activeOpacity={0.9}
      // onLongPress={() => Alert.alert('Timestamp', JSON.stringify(item.timestamp) + '\nsender: ' + JSON.stringify(item.senderID))}
      style={
        item.data.senderID === currentUid 
        ? styles.isSender 
        : styles.isReceiver
      }
    >
      <Text style={{fontSize: 16, color: 'white'}}>{item.data.content}</Text>
    </TouchableOpacity>
  </View>
);

type inboxType = {
  iid: string|undefined
};

export default function Inbox ({iid}: inboxType) {
  const [messBatch, getMessBatch] = useState<any>();
  const [text, setText] = useState<string>('');
  var inboxID = iid;
  // const yourRef = useRef<FlatList<any>>(null);
  
  const sendGo = async (kotoba: string) => {
    try {
      await firestore().collection('messagesPool').doc(inboxID).collection('messageList').doc()
        .set({
          content: kotoba,
          createdAt: new Date(),
          senderID: currentUid
        }); 
      setText('');
    } catch(e) {
      console.log(e.message);
    } 
  };
  useEffect(() => {
    // const subscriber = firestore()
    //   .collection('messagePool')
    //   .doc(inboxID)
    //   .collection('messageList')
    //   .onSnapshot(documentSnapshot => {
    //     console.log('User data: ', documentSnapshot.id);
    //     if (documentSnapshot.data() !== undefined) getMessBatch(documentSnapshot.data()?.body);
    //   });

    // // Stop listening for updates when no longer required
    // return () => subscriber();
    const getMsg = async () => {
      console.log('mege,egmeg id: ', inboxID);
      try {
    var msgReal = firestore().collection('messagesPool')
      .doc(inboxID).collection('messageList').orderBy('createdAt')
      .onSnapshot((docSnap: any) => {
        var temp: any = [];
        docSnap.forEach((element: any) => {
            let newData: any  = {
              id: element.id,
              data: element.data()
            };
        temp.push(newData);
        });
        console.log(temp);
        getMessBatch(temp);
      });
    // return () => msgReal();
      } catch (e) {
        console.log('inboxErr: ', e.message);
      }
    };
    getMsg();
  }, []);
  return (
    <View style={styles.container}>
        <FlatList
          style={styles.messageArea}
          data={messBatch}
          renderItem={Transmit}
          keyExtractor={item => messBatch.indexOf(item)}
          // ref={yourRef}
          // onContentSizeChange={() => yourRef?.current?.scrollToEnd() }
          // onLayout={() => yourRef?.current?.scrollToEnd() }
        />
      <View style={styles.messageBar}>
        <TextInput
          style={styles.messageInput}
          placeholder='Votre message...'
          placeholderTextColor={Grays.gray_1}
          multiline={true}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          onPress={useCallback(() => sendGo(text), [text])}
        >
          <FontAwesomeIcon icon={faPaperPlane} color={Blues.blue_2} size={30}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transmitter: {
    width: '100%',
    height: 'auto',
  },
  isReceiver: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: inBlack.black_2,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 15
  },
  isSender: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Blues.blue_1,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 15
  },
  messageArea: {
    flex: 1
  },
  messageBar: {
    flexDirection: 'row',
    height: 'auto',
    width: windowWidth - 30,
    marginHorizontal: 15,
    backgroundColor: inBlack.black_2,
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: 'white'
  }
});