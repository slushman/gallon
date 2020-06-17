import * as R from 'ramda';

export const LEFT = 'Left';
export const RIGHT = 'Right';
export const values = [LEFT, RIGHT];
export const leftIndex = R.indexOf(LEFT, values);
export const rightIndex = R.indexOf(RIGHT, values);
