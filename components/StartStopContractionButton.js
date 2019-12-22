import React, {Component} from 'react';
import {StyleSheet, View, Button, ScrollView, Text} from 'react-native';
import moment from 'moment';

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
      this.state.contractions.push({start: moment(), end: null})
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

  renderContraction(c, i, contractions) {
    if(!c.end && i ==0) return;

    if(i == 0) {
      let duration = moment.duration(c.end.diff(c.start));
      let durationLabel = moment.utc(duration.as('milliseconds')).format("H[h] m[m] s[s]");
      
      return <Text className='contraction' key={c.start.format()}>Duration: {durationLabel}</Text>
    } else {
      let frequency = moment.duration(c.start.diff(contractions[i-1].start));
      let frequencyLabel = moment.utc(frequency.as('milliseconds')).format("H[h] m[m] s[s]");
      
      if(!c.end) {
        return <Text className='contraction' key={c.start.format()}>Frequency: {frequencyLabel}</Text>;
      }

      let duration = moment.duration(c.end.diff(c.start));
      let durationLabel = moment.utc(duration.as('milliseconds')).format("H[h] m[m] s[s]");
      return <Text className='contraction' key={c.start.format()}>Frequency: {frequencyLabel}, Duration: {durationLabel}</Text>;
    }
  }

  render() {
    return (<View>
      <Button 
        title={this.state.title}
        onPress={this.toggleContraction.bind(this)}/>
      <ScrollView style={styles.scrollView}>
        {this.state.contractions.map(this.renderContraction)}
      </ScrollView>
    </View>);
  }
}


const styles = StyleSheet.create({
  scrollView: {
    padding: 10
  }
});