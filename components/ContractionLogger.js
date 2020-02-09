import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import moment from 'moment';
import shortid from 'shortid';

import Alerter from '../services/Alerter';
import ContractionCalculator from '../services/ContractionCalculator';
import StartStopContractionButton from './StartStopContractionButton';
import ContractionList from './ContractionList';
import { Context } from '../context';


export default function ContractionLogger({ styles }) {
    const {contractions, addContraction} = React.useContext(Context);
  
    onContractionStart = () => {
      addContraction({start: moment(), end: null});
    }
  
    onContractionEnd = () => {
      let currentContraction = contractions.pop();
      currentContraction.end = moment();

      if(contractions.length >= 1) {
        let previousContraction = contractions.slice(-1).pop();
        let duration = ContractionCalculator.getDurationInMinutes(currentContraction);
        let frequency = ContractionCalculator.getFrequencyInMinutes(previousContraction, currentContraction);

        Alerter.trackContraction(frequency, duration);
      }

      addContraction(currentContraction);
    }
  
    return (<View style={[styles.container, styles.h80]}>
        <StartStopContractionButton
            startContraction={this.onContractionStart.bind(this)}
            endContraction={this.onContractionEnd.bind(this)}/>
        <ContractionList/>
    </View>);
}
