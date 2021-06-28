import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {AdminRoute, AvailableUsersProps} from '../../Routes';
import { Grays, Blues, inBlack } from '../../Colors';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import { responseType } from '../UsersList';

export default function AvailableUsers({route, navigation}: AvailableUsersProps){
  const [dataList, setDataList] = useState<responseType>();
  const [loading, setLoading] = useState<boolean>(true);
  const renderUser = ({ item }: FirebaseFirestoreTypes.DocumentData) => {
    let addRes = item.data.address;
    let fullAdd: string = 
      addRes.homeNumber + ', ' 
      + addRes.ward + ', ' 
      + addRes.district + ', ' 
      + addRes.province;
    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.userCard}
        onPress={() => navigation.navigate(AdminRoute.AvailableUserDetail, item)}
      >
        <Image 
          source={require('../../../assets/images/misaka.png')}
          style={styles.userImage}
        />
        <View style={styles.infoArea}>
          <Text style={styles.userName}>{item.data.fname}</Text>
          <Text style={styles.userAddress}>{fullAdd}</Text>
        </View>
      </TouchableOpacity>
  )};

  useEffect(() => {
    const getData = async () => {
      try {
        var query = await firestore().collection("users1").where("role", "==", "Employer").get();
        if(!query.empty) {
          var tempData: responseType = [];
          query.forEach(doc => {
            let newData: FirebaseFirestoreTypes.DocumentData = {
              id: doc.id,
              data: doc.data()
            };
            tempData.push(newData);
          });
          setDataList(tempData);
          setLoading(false);
        }
      } catch(e) {
        // error reading value
        console.log(e.message);
      }
    };
    getData();
  }), [];
	return (
		<View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View style={styles.upperBar}>
        <Text style={styles.headerTitle}>Recommendation</Text>
      </View>
      <View style={styles.lowerSpace}>
          <FlatList
            data={dataList}
            renderItem={renderUser}
            keyExtractor={item => item.id}
          />
      </View>
      <Modal
        isVisible={loading}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <View>
          <ActivityIndicator size='large' color='blue' />
        </View>
      </Modal>
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
  headerTitle: {
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white'
  },
  lowerSpace: {
    flex: 1,
    paddingHorizontal: 20, 
  },
  userCard: {
    width: '100%',
    height: 'auto',
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: inBlack.black_2,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10
  },
  infoArea: {
    flex: 1
  },
  userName: {
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold'
  },
  userAddress: {
    color: Grays.gray_1, 
    fontSize: 15
  },
});