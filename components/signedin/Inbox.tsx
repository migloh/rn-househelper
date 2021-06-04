import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function Inbox () {
  return (
    <View style={styles.container}>
      <Text>Inbox screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});