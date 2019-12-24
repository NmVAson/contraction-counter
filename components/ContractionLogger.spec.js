import React from 'react';
import {View} from 'react-native';
import moment from 'moment';

import StartStopContractionButton from './StartStopContractionButton';
import ContractionLogger from './ContractionLogger';

import TestRenderer from 'react-test-renderer';

const fakeStyles = {};
const now = moment();
let component;
let testRenderer;

beforeEach(() => {
  testRenderer = TestRenderer.create(<ContractionLogger styles={fakeStyles}/>);
  component = testRenderer.root;

  jest.spyOn(Date, 'now').mockImplementation(() => now);
});

afterEach(() => {
});

it('matches previous snapshot', () => {
  let tree = TestRenderer
    .create(<ContractionLogger styles={fakeStyles}/>)
    .toJSON();
  
  expect(tree).toMatchSnapshot();
});

it('supplies a new contraction function to button', () => {
  let button = component.findByType(StartStopContractionButton);
  let testState = component.instance.state;
  expect(testState.contractions).toHaveLength(0);

  button.props.startContraction();

  expect(testState.contractions).toHaveLength(1);
  let contraction = testState.contractions[0];
  expect(contraction.start).toEqual(now);
  expect(contraction.end).toBeNull();
});

it('supplies an end contraction function to button', () => {
  let button = component.findByType(StartStopContractionButton);
  let testState = component.instance.state;
  button.props.startContraction();

  button.props.endContraction();

  expect(testState.contractions).toHaveLength(1);
  let contraction = testState.contractions[0];
  expect(contraction.end).toEqual(now);
});
