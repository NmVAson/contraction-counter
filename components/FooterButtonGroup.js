import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context } from '../context';

export default function FooterButtonGroup() {
    const {clearContractions, providerNumber} = React.useContext(Context);

    return (      
    <View style={styles.container}>
        <Button 
            className="provider-button"
            title=" doctor"
            type="outline"
            icon={
                <Icon
                    name="phone"
                    size={20}
                    color='#F2C2C2'
                />
            }
            buttonStyle={styles.secondaryButton}
            titleStyle={styles.secondaryButtonLabel}
            onPress={() => Linking.openURL(`tel:${providerNumber}`)}/>
        <Button 
            className="trash-button"
            title=" false alarm"
            type="outline"
            icon={
                <Icon
                    name="trash"
                    size={20}
                    color='#C1DDD8'
                />
            }
            buttonStyle={styles.ternaryButton}
            titleStyle={styles.ternaryButtonLabel}
            onPress={clearContractions}/>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center'
    },
    secondaryButton: {
        borderWidth: 2,
        borderColor: '#F2C2C2', 
        marginRight: 10
    },
    secondaryButtonLabel: {
        color: '#F2C2C2', 
        fontSize: 20
    },
    ternaryButton: {
        borderWidth: 2,
        borderColor: '#C1DDD8', 
        marginLeft: 10
    },
    ternaryButtonLabel: {
        color: '#C1DDD8', 
        fontSize: 20
    }
  });