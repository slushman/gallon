import * as R from 'ramda';

import { EntryProps } from '../types';

export const hasValue = R.compose(
  R.not,
  R.anyPass([
    R.isEmpty,
    R.isNil,
    R.equals(false),
  ]),
);

export const allHaveValues = (props: any, object: object) => R.all(hasValue, R.props(props, object));

export const updateArray = (array: Array<any>, value: any) => {
  if (R.includes(value, array)) {
    return R.without([value], array);
  } else {
    return R.append(value, array);
  }
};

export const noop = () => {};

export const getEntryKey = (entry: EntryProps) => entry.id.toString();
