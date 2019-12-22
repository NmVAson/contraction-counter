import React from 'react';
import {View, Button, Text} from 'react-native';
import StartStopContractionButton from './StartStopContractionButton';
import { advanceBy, clear } from 'jest-date-mock';

import TestRenderer from 'react-test-renderer';

const oneMinuteInMs = 60000;
const fiveMinutesInMs = 300000;
const fakeStyles = {
  h75: null,
  mt4: null,
  text: null,
  h5: null
};
let component;

beforeEach(() => {
  let testInstance = TestRenderer.create(<StartStopContractionButton styles={fakeStyles}/>);
  component = testInstance.root;
});

afterEach(() => {
  clear();
});

it('matches previous snapshot', () => {
  let tree = TestRenderer.create(<StartStopContractionButton styles={fakeStyles}/>).toJSON();
  
  expect(tree).toMatchSnapshot();
});

it('changed button text on click', () => {
  let button = component.findByType(Button);

  expect(button.props.title).toBe('click to start contraction');

  button.props.onPress();

  expect(button.props.title).toBe('click to end contraction');

  button.props.onPress();

  expect(button.props.title).toBe('click to start contraction');
});

it('tracks the duration of the contraction', () => {
  let button = component.findByType(Button);

  button.props.onPress();
  advanceBy(oneMinuteInMs);
  button.props.onPress();

  let durationTextList = component.findAll(n => n.type == 'Text' && n.props.className == 'contraction');
  expect(durationTextList).toHaveLength(1);
  let durationText = durationTextList[0].props.children;
  expect(durationText).toBe('Duration: 0h 1m 0s');
});

it('doesn\'t display duration if contraction hasn\'t ended', () => {
  let button = component.findByType(Button);

  button.props.onPress();

  let durationTextList = component.findAll(n => n.type == 'Text' && n.props.className == 'contraction');
  expect(durationTextList).toHaveLength(0);
});

it('tracks the frequency of consecutive contractions', () => {
  let button = component.findByType(Button);

  button.props.onPress();
  button.props.onPress();
  advanceBy(oneMinuteInMs);
  button.props.onPress();

  let frequencyTextList = component.findAll(n => n.type == 'Text' && n.props.className == 'contraction');
  expect(frequencyTextList).toHaveLength(2);
  let frequencyText = frequencyTextList[1].props.children;
  expect(frequencyText).toBe('Frequency: 0h 1m 0s');
});

it('tracks the frequency and duration of complete contractions', () => {
  let button = component.findByType(Button);

  button.props.onPress();
  button.props.onPress();
  advanceBy(oneMinuteInMs);
  button.props.onPress();
  button.props.onPress();

  let frequencyTextList = component.findAll(n => n.type == 'Text' && n.props.className == 'contraction');
  expect(frequencyTextList).toHaveLength(2);
  let frequencyText = frequencyTextList[1].props.children;
  expect(frequencyText).toBe('Frequency: 0h 1m 0s, Duration: 0h 0m 0s');
});