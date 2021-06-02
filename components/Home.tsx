import React from 'react';
import Locations from './signedin/Locations';
import Users from './signedin/Users';
import Messages from './signedin/Messages';
import Profile from './signedin/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { EnumTabs, BottomTabParamList } from './Routes';

const Tabs = createBottomTabNavigator<BottomTabParamList>();

export default function Home() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name={EnumTabs.Locations} component={Locations} />
      <Tabs.Screen name={EnumTabs.Users} component={Users} />
      <Tabs.Screen name={EnumTabs.Messages} component={Messages} />
      <Tabs.Screen name={EnumTabs.Profile} component={Profile} />
    </Tabs.Navigator>
  );
};

