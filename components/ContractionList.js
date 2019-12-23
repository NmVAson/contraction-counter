import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import shortid from 'shortid';

export default class ContractionList extends Component {
  getDuration(contraction) {
    if(!contraction.end) return;

    let diff = contraction.end.diff(contraction.start);
    let duration = moment.duration(diff).as('milliseconds');
    return moment.utc(duration).format("m[m] s[s]");
  }

  getFrequency(contraction, prevContraction) {
    if(!prevContraction) return;

    let frequencyDiff = contraction.start.diff(prevContraction.start);
    let frequency = moment.duration(frequencyDiff).as('milliseconds');
    return moment.utc(frequency).format("H[h] m[m] s[s]");
  }

  createRow(contraction, i, contractions) {
    let previousContraction = contractions[i-1];
    let durationLabel = this.getDuration(contraction);
    let frequencyLabel = this.getFrequency(contraction, previousContraction);

    
    return <Row key={shortid.generate()}>
      <Col>{frequencyLabel}</Col>
      <Col>{durationLabel}</Col>
    </Row>;
  }

  render() {
    return (<Grid style={this.props.styles.h75}>
      <Row>
        <Col>Frequency</Col>
        <Col>Duration</Col>
      </Row>
      <ScrollView 
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight) => {        
            this.scrollView.scrollToEnd({animated: true});
        }}
        style={this.props.styles.mt4}>
        {this.props.data.map(this.createRow.bind(this))}
      </ScrollView>
    </Grid>);
  }
}
