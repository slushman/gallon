import React from 'react';
import { Text, View } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import * as R from 'ramda';
import * as ReactRedux from 'react-redux';

import { values } from '../../constants/settings';
import * as actions from '../../redux/actions';
import * as selectors from '../../redux/selectors';
import * as styles from '../../screens/Settings/styles';

const HandPreferenceSetting = () => {
  const dispatch = ReactRedux.useDispatch();
  const handPreference = ReactRedux.useSelector(selectors.handPreferenceSelector);
  const index = R.indexOf(handPreference, values);
  const selectedIndex = index >= 0 ? index : 1;

  const handleHandPref = React.useCallback(
    (event) => {
      const handPref = R.path(['nativeEvent', 'value'], event);
      dispatch(actions.setHandPreference(handPref));
    },
    [dispatch],
  );

  return (
    <View style={styles.settingWrap}>
      <Text style={styles.settingLabel}>Which is your dominant hand?</Text>
      <SegmentedControl
        onChange={handleHandPref}
        selectedIndex={selectedIndex}
        values={values}
      />
    </View>
  );
};

export default React.memo(HandPreferenceSetting);
