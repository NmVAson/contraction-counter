import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import StartStopContractionButton from './components/StartStopContractionButton';

export default function App() {
  return (
    <View style={[s.container, s.mt5, s.justifyContentCenter, s.alignItemsCenter]}>
      <Text style={s.h1}>Yay! We're in labor!</Text>
      <StartStopContractionButton styles={s}/>
    </View>
  );
}

const bootstrapStyleSheet = new BootstrapStyleSheet();
const s = bootstrapStyleSheet.create();
