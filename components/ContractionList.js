import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import shortid from 'shortid';

import ContractionCalculator from '../services/ContractionCalculator';

export default class ContractionList extends Component {
  getDuration(contraction) {
    if(!contraction.end) return;
    
    return ContractionCalculator.getDurationToDisplay(contraction);
  }

  getFrequency(contraction, prevContraction) {
    if(!prevContraction) return;
    
    return ContractionCalculator.getFrequencyToDisplay(prevContraction, contraction);
  }

  createRow(contraction, i, contractions) {
    let startTime = moment(contraction.start).format('ddd, HH:mm');
    let previousContraction = contractions[i-1];
    let durationLabel = this.getDuration(contraction);
    let frequencyLabel = this.getFrequency(contraction, previousContraction);

    return <Row key={shortid.generate()}>
      <Col style={styles.column}><Text style={styles.text}>{startTime}</Text></Col>
      <Col style={styles.column}><Text style={styles.text}>{frequencyLabel}</Text></Col>
      <Col style={styles.column}><Text style={styles.text}>{durationLabel}</Text></Col>
    </Row>;
  }

  render() {
    return (<Grid style={styles.container}>
      <Row style={styles.head}>
        <Col><Text style={styles.thText}>Time</Text></Col>
        <Col><Text style={styles.thText}>Frequency</Text></Col>
        <Col><Text style={styles.thText}>Duration</Text></Col>
      </Row>
      <ScrollView
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight) => {        
            this.scrollView.scrollToEnd({animated: true});
        }}>
        {this.props.data.map(this.createRow.bind(this))}
      </ScrollView>
    </Grid>);
  }
}

const styles = StyleSheet.create({
  container: { 
    paddingTop: 30, 
    backgroundColor: '#fff'
  },
  head: { 
    height: 70,
    backgroundColor: '#f1f8ff'
  },
  thText: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
  },
  text: {
    fontSize: 13,
    textAlign: 'center'
  },
  column: {
    borderWidth: 2,
    borderColor: '#f1f8ff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
});