import React from 'react';
import { Text, View } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import * as R from 'ramda';

import Wrapper from '../../components/Wrapper';
import { LEFT, RIGHT } from '../../constants/settings';
import { settingWrap, settingLabel } from './styles';

const Settings = ({
  handPreference,
  setHandPreference,
}) => {
  const values = [LEFT, RIGHT];

  const handleHandPref = React.useCallback(
    (event) => {
      console.log('handleHandPref: ', event.nativeEvent);
      setHandPreference(R.path(['nativeEvent', 'selectedSegmentIndex'], event));
    },
    [setHandPreference],
  );

  return (
    <Wrapper centerContent>
      <View style={settingWrap}>
        <Text style={settingLabel}>Which is your dominant hand?</Text>
        <SegmentedControl
          onChange={handleHandPref}
          selectedIndex={handPreference}
          values={values}
        />
      </View>
    </Wrapper>
  );
};

export default React.memo(Settings);
