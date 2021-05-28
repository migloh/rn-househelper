import React, { useState, useRef } from 'react';
import {
  View, 
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Blues, Grays} from '../Colors';
import GetLocation from 'react-native-get-location'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHandSparkles, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default function Locations() {
  const [region, setRegion] = useState<Region | undefined>({
    latitude: 21.0309509,
    longitude: 105.7820018,
    latitudeDelta: 0.212280,
    longitudeDelta: 0.142128,
  });
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
        {latlog.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coor}
            title={marker.title}
            description={marker.description}
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

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];