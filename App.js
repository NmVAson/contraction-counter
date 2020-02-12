import React from 'react';
import { Text, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {Header} from 'react-native-elements';

import Store from './context';
import ContractionLogger from './components/ContractionLogger';
import FooterButtonGroup from './components/FooterButtonGroup';
import SettingsOverlay from './components/SettingsOverlay';

export default function App() {
  const [isSettingsVisible, setSettingsVisible] = React.useState(false);

  return (
  <Store>
    <Header
      centerComponent={{ text: 'Contraction Timer', style: { color: '#fff' } }}
      rightComponent={{ icon: 'settings', color: '#fff', onPress: () => setSettingsVisible(true)}}
      containerStyle={{
        backgroundColor: 'grey',
        justifyContent: 'space-around',
      }}
    />
    <View style={[s.container, s.h100, s.pt4, s.alignItemsCenter]}>
      <ContractionLogger styles={s}/>
      <FooterButtonGroup/>
    </View>
    <SettingsOverlay 
      isVisible={isSettingsVisible}
      close={() => setSettingsVisible(false)}/>
  </Store>);
}

const bootstrapStyleSheet = new BootstrapStyleSheet();
const s = bootstrapStyleSheet.create();
