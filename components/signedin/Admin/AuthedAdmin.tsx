import React from 'react';
import AdminUserList from './AdminUserList';
import AdminListStack from './AdminListStack';
import Profile from '../Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AdminTabs, AdminTabParamList } from '../../Routes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkerAlt, faUserFriends, faCommentAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Grays, inBlack } from '../../Colors';

const Tabs = createBottomTabNavigator<AdminTabParamList>(); 

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
            <FontAwesome5 name='user' size={25} color={color} />
          ),
        }}
        name={AdminTabs.UserStack} 
        component={AdminListStack} 
      />
      <Tabs.Screen 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='user-circle' size={25} color={color} />
          ),
        }}
        name={AdminTabs.Profile} 
        component={Profile} 
      />
    </Tabs.Navigator>
  );
};

