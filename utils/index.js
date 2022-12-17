import * as R from 'ramda';
export const hasValue = R.compose(R.not, R.anyPass([
    R.isEmpty,
    R.isNil,
    R.equals(false),
]));
export const allHaveValues = (props, object) => R.all(hasValue, R.props(props, object));
export const updateArray = (array, value) => {
    if (R.includes(value, array)) {
        return R.without([value], array);
    }
    else {
        return R.append(value, array);
    }
};
export const noop = () => { };
export const getEntryKey = (entry) => entry.id.toString();
//# sourceMappingURL=index.js.map