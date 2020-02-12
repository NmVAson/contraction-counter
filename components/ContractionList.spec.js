import React from 'react';
import {Text} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import ContractionList from './ContractionList';

import TestRenderer from 'react-test-renderer';

const expectedStartTime = moment();
const expectedEndTime = moment().add(1, 'minutes');
const expectedNewContractionStartTime = moment().add(5, 'minutes');
const expectedNewContractionEndTime = moment().add(6, 'minutes');
const fakeContext = {
  contractions: [{
    start: expectedStartTime,
    end: expectedEndTime
  },
  {
    start: expectedNewContractionStartTime,
    end: expectedNewContractionEndTime
  }]
};
let component;
let testRenderer;

beforeEach(() => {
  jest.spyOn(React, 'useContext').mockImplementation(() => fakeContext);

  testRenderer = TestRenderer.create(<ContractionList/>);
  component = testRenderer.root;
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('initializes with time, frequency and duration column headers', () => {
  let columns = component.findAllByType(Col);
  let timestampColumnHeader = getText(columns[0]);
  let frequencyColumnHeader = getText(columns[1]);
  let durationColumnHeader = getText(columns[2]);

  expect(timestampColumnHeader).toBe('Time');
  expect(frequencyColumnHeader).toBe('Frequency');
  expect(durationColumnHeader).toBe('Duration');
});

it('appends new element to table when props change', () => {
  const expectedNumberOfRows = fakeContext.contractions.length + 1;
  let table = component.findByType(Grid);
  let rows = table.findAllByType(Row);

  expect(rows).toHaveLength(expectedNumberOfRows);
});

it('displays duration data', () => {
  let rows = component.findAllByType(Row);
  let columns = rows[1].findAllByType(Col);
  let timestampColumn = getText(columns[0]);
  let frequencyColumn = getText(columns[1]);
  let durationColumn = getText(columns[2]);

  expect(columns).toHaveLength(3);
  expect(timestampColumn).toBe(expectedStartTime.format('ddd, HH:mm'));
  expect(frequencyColumn).toBeUndefined();
  expect(durationColumn).toBe('1m 0s');
});

it('displays timestamp data', () => {
  let rows = component.findAllByType(Row);
  let columns = rows[1].findAllByType(Col);
  let timestampColumn = getText(columns[0]);

  expect(timestampColumn).toBe(expectedStartTime.format('ddd, HH:mm'));
});

it('displays frequency data', () => {
  let rows = component.findAllByType(Row);
  let columns = rows[2].findAllByType(Col);
  let frequencyColumn = getText(columns[1]);
  let durationColumn = getText(columns[2]);

  expect(frequencyColumn).toBe('0h 5m 0s');
  expect(durationColumn).toBe('1m 0s');
});

it('displays frequency without duration when contraction hasn\'t ended yet', () => {
  const expectedStartTime = moment();
  const expectedEndTime = moment().add(1, 'minutes');
  const expectedNewContractionStartTime = moment().add(5, 'minutes');
  fakeContext.contractions = [{
    start: expectedStartTime,
    end: expectedEndTime
  },
  {
    start: expectedNewContractionStartTime,
    end: null
  }];
  jest.spyOn(React, 'useContext').mockImplementation(() => fakeContext);
  
  testRenderer.update(<ContractionList/>);

  let rows = component.findAllByType(Row);
  let columns = rows[2].findAllByType(Col);
  let frequencyColumn = getText(columns[1]);
  let durationColumn = getText(columns[2]);
  expect(frequencyColumn).toBe('0h 5m 0s');
  expect(durationColumn).toBeUndefined();
});

function getText(textComponent) {
  return textComponent.findByType(Text).props.children
}