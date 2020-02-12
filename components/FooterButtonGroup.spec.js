import React from 'react';
import { Linking } from 'react-native';
import { Button } from 'react-native-elements';

import FooterButtonGroup from './FooterButtonGroup';

import TestRenderer from 'react-test-renderer';

const clearSpy = jest.fn();
const expectedProviderNumber = 3178641331;
const fakeContext = {
    clearContractions: clearSpy,
    providerNumber: expectedProviderNumber
};
let component;
let testRenderer;

beforeEach(() => {
  jest.spyOn(React, 'useContext').mockImplementation(() => fakeContext);
  jest.spyOn(Linking, 'openURL');

  testRenderer = TestRenderer.create(<FooterButtonGroup/>);
  component = testRenderer.root;
});

it('call doctor button opens phone with number', () => {
  let button = component.findByProps({className: "provider-button"});

  button.props.onPress();

  expect(Linking.openURL).toHaveBeenCalled();
  expect(Linking.openURL).toHaveBeenCalledWith(`tel:${expectedProviderNumber}`);
});

it('trash button clears contractions', () => {
    let button = component.findByProps({className: "trash-button"});
  
    button.props.onPress();
  
    expect(clearSpy).toHaveBeenCalled();
});