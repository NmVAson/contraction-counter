import React from 'react';
import moment from 'moment';

import ContractionCalculator from './ContractionCalculator';

it('calculates duration of a contraction', () => {
    let startTime = moment();
    let endTime = startTime.clone().add(2, 'minutes').add(3, 'seconds');
    let contraction =  {
        start: startTime,
        end: endTime
    };

    let duration = ContractionCalculator.getDurationInMinutes(contraction);

    expect(duration).toEqual(2.05)
});

it('calculates distance between two contractions', () => {
    let startTime = moment();
    let secondStartTime = startTime.clone().add(2, 'minutes').add(3, 'seconds');
    let firstContraction =  {
        start: startTime,
        end: null
    };
    let secondContraction = {
        start: secondStartTime,
        end: null
    }

    let frequency = ContractionCalculator.getFrequencyInMinutes(firstContraction, secondContraction);

    expect(frequency).toEqual(2.05)
});

it('formats duration', () => {
    let startTime = moment();
    let endTime = startTime.clone().add(2, 'minutes').add(3, 'seconds');
    let contraction =  {
        start: startTime,
        end: endTime
    };

    let durationText = ContractionCalculator.getDurationToDisplay(contraction);

    expect(durationText).toEqual('2m 3s');
});

it('formats frequency', () => {
    let startTime = moment();
    let secondStartTime = startTime.clone().add(1, 'hours').add(2, 'minutes').add(3, 'seconds');
    let firstContraction =  {
        start: startTime,
        end: null
    };
    let secondContraction = {
        start: secondStartTime,
        end: null
    }

    let frequency = ContractionCalculator.getFrequencyToDisplay(firstContraction, secondContraction);

    expect(frequency).toEqual('1h 2m 3s')
});
