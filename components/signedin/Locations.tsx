import React, { useState, useRef, useEffect } from 'react';
import {
  View, 
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Blues, Grays, mapStyle} from '../Colors';
import GetLocation from 'react-native-get-location'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHandSparkles, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {responseType} from './UsersList';

export default function Locations() {
  const [region, setRegion] = useState<Region | undefined>({
    latitude: 21.0309509,
    longitude: 105.7820018,
    latitudeDelta: 0.212280,
    longitudeDelta: 0.142128,
  });
  const [dataList, setDataList] = useState<responseType>();
  // const [loading, setLoading] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<string>('');
  const mapRef = useRef<MapView>(null);
  const latlog = [
    {
      coor: { 
        latitude: 21.026409, 
        longitude: 105.832103 
      },
      title: 'PREMIERE',
      description: 'La premiere'
    },
    {
      coor: {
        latitude: 21.035110,
        longitude: 105.821609
      },
      title: 'DEUXIEME',
      description: 'La deuxieme'
    },
    {
      coor: {
        latitude: 21.046505,
        longitude: 105.801278
      },
      title: 'TROISIEME',
      description: 'La troisieme'
    },
    {
      coor: {
        latitude: 21.040818,
        longitude: 105.765622
      },
      title: 'QUATRIEME',
      description: 'La quatrieme'
    }

  ];
  useEffect(() => {
    const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userRole')
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
    var userRef = firestore().collection("users");
    const getData = async () => {
      try {
        var query = await userRef.where("role", "==", currentRole).get();
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
          // setLoading(false);
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
              latitude: marker.data.address[0].homeCoor.lat,
              longitude: marker.data.address[0].homeCoor.lng
            }}
            title={marker.data.fname}
            description={
              marker.data.address[0].addName.district + ', '
              + marker.data.address[0].addName.province
            }
          >
            <View style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}>
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
});