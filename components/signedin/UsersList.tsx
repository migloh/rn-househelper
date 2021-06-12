import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Grays, Blues, inBlack } from '../Colors';
import {Picker} from '@react-native-picker/picker';
import { UserRoute, UsersListProps } from '../Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type fetchItemType = {
  id: string,
  data: {
    email: string,
    gender: string, 
    pnumber: string,
    description: string, 
    dob: {
      seconds: number,
      nanoseconds: number
    },
    fname: string,
    address: Array<{
      addName: {
        ward: string,
        homeNumber: string,
        district: string, 
        province: string
      },
      homeCoor: {
        lat: number,
        lng: number
      }
    }>,
    role: string
  }
}

type responseType = Array<FirebaseFirestoreTypes.DocumentData>;


const fakeInfo = [
  {
    id: '1',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    address: '18 Hoang Quoc Viet, Nghia Do, Cau Giay, Hanoi',
    status: 'Part-time',
  },
  {
    id: '2',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    address: '18 Hoang Quoc Viet, Nghia Do, Cau Giay, Hanoi',
    status: 'Part-time'
  },
  {
    id: '3',
    image: require('../../assets/images/misaka.png'),
    fname: 'Misaka Mikoto',
    address: '18 Hoang Quoc Viet, Nghia Do, Cau Giay, Hanoi',
    status: 'Part-time'
  },
];

export default function UsersList({route, navigation}: UsersListProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [dataList, setDataList] = useState<responseType>();
  const accStatus: string = 'user';
  const renderUser = ({ item }: FirebaseFirestoreTypes.DocumentData) => {
    let addRes = item.data.address[0].addName;
    let fullAdd: string = 
      addRes.homeNumber + ', ' 
      + addRes.ward + ', ' 
      + addRes.district + ', ' 
      + addRes.province;
    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.userCard}
        onPress={() => navigation.navigate(UserRoute.UserDetail)}
      >
        <Image 
          source={require('../../assets/images/misaka.png')}
          style={styles.userImage}
        />
        <View style={styles.infoArea}>
          <Text style={styles.userName}>{item.data.fname}</Text>
          <Text style={styles.userAddress}>{fullAdd}</Text>
          {
            accStatus === 'user' && 
              <Text style={styles.userStatus}>{accStatus}</Text>
          }
        </View>
      </TouchableOpacity>
  )};

  useEffect(() => {
    var userRef = firestore().collection("users");
    const getData = async () => {
      try {
        // const value = await AsyncStorage.getItem('userRole')
        var query = await userRef.where("role", "==", "Employee").get();
        var tempData: responseType = [];
        if(!query.empty) {
          query.forEach(doc => {
            let newData: FirebaseFirestoreTypes.DocumentData = {
              id: doc.id,
              data: doc.data()
            };
            tempData.push(newData);
          });
          setDataList(tempData);
          // value previously stored
          //setstate would be here soon
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
          <View style={styles.sortBar}>
            <View style={styles.leftSortBar}>
              <Text>Sort by:</Text>
            </View>
            <View style={styles.rightSortBar}>
              <Picker
                selectedValue={selectedLanguage}
                style={styles.pickerStyle}
                dropdownIconColor="black"
                onValueChange={setSelectedLanguage}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
          </View>
          <FlatList
            data={dataList}
            renderItem={renderUser}
            keyExtractor={item => item.id}
          />
      </View>
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
    paddingTop: 30
  },
  sortBar: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#C4C4C4',
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 20
  },
  leftSortBar: {
    width: 70, 
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#A4A2A2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerStyle: {
    color: 'black'
  },
  rightSortBar: {
    flex: 1,
    justifyContent: 'center'
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
  userStatus: {
    fontSize: 15, 
    color: Blues.blue_3, 
    fontWeight: 'bold'
  },
});