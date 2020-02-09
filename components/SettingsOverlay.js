import React from 'react';
import { Text } from 'react-native';
import {Header, Overlay, Input, Icon, Card} from 'react-native-elements';

import {Context} from '../context';

export default function SettingsOverlay({isVisible, close}) {
  const {providerNumber, setProviderNumber} = React.useContext(Context);

  return (
    <Overlay 
      isVisible={isVisible}
      onBackdropPress={close}
      width="auto"
      height="auto">
      <Card title='Settings'>
        <Input
            label={`Your Provider's Phone Number`}
            placeholder='Phone Number'
            value={providerNumber}
            onChangeText={n => setProviderNumber(n)}
            keyboardType='phone-pad'
            textContentType='telephoneNumber'
            leftIcon={
            <Icon
                name='phone'
                size={24}
                color='grey'
            />
            }
            leftIconContainerStyle={{paddingRight: 15}}
        />
      </Card>
    </Overlay>);
}
