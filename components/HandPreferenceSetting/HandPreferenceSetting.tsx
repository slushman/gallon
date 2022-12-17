import React from 'react';
import { View } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import * as R from 'ramda';
import * as ReactRedux from 'react-redux';

import Text from '../Text';
import { Setting } from '../../constants/enums';
import * as actions from '../../redux/actions';
import * as selectors from '../../redux/selectors';
import * as uniStyles from '../../utils/styles';

export const values = [Setting.LEFT, Setting.RIGHT];

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
    <View style={uniStyles.settingWrap}>
      <Text style={uniStyles.settingLabel}>Which is your dominant hand?</Text>
      <SegmentedControl
        onChange={handleHandPref}
        selectedIndex={selectedIndex}
        values={values}
      />
    </View>
  );
};

export default React.memo(HandPreferenceSetting);
