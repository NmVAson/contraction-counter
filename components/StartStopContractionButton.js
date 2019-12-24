import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from "react-native-bootstrap-buttons";

export default class StartStopContractionButton extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: 'click to start contraction',
      isContracting: false
    };
  }

  toggleContraction() {
    let isStartingANewContraction = !this.state.isContracting;
    let newTitle;

    if(isStartingANewContraction) {
      this.props.startContraction();
      newTitle = 'click to end contraction';
    } else {
      this.props.endContraction();
      newTitle = 'click to start contraction';
    }

    this.setState((state, props) => ({
      title: newTitle,
      isContracting: !state.isContracting
    }));
  }

  render() {
    return (<Button 
        label={this.state.title}
        labelStyle={styles.buttonLabel}
        onPress={this.toggleContraction.bind(this)}/>);
  }
}

const styles = StyleSheet.create({
  buttonLabel: { 
    fontSize: 20, 
    padding: 20,
    textAlign: 'center'
  }
});
