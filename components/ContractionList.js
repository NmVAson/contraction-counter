import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
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
    marginTop: 6,
    marginBottom: 6
  },
  text: {
    fontSize: 20
  }
});