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
    let previousContraction = contractions[i-1];
    let durationLabel = this.getDuration(contraction);
    let frequencyLabel = this.getFrequency(contraction, previousContraction);

    return <Row key={shortid.generate()} style={styles.body}>
      <Col><Text style={styles.text}>{frequencyLabel}</Text></Col>
      <Col><Text style={styles.text}>{durationLabel}</Text></Col>
    </Row>;
  }

  render() {
    return (<Grid style={styles.container}>
      <Row style={styles.head}>
        <Col><Text style={styles.text}>Frequency</Text></Col>
        <Col><Text style={styles.text}>Duration</Text></Col>
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
    padding: 20,
    backgroundColor: '#f1f8ff' 
  },
  body: { 
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#f1f8ff',
    borderBottomWidth: 2
  },
  text: {
    fontSize: 20
  }
});