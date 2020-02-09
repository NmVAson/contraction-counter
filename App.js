import React from 'react';
import { Text, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Store from './context';

import ContractionLogger from './components/ContractionLogger';
import ClearButton from './components/ClearButton';

export default function App() {

  return (
  <Store>
    <View style={[s.container, s.h100, s.pt5, s.alignItemsCenter, {paddingTop: 90}]}>
      <Text style={s.h1}>Yay! We're in labor!</Text>
      <ContractionLogger styles={s}/>
      <ClearButton/>
    </View>
  </Store>);
}

const bootstrapStyleSheet = new BootstrapStyleSheet();
const s = bootstrapStyleSheet.create();
