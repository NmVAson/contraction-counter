import React, {Component} from 'react';
import {Alert} from 'react-native';

const oneHourInMs = 3600000;
const delta = 0.15;

export default class Alerter {
    static trackContraction(frequency, duration) {
        let isLessThanFiveMinutesApart = frequency <= 5 + delta;
        let isAboutAMinute = Math.abs(duration - 1) <= delta;
        let isTimeToCallDoc = isLessThanFiveMinutesApart && isAboutAMinute;

        if(isTimeToCallDoc) {
            Alert.alert('Time to call your doctor!', 'You\'ll be heading to the hospital in an hour!');
            setTimeout(() => Alert.alert('Time to head to the hospital!', 'Don\'t forget your hospital bag :)'), oneHourInMs);
        }
    }
}