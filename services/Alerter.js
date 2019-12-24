import React, {Component} from 'react';
import {Alert} from 'react-native';

const oneHourInMs = 3600000;

export default class Alerter {
    delta = 0.15;

    trackContraction(frequency, duration) {
        if(this.isTimeToCallDoc(frequency, duration)) {
            this.triggerCallDoctorAlert();
            setTimeout(this.triggerHeadToHospitalAlert, oneHourInMs);
        }
    }

    isTimeToCallDoc(frequency, duration) {
        let isLessThanFiveMinutesApart = frequency <= 5 + this.delta;
        let isAboutAMinute = Math.abs(duration - 1) < this.delta;

        return isLessThanFiveMinutesApart && isAboutAMinute;
    }

    triggerCallDoctorAlert() {
        Alert.alert('Time to call your doctor! You\'ll be heading to the hospital in an hour!');
    }

    triggerHeadToHospitalAlert() {
        Alert.alert('Time to head to the hospital!');
    }
}