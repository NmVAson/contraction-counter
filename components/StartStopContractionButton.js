import React, {Component} from 'react';
import {View, Button} from 'react-native';

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
        title={this.state.title}
        onPress={this.toggleContraction.bind(this)}/>);
  }
}
