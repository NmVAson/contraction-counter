import React from 'react';
import { Text, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import ContractionLogger from './components/ContractionLogger';

export default function App() {

  return (
    <View style={[s.container, s.h100, s.pt5, s.alignItemsCenter, {paddingTop: 90}]}>
      <Text style={s.h1}>Yay! We're in labor!</Text>
      <ContractionLogger styles={s} />
    </View>
  );
}

const bootstrapStyleSheet = new BootstrapStyleSheet();
const s = bootstrapStyleSheet.create();
