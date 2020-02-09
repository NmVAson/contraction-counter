import React from 'react';
import { Text, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Store from './context';

import ContractionLogger from './components/ContractionLogger';
import FooterButtonGroup from './components/FooterButtonGroup';

export default function App() {

  return (
  <Store>
    <View style={[s.container, s.h100, s.pt5, s.alignItemsCenter, {paddingTop: 75}]}>
      <Text style={[s.h1, {color: 'grey'}]}>Yay, we're in labor!</Text>
      <ContractionLogger styles={s}/>
      <FooterButtonGroup/>
    </View>
  </Store>);
}

const bootstrapStyleSheet = new BootstrapStyleSheet();
const s = bootstrapStyleSheet.create();
