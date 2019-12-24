import React from 'react';
import {Alert} from 'react-native';

import Alerter from './Alerter';

const oneHourInMs = 3600000;
let alerter = new Alerter();
let alertSpy = jest.spyOn(Alert, 'alert');

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
});

it('throws an alert when contractions are 5 minutes apart', () => {
    let numberOfMinutesApart = 5;
    let numberOfMinutesLong = 1;

    alerter.trackContraction(numberOfMinutesApart, numberOfMinutesLong);

    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Time to call your doctor! You\'ll be heading to the hospital in an hour!');
});

it('throws an alert when contractions are less than 5 minutes apart', () => {
    let numberOfMinutesApart = 4;
    let numberOfMinutesLong = 1;

    alerter.trackContraction(numberOfMinutesApart, numberOfMinutesLong);

    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Time to call your doctor! You\'ll be heading to the hospital in an hour!');
});

it('throws an alert when contractions are about 5 minutes apart', () => {
    let delta = 0.1;
    let numberOfMinutesApart = 5 + delta;
    let numberOfMinutesLong = 1;

    alerter.trackContraction(numberOfMinutesApart, numberOfMinutesLong);

    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Time to call your doctor! You\'ll be heading to the hospital in an hour!');
});

it('does not throw an alert when contractions last longer than a minute', () => {
    let numberOfMinutesApart = 5;
    let numberOfMinutesLong = 1.16;

    alerter.trackContraction(numberOfMinutesApart, numberOfMinutesLong);

    expect(alertSpy).not.toHaveBeenCalled();
});

it('throws a second alert one hour after the contractions start about 5 minutes apart for about 1 minute long', () => {
    let numberOfMinutesApart = 5;
    let numberOfMinutesLong = 1;
    alerter.trackContraction(numberOfMinutesApart, numberOfMinutesLong);
    alertSpy.mockClear();

    jest.runAllTimers();

    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Time to head to the hospital!');
});