import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function Messages() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View style={styles.upperBar}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <View style={styles.lowerSpace}>
        <ScrollView style={styles.scrollableContent}>
          <Picker
            selectedValue={selectedLanguage}
            style={{color: 'white'}}
            dropdownIconColor="white"
            onValueChange={setSelectedLanguage}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </ScrollView>
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
});