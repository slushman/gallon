import React from 'react';
import { Pressable, View } from 'react-native';
import PropTypes from 'prop-types';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animated from 'react-native-animatable';
import { useAnimation } from 'react-native-animation-hooks';

import { timingSettings } from '../../constants/animation';
import * as colors from '../../constants/colors';
import { LEFT, RIGHT } from '../../constants/settings';
import { useDarkmode } from '../../hooks/useDarkMode';

const Fab = ({
  handPref,
  iconName,
  iconSize,
  onPress,
  positionBottom,
  rotate,
  rotationEnd,
  visible,
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

  const fabWrapStyle = React.useMemo(
    () => ({
      height: buttonHeight,
      opacity: buttonOpacity,
      transform: [{ rotate: iconRotation }],
    }),
    [buttonHeight, buttonOpacity, iconRotation],
  );

  const iconWrap = React.useMemo(
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
    () => {
      let style = {
        backgroundColor: gallonBlue,
        borderRadius: fabSize / 2,
        height: fabSize,
        width: fabSize,
      };

      if (positionBottom && handPref) {
        style = {
          ...style,
          bottom: positionBottom,
          left: handPref === LEFT ? 16 : undefined,
          position: 'absolute',
          right: handPref === RIGHT ? 16 : undefined,
        };
      }
      return style;
    },
    [fabSize, gallonBlue, handPref, positionBottom],
  );

  return (
    <Animated.View pointerEvents={visible ? undefined : 'none' } style={fabWrapStyle}>
      <Pressable onPress={handlePress} style={pressableStyle}>
        <View style={iconWrap}>
          <MCIcon color="white" name={iconName} size={size} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

Fab.propTypes = {
  handPref: PropTypes.oneOf([LEFT, RIGHT]),
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  positionBottom: PropTypes.number,
  rotate: PropTypes.bool,
  rotationEnd: PropTypes.string,
  visible: PropTypes.bool,
};

Fab.defaultProps = {
  handPref: RIGHT,
  iconSize: undefined,
  positionBottom: undefined,
  rotate: false,
  rotationEnd: '0deg',
  visible: true,
};

export default React.memo(Fab);
