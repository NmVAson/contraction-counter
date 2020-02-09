import React, {Component} from 'react';
import {Alert} from 'react-native';
import moment from 'moment';

const oneHourInMs = 3600000;

export default class ContractionCalculator {
    static getDurationInMinutes(contraction) {
        let {start, end} = contraction;
        let diff = contraction.end.diff(contraction.start);
        let duration = moment.duration(diff);

        return duration.asMinutes();
    }

    static getDurationToDisplay(contraction) {
        let {start, end} = contraction;
        let diff = moment(contraction.end).diff(moment(contraction.start));
        let duration = moment.duration(diff).asMilliseconds();

        return moment.utc(duration).format("m[m] s[s]");
    }

    static getFrequencyInMinutes(previousContraction, currentContraction) {
        let frequencyDiff = moment(currentContraction.start).diff(moment(previousContraction.start));
        let frequency = moment.duration(frequencyDiff);

        return frequency.asMinutes();
    }

    static getFrequencyToDisplay(previousContraction, currentContraction) {
        let frequencyDiff = moment(currentContraction.start).diff(moment(previousContraction.start));
        let frequency = moment.duration(frequencyDiff).asMilliseconds();

        return moment.utc(frequency).format("H[h] m[m] s[s]")
    }
}