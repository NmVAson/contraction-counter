import React from 'react';
import {View} from 'react-native';
import moment from 'moment';

import StartStopContractionButton from './StartStopContractionButton';
import ContractionLogger from './ContractionLogger';
import Alerter from '../services/Alerter';
import ContractionCalculator from '../services/ContractionCalculator';

import TestRenderer from 'react-test-renderer';

const fakeStyles = {};
const addSpy = jest.fn();
const fakeContext = {
  contractions: [],
  addContraction: addSpy.mockImplementation((contraction) => fakeContext.contractions.push(contraction))
};
const now = moment();
let component;
let testRenderer;

beforeEach(() => {
  jest.spyOn(Date, 'now').mockImplementation(() => now);
  jest.spyOn(React, 'useContext').mockImplementation(() => fakeContext);

  testRenderer = TestRenderer.create(<ContractionLogger styles={fakeStyles}/>);
  component = testRenderer.root.findByType(ContractionLogger);
});

it('matches previous snapshot', () => {
  let tree = TestRenderer
    .create(<ContractionLogger styles={fakeStyles}/>)
    .toJSON();
  
  expect(tree).toMatchSnapshot();
});

it('supplies a new contraction function to button', () => {
  let button = component.findByType(StartStopContractionButton);
  let expectedContraction = {
    start: now,
    end: null
  };

  button.props.startContraction();

  expect(addSpy).toHaveBeenCalled();
  expect(addSpy).toHaveBeenCalledWith(expectedContraction);
});

it('supplies an end contraction function to button', () => {
  let button = component.findByType(StartStopContractionButton);
  let expectedContraction = {
    start: now,
    end: now
  };
  button.props.startContraction();
  addSpy.mockClear();

  button.props.endContraction();

  expect(addSpy).toHaveBeenCalled();
  expect(addSpy).toHaveBeenCalledWith(expectedContraction);
});

it('tracks contractions for alerts', () => {
  let expectedDuration = 1;
  let expectedFrequency = 2;
  let button = component.findByType(StartStopContractionButton);
  let alerterSpy = jest.spyOn(Alerter, 'trackContraction');
  jest.spyOn(ContractionCalculator, 'getDurationInMinutes').mockImplementation(() => expectedDuration);
  jest.spyOn(ContractionCalculator, 'getFrequencyInMinutes').mockImplementation(() => expectedFrequency);

  button.props.startContraction();
  button.props.endContraction();
  button.props.startContraction();
  button.props.endContraction();

  expect(alerterSpy).toHaveBeenCalled();
  expect(alerterSpy).toHaveBeenCalledWith(expectedFrequency, expectedDuration);
});
