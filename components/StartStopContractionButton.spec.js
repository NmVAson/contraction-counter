import React from 'react';
import {Text} from 'react-native';
import Button from 'react-native-bootstrap-buttons';
import StartStopContractionButton from './StartStopContractionButton';

import TestRenderer from 'react-test-renderer';

let component;
let startSpy;
let endSpy;

beforeEach(() => {
  startSpy = jest.fn();
  endSpy = jest.fn();

  let testInstance = TestRenderer.create(
    <StartStopContractionButton 
    startContraction={startSpy}
    endContraction={endSpy}/>);
  component = testInstance.root;
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('matches previous snapshot', () => {
  let tree = TestRenderer.create(<StartStopContractionButton/>).toJSON();
  
  expect(tree).toMatchSnapshot();
});

it('changes button text on click', () => {
  let button = component.findByType(Button);

  expect(button.props.label).toBe('click to start contraction');

  startContraction();

  expect(button.props.label).toBe('click to end contraction');

  stopContraction();

  expect(button.props.label).toBe('click to start contraction');
});

it('triggers contraction start', () => {
  expect(startSpy).not.toHaveBeenCalled();

  startContraction();
  
  expect(startSpy).toHaveBeenCalled();
});

it('triggers contraction end', () => {
  startContraction();

  expect(endSpy).not.toHaveBeenCalled();

  stopContraction();

  expect(endSpy).toHaveBeenCalled();
});

function startContraction() {
  component.findByType(Button).props.onPress();
}

function stopContraction() {
  component.findByType(Button).props.onPress();
}
