import React from 'react';
import {View, Linking} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context } from '../context';

export default function FooterButtonGroup() {
    const {clearContractions} = React.useContext(Context);

    return (      
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 20}}>
        <Button 
            title=" doctor"
            type="outline"
            icon={
                <Icon
                    name="phone"
                    size={20}
                    color="#F2C2C2"
                />
            }
            buttonStyle={{borderColor: '#F2C2C2', marginRight: 10}}
            titleStyle={{color: '#F2C2C2', fontSize: 20}}
            onPress={() => Linking.openURL('tel:3177735876')}/>
        <Button 
            title=" false alarm"
            type="outline"
            icon={
                <Icon
                    name="trash"
                    size={20}
                    color="#C1DDD8"
                />
            }
            buttonStyle={{borderColor: '#C1DDD8', maLeft: 10}}
            titleStyle={{color: '#C1DDD8', fontSize: 20}}
            onPress={clearContractions}/>
    </View>);
}
