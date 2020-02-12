import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import shortid from 'shortid';

import {Context} from '../context';
import ContractionCalculator from '../services/ContractionCalculator';

export default function ContractionList() {
  const {contractions} = React.useContext(Context);
  const [scrollView, setScrollView] = React.useState(null);

  const getDuration = (contraction) => {
    if(!contraction.end) return;
    
    return ContractionCalculator.getDurationToDisplay(contraction);
  }

  const getFrequency = (contraction, prevContraction) => {
    if(!prevContraction) return;
    
    return ContractionCalculator.getFrequencyToDisplay(prevContraction, contraction);
  }

  const createRow = (contraction, i, contractions) => {
    let startTime = moment(contraction.start).format('ddd, HH:mm');
    let previousContraction = contractions[i-1];
    let durationLabel = getDuration(contraction);
    let frequencyLabel = getFrequency(contraction, previousContraction);

    return <Row key={shortid.generate()}>
      <Col style={styles.column}><Text style={styles.text}>{startTime}</Text></Col>
      <Col style={styles.column}><Text style={styles.text}>{frequencyLabel}</Text></Col>
      <Col style={styles.column}><Text style={styles.text}>{durationLabel}</Text></Col>
    </Row>;
  }

  return (<Grid style={styles.container}>
    <Row style={styles.head}>
      <Col><Text style={styles.thText}>Time</Text></Col>
      <Col><Text style={styles.thText}>Frequency</Text></Col>
      <Col><Text style={styles.thText}>Duration</Text></Col>
    </Row>
    <ScrollView
      ref={ref => setScrollView(ref)}
      onContentSizeChange={(contentWidth, contentHeight) => {        
          scrollView.scrollToEnd({animated: true});
      }}>
      {contractions.map(createRow)}
    </ScrollView>
  </Grid>);
}

const styles = StyleSheet.create({
  container: { 
    paddingTop: 20, 
    paddingBottom: 20
  },
  head: { 
    height: 70,
    backgroundColor: '#F5E4DC'
  },
  thText: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
    color: 'grey'
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    color: 'grey'
  },
  column: {
    borderWidth: 2,
    borderColor: '#F5E4DC',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  }
});