import React from 'react';
import * as Animated from 'react-native-animatable';
import { useAnimation } from 'react-native-animation-hooks';
import { View } from 'react-native';

import NewFab from '../NewFab';
import NewFillupFab from '../NewFillupFab';
import NewServiceFab from '../NewServiceFab';
import SettingsFab from '../SettingsFab';
import { springSettings } from '../../constants/animation';
import { leftIndex, rightIndex } from '../../constants/settings';

const Fabs = ({ fabsExpanded, handPref }) => {
  const toValue = fabsExpanded ? 1 : 0;
  const fabAnim = useAnimation({ toValue, ...springSettings });

  const height = React.useMemo(() => {
    return fabAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [112, 240],
    });
  }, [fabAnim]);

  const wrapperStyle = React.useMemo(
    () => ({
      bottom: 16,
      flexDirection: 'column-reverse',
      height: height,
      justifyContent: 'space-between',
      left: handPref === leftIndex ? 16 : undefined,
      position: 'absolute',
      right: handPref === rightIndex ? 16 : undefined,
    }),
    [handPref, height],
  );

  return (
    <View>
      <Animated.View style={wrapperStyle}>
        <NewFab />
        <NewFillupFab />
        <NewServiceFab />
        <SettingsFab />
      </Animated.View>
    </View>
  );
};

export default React.memo(Fabs);
