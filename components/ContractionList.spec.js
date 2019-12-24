import React from 'react';
import {Text} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import ContractionList from './ContractionList';

import TestRenderer from 'react-test-renderer';

let data;
let component;
let testRenderer;

beforeEach(() => {
  data = [];
  testRenderer = TestRenderer.create(<ContractionList data={data}/>);
  component = testRenderer.root;
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('matches previous snapshot', () => {
  let tree = TestRenderer
    .create(<ContractionList data={data}/>)
    .toJSON();
  
  expect(tree).toMatchSnapshot();
});

it('initializes with frequency and duration column headers', () => {
  let columns = component.findAllByType(Col);
  let frequencyColumnHeader = getText(columns[0]);
  let durationColumnHeader = getText(columns[1]);

  expect(columns).toHaveLength(2);
  expect(frequencyColumnHeader).toBe('Frequency');
  expect(durationColumnHeader).toBe('Duration');
});

it('appends new element to table when props change', () => {
  const expectedStartTime = moment();
  const expectedEndTime = moment();
  let table = component.findByType(Grid);
  let rows = table.findAllByType(Row);

  expect(rows).toHaveLength(1);

  let dataWithAContraction = [{
    start: expectedStartTime,
    end: expectedEndTime
  }];
  testRenderer.update(<ContractionList data={dataWithAContraction}/>);

  let updatedRows = table.findAllByType(Row);
  expect(updatedRows).toHaveLength(2);
});

it('displays duration data', () => {
  const expectedStartTime = moment();
  const expectedEndTime = moment().add(1, 'minutes');
  let dataWithAContraction = [{
    start: expectedStartTime,
    end: expectedEndTime
  }];
  
  testRenderer.update(<ContractionList data={dataWithAContraction}/>);

  let rows = component.findAllByType(Row);
  let columns = rows[1].findAllByType(Col);
  let frequencyColumn = getText(columns[0]);
  let durationColumn = getText(columns[1]);
  expect(columns).toHaveLength(2);
  expect(frequencyColumn).toBeUndefined();
  expect(durationColumn).toBe('1m 0s');
});

it('displays frequency data', () => {
  const expectedStartTime = moment();
  const expectedEndTime = moment().add(1, 'minutes');
  const expectedNewContractionStartTime = moment().add(5, 'minutes');
  const expectedNewContractionEndTime = moment().add(6, 'minutes');
  let dataWithTwoContractions = [{
    start: expectedStartTime,
    end: expectedEndTime
  },
  {
    start: expectedNewContractionStartTime,
    end: expectedNewContractionEndTime
  }];
  
  testRenderer.update(<ContractionList data={dataWithTwoContractions}/>);

  let rows = component.findAllByType(Row);
  let columns = rows[2].findAllByType(Col);
  let frequencyColumn = getText(columns[0]);
  let durationColumn = getText(columns[1]);
  expect(columns).toHaveLength(2);
  expect(frequencyColumn).toBe('0h 5m 0s');
  expect(durationColumn).toBe('1m 0s');
});

it('displays frequency without duration when contraction hasn\'t ended yet', () => {
  const expectedStartTime = moment();
  const expectedEndTime = moment().add(1, 'minutes');
  const expectedNewContractionStartTime = moment().add(5, 'minutes');
  let dataWithTwoContractions = [{
    start: expectedStartTime,
    end: expectedEndTime
  },
  {
    start: expectedNewContractionStartTime,
    end: null
  }];
  
  testRenderer.update(<ContractionList data={dataWithTwoContractions}/>);

  let rows = component.findAllByType(Row);
  let columns = rows[2].findAllByType(Col);
  let frequencyColumn = getText(columns[0]);
  let durationColumn = getText(columns[1]);
  expect(columns).toHaveLength(2);
  expect(frequencyColumn).toBe('0h 5m 0s');
  expect(durationColumn).toBeUndefined();
});

function getText(textComponent) {
  return textComponent.findByType(Text).props.children
}