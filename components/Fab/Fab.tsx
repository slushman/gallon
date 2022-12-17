import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animated from 'react-native-animatable';

import { timingSettings } from '../../constants/animation';
import * as colors from '../../utils/colors';
import { Setting } from '../../constants/enums';
import { useAnimation, useDarkmode } from '../../hooks';
import { FabProps } from './types';
import { AnimatedViewProps } from '../../types/animated';

const Fab: React.FC<FabProps> = ({
  handPref = Setting.RIGHT,
  iconName,
  iconSize = undefined,
  onPress,
  positionBottom = undefined,
  rotate = false,
  rotationEnd = '0deg',
  visible = true,
}) => {
  const toValue = visible ? 1 : 0;
  const rotateValue = rotate ? 1 : 0;
  const fabSize = 48;
  const fabAnim = useAnimation({ toValue, ...timingSettings });
  const rotateAnim = useAnimation({ toValue: rotateValue, ...timingSettings });
  const isDarkMode = useDarkmode();
  const gallonBlue = colors.getBlue(isDarkMode);

  const handlePress = React.useCallback(
    () => {
      if (!visible) return null;

      onPress();

      return;
    },
    [onPress, visible],
  );

  const buttonHeight = React.useMemo(() => {
    return fabAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, fabSize],
    });
  }, [fabAnim, fabSize]);

  const buttonOpacity = React.useMemo(() => {
    return fabAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  }, [fabAnim]);

  const iconRotation = React.useMemo(() => {
    return rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', rotationEnd ],
    });
  }, [rotateAnim, rotationEnd]);

  const fabWrapStyle: AnimatedViewProps = React.useMemo(
    () => ({
      height: buttonHeight,
      opacity: buttonOpacity,
      transform: [{ rotate: iconRotation }],
    }),
    [buttonHeight, buttonOpacity, iconRotation],
  );

  const iconWrap: ViewStyle = React.useMemo(
    () => ({
      alignItems: 'center',
      borderRadius: fabSize / 2,
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    }),
    [fabSize],
  );

  const size = React.useMemo(
    () => {
      if (iconSize !== undefined) return iconSize;

      return fabSize * 0.8;
    },
    [fabSize, iconSize],
  );

  const pressableStyle = React.useMemo(
    () => ({
      backgroundColor: gallonBlue,
      borderRadius: fabSize / 2,
      bottom: positionBottom,
      height: fabSize,
      left: handPref === Setting.LEFT ? 16 : undefined,
      position: 'absolute' as 'absolute',
      right: handPref === Setting.RIGHT ? 16 : undefined,
      width: fabSize,
    }),
    //       {
    //   let style: GenericStyle = {
    //     backgroundColor: gallonBlue,
    //     borderRadius: fabSize / 2,
    //     height: fabSize,
    //     width: fabSize,
    //   };

    //   if (positionBottom && handPref) {
    //     style = {
    //       ...style,
    //       bottom: positionBottom,
    //       left: handPref === Setting.LEFT ? 16 : undefined,
    //       position: 'absolute',
    //       right: handPref === Setting.RIGHT ? 16 : undefined,
    //     };
    //   }
    //   return style;
    // },
    [fabSize, gallonBlue, handPref, positionBottom],
  );

  return (
    <Animated.View pointerEvents={visible ? undefined : 'none'} style={fabWrapStyle}>
      <Pressable onPress={handlePress} style={pressableStyle}>
        <View style={iconWrap}>
          <MCIcon color="white" name={iconName} size={size} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(Fab);
