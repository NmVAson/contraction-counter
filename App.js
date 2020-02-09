import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Button from "react-native-bootstrap-buttons";

import ContractionLogger from './components/ContractionLogger';

export default function App() {

  return (
    <View style={[s.container, s.h100, s.pt5, s.alignItemsCenter, {paddingTop: 90}]}>
      <Text style={s.h1}>Yay! We're in labor!</Text>
      <ContractionLogger styles={s}/>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Button 
          buttonType="danger"
          label="Clear Data"
          onPress={() => AsyncStorage.clear()}/>
      </View>
    </View>
  );
}

const bootstrapStyleSheet = new BootstrapStyleSheet();
const s = bootstrapStyleSheet.create();
