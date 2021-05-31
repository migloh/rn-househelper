import React from 'react';
import Locations from './signedin/Locations';
import Users from './signedin/Users';
import Messages from './signedin/Messages';
import Profile from './signedin/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

enum enumTabs {
  Locations = "Locations",
  Users = "Users",
  Messages = "Messages",
  Profile = "Profile",
  
};

type BottomTabParamList = {
  [enumTabs.Locations]: undefined;
  [enumTabs.Users]: undefined;
  [enumTabs.Messages]: undefined;
  [enumTabs.Profile]: undefined
};


const Tabs = createBottomTabNavigator<BottomTabParamList>();

export default function Home() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name={enumTabs.Locations} component={Locations} />
      <Tabs.Screen name={enumTabs.Users} component={Users} />
      <Tabs.Screen name={enumTabs.Messages} component={Messages} />
      <Tabs.Screen name={enumTabs.Profile} component={Profile} />
    </Tabs.Navigator>
  );
};

