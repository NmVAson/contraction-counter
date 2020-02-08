import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import moment from 'moment';
import shortid from 'shortid';

import Alerter from '../services/Alerter';
import ContractionCalculator from '../services/ContractionCalculator';
import StartStopContractionButton from './StartStopContractionButton';
import ContractionList from './ContractionList';

const STORAGE_KEY = 'contractions';

export default class ContractionLogger extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            contractions: []
        };
    }

    componentDidMount() {
        AsyncStorage
            .getItem(STORAGE_KEY)
            .then((data) => {
                if(data) this.setState({contractions: data});
            });
    }
    
    componentWillUnmount() {
        AsyncStorage.setItem(STORAGE_KEY, this.state.contractions);
    }
  
    onContractionStart() {
      this.state.contractions.push({start: moment(), end: null});

      this.setState({
          contractions: this.state.contractions
      });
    }
  
    onContractionEnd() {
      let currentContraction = this.state.contractions.pop();
      currentContraction.end = moment();

      if(this.state.contractions.length >= 1) {
        let previousContraction = this.state.contractions.slice(-1).pop();
        let duration = ContractionCalculator.getDurationInMinutes(currentContraction);
        let frequency = ContractionCalculator.getFrequencyInMinutes(previousContraction, currentContraction);

        Alerter.trackContraction(frequency, duration);
      }

      this.state.contractions.push(currentContraction);

      this.setState({
          contractions: this.state.contractions
      });
    }
  
    render() {
        return (<View style={[this.props.styles.container, this.props.styles.h90]}>
            <StartStopContractionButton
                startContraction={this.onContractionStart.bind(this)}
                endContraction={this.onContractionEnd.bind(this)}/>
            <ContractionList
                data={this.state.contractions}/>
        </View>);
    }
}
