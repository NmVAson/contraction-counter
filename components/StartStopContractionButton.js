import React, {Component} from 'react';
import {StyleSheet, View, Button, ScrollView, Text, Alert} from 'react-native';
import moment from 'moment';

const numberOfMinutesBetweenContractions = 5.5;
const numberOfMinutesForAContraction = .75;

export default class StartStopContractionButton extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: 'click to start contraction',
      isContracting: false,
      contractions: [],
      currentStartTime: null
    };
  }

  toggleContraction() {
    let isStartingANewContraction = !this.state.isContracting;
    let newTitle;

    if(isStartingANewContraction) {
      this.state.contractions.push({start: moment(), end: null});
      newTitle = 'click to end contraction';
    } else {
      let currentContraction = this.state.contractions.pop();
      currentContraction.end = moment();
      this.state.contractions.push(currentContraction);

      newTitle = 'click to start contraction';
    }

    this.setState((state, props) => ({
      title: newTitle,
      isContracting: !state.isContracting
    }));
  }

  createContractionComponent(text) {
    return <Text className='contraction' style={[this.props.styles.text, this.props.styles.h5]}>{text}</Text>;
  }

  renderContraction(c, i, contractions) {
    if(!c.end && i ==0) return;

    if(i == 0) {
      let duration = moment.duration(c.end.diff(c.start));
      let durationLabel = moment.utc(duration.as('milliseconds')).format("H[h] m[m] s[s]");
      
      return this.createContractionComponent(`Duration: ${durationLabel}`);
    } else {
      let frequency = moment.duration(c.start.diff(contractions[i-1].start));
      let frequencyLabel = moment.utc(frequency.as('milliseconds')).format("H[h] m[m] s[s]");
      
      if(!c.end) {
        return this.createContractionComponent(`Frequency: ${frequencyLabel}`);
      }

      let duration = moment.duration(c.end.diff(c.start));
      let durationLabel = moment.utc(duration.as('milliseconds')).format("H[h] m[m] s[s]");
      return this.createContractionComponent(`Frequency: ${frequencyLabel}, Duration: ${durationLabel}`);
    }
  }

  render() {
    return (<View style={this.props.styles.h75}>
      <Button 
        title={this.state.title}
        onPress={this.toggleContraction.bind(this)}/>
      <ScrollView 
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight) => {        
            this.scrollView.scrollToEnd({animated: true});
        }}
        style={this.props.styles.mt4}>
        {this.state.contractions.map(this.renderContraction.bind(this))}
      </ScrollView>
    </View>);
  }
}
