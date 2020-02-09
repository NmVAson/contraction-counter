import React from 'react';
import {View} from 'react-native';
import Button from 'react-native-bootstrap-buttons';

import { Context } from '../context';

export default function ClearButton() {
    const {clearContractions} = React.useContext(Context);

    return (      
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Button 
            buttonType="danger"
            label="Clear Data"
            onPress={clearContractions}/>
    </View>);
}
