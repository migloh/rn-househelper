import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Blues, inBlack, Grays } from '../Colors';
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const windowWidth : number = Dimensions.get('window').width;

const Transmit = ({message, role}: any) => (
  <View style={styles.transmitter}>
    <View 
      style={
        role === 'sender' 
        ? styles.isSender 
        : styles.isReceiver
      }
    >
      <Text style={{fontSize: 16, color: 'white'}}>{message}</Text>
    </View>
  </View>
);

export default function Inbox () {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageArea}>
        <Transmit message="Lorem day fdsaa fa fa afas das fs sfsadfsafsadfsadf sadf sdf sadf sda fasd fasd fas fd" role='sender' />
        <Transmit message="Lorem da" role='reveiver' />
        <Transmit message="Lorem da" role='reveiver' />
        <Transmit message="Lorem da" role='reveiver' />
        <Transmit message="Lorem da" role='reveiver' />
      </ScrollView>
      <View style={styles.messageBar}>
        <TextInput
          style={styles.messageInput}
          placeholder='Votre message...'
          placeholderTextColor={Grays.gray_1}
          multiline={true}
        />
        <TouchableOpacity
          onPress={useCallback(() => null, [])}
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
  isSender: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: inBlack.black_2,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 15
  },
  isReceiver: {
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