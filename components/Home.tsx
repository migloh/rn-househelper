import React from 'react';
import Locations from './signedin/Locations';
import LocationsStack from './signedin/LocationsStack';
import UserStack from './signedin/UserStack';
import Messages from './signedin/Messages';
import Profile from './signedin/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { EnumTabs, BottomTabParamList } from './Routes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkerAlt, faUserFriends, faCommentAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Grays, inBlack } from './Colors';

const Tabs = createBottomTabNavigator<BottomTabParamList>(); 

export default function Home() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: Grays.gray_0,
        showLabel: false,
        style: {
          borderTopColor: '#666666',
          backgroundColor: inBlack.black_2,
          height: 57,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='map' size={25} color={color}/>
          ),
        }}
        name={EnumTabs.LocationsStack} 
        component={LocationsStack} 
       />
      <Tabs.Screen 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='user' size={25} color={color} />
          ),
        }}
        name={EnumTabs.UserStack} 
        component={UserStack} 
      />
      <Tabs.Screen 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='comment-alt' size={25} color={color} />
          ),
        }}
        name={EnumTabs.Messages} 
        component={Messages} 
      />
      <Tabs.Screen 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='user-circle' size={25} color={color} />
          ),
        }}
        name={EnumTabs.Profile} 
        component={Profile} 
      />
    </Tabs.Navigator>
  );
};

