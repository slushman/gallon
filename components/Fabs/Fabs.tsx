import React from 'react';
import * as Animated from 'react-native-animatable';
import { Animated as RNAnimated, View, ViewProps, ViewStyle } from 'react-native';

import NewFab from '../NewFab';
import NewFillupFab from '../NewFillupFab';
import NewServiceFab from '../NewServiceFab';
import SettingsFab from '../SettingsFab';
import { springSettings } from '../../constants/animation';
import { Setting } from '../../constants/enums';
import { FabsProps } from './types';
import { useAnimation } from '../../hooks';

const Fabs: React.FC<FabsProps> = ({
  fabsExpanded = false,
  handPref = Setting.LEFT,
}) => {
  const toValue = fabsExpanded ? 1 : 0;
  const fabAnim = useAnimation({ toValue, ...springSettings });

  const height: RNAnimated.AnimatedInterpolation = React.useMemo(() => {
    return fabAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [112, 240],
    });
  }, [fabAnim]);

  const wrapperStyle: RNAnimated.AnimatedProps<ViewStyle> = React.useMemo(
    () => ({
      bottom: 16,
      flexDirection: 'column-reverse' as 'column-reverse',
      height,
      justifyContent: 'space-between' as 'space-between',
      left: handPref === Setting.LEFT ? 16 : undefined,
      position: 'absolute' as 'absolute',
      right: handPref === Setting.RIGHT ? 16 : undefined,
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
