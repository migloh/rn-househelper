import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { Blues } from './Colors';

export default function LoadingScreen() {
  return(
    <View style={classes.loadingContainer}>
      <ActivityIndicator size={50} color={Blues.blue_2} />
    </View>
  );
};

const classes = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  }
});