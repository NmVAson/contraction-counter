import React, {Component} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import shortid from 'shortid';

import StartStopContractionButton from './StartStopContractionButton';
import ContractionList from './ContractionList';

export default class ContractionLogger extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            contractions: []
        };
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
