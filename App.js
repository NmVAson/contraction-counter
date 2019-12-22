import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StartStopContractionButton from './components/StartStopContractionButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yay! We're in labor!</Text>
      <StartStopContractionButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  title: {
    color: '#141823',
    fontSize: 30,
    paddingBottom: 20
  }
});
