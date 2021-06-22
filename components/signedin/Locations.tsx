import React, { useState, useRef, useEffect } from 'react';
import {
  View, 
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Blues, Grays, mapStyle} from '../Colors';
import GetLocation from 'react-native-get-location'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHandSparkles, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { LocationsRoute, LocationsProps} from '../Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {responseType} from './UsersList';

export default function Locations({ route, navigation }: LocationsProps) {
  const [region, setRegion] = useState<Region | undefined>({
    latitude: 21.0309509,
    longitude: 105.7820018,
    latitudeDelta: 0.212280,
    longitudeDelta: 0.142128,
  });
  const [dataList, setDataList] = useState<responseType>();
  // const [loading, setLoading] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<string>('');
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const getData = async () => {
    try {
      var value = await AsyncStorage.getItem('userRole')
      if(value !== null) {
        // value previously stored
        console.log('get role ok: ', value);
        if (value == 'Employee') setCurrentRole('Employer');
        else setCurrentRole('Employee')
      }
    } catch(e) {
      // error reading value
      console.log('error in getting role: ', e.message);
    }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        var userRef = firestore().collection("users1");
        var query = await userRef.where("role", "==", currentRole).get();
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
          // setLoading(false);
        }
      } catch(e) {
        // error reading value
        console.log(e.message);
      }
    };
    getData();
  }), [currentRole];

  return (
    <View style={styles.container}>
      <View style={styles.upperBar}>
        <Text style={styles.headerTitle}>Locations</Text>
      </View>
      <MapView 
        style={styles.lowerSpace} 
        ref={mapRef}
        initialRegion={region}
        onRegionChangeComplete={(val) => {
          setRegion(val);
          console.log(val);
        }}
        showsUserLocation={true}
        customMapStyle={mapStyle}
      >
        {dataList!= undefined && dataList.map((marker, index) => (
          <Marker
            key={index}
            // coordinate={marker.data.address[0].homeCoor}
            coordinate={{
              latitude: marker.data.address.homeCoor.lat,
              longitude: marker.data.address.homeCoor.lng
            }}
            // title={marker.data.fname}
            // description={
            //   marker.data.address[0].addName.district + ', '
            //   + marker.data.address[0].addName.province
            // }
            onPress={() => navigation.navigate(LocationsRoute.UserDetail, marker)}
          >
            <View
              style={styles.markerStyle}
             >
              <FontAwesomeIcon icon={faHandSparkles} color={Blues.blue_3} size={30}/>
            </View>
          </Marker>
        ))}
      </MapView>
      <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            width: "100%", //for center align
            height: "100%",
            justifyContent: 'flex-end'
        }}
      >
        <TouchableOpacity  
          style={{ alignSelf:'flex-end', backgroundColor: Grays.gray_0, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 10, marginBottom: 10}}
          onPress={() => {
            GetLocation.getCurrentPosition({
              enableHighAccuracy: true,
              timeout: 15000,
            })
            .then(location => {
              console.log(location);
              setRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
              });
              mapRef.current?.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
              });
            })
            .catch(error => {
              const { code, message } = error;
              console.warn(code, message);
            })
          }}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} color={Blues.blue_0} size={30} />
        </TouchableOpacity>
      </View>
      {/* <Modal isVisible={loading}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text>I am the modal content!</Text>
          <TouchableOpacity onPress={() => setLoading(false)}><Text>gayhere</Text></TouchableOpacity>
        </View>
      </Modal> */}
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
  markerStyle: {
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});