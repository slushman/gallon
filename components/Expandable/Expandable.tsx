import React from 'react';
import {
  LayoutAnimation,
  Pressable,
  View,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animated from 'react-native-animatable';

import Text from '../Text';
import { timingSettings } from '../../constants/animation';
import * as colors from '../../utils/colors';
import * as styles from './styles';
import { useAnimation, useDarkmode } from '../../hooks';
import { ExpandableProps } from './types';
import { AnimatedViewProps } from '../../types/animated';

const Expandable: React.FC<ExpandableProps> = ({
  children,
  labelClosed = 'Expand',
  labelMain = '',
  labelOpen = 'Collapse',
  startExpanded = false,
}) => {
  const isDarkMode = useDarkmode();
  const bgContrast = colors.getBgContrast(isDarkMode);
  const [expanded, setExpanded] = React.useState(startExpanded);
  const childContent = expanded ? children : null;
  const rotateValue = expanded ? 1 : 0;
  const rotateAnim = useAnimation({...timingSettings, toValue: rotateValue});
  const text = expanded ? labelOpen : labelClosed;

  const iconRotation = React.useMemo(() => {
    return rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg' ],
    });
  }, [rotateAnim]);

  const expandChildren = React.useCallback(
    () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    },
    [expanded],
  );

  const iconWrap: AnimatedViewProps = React.useMemo(
    () => ({ transform: [{ rotate: iconRotation }] }),
    [iconRotation],
  );

  return (
    <View style={styles.expandableWrap}>
      <Pressable onPress={expandChildren} style={styles.expandableTouch}>
        <View style={styles.expandableTextWrap}>
          <Text style={styles.mainLabel}>{labelMain}</Text>
        </View>
        <View style={styles.expanderButton}>
          <View style={styles.expandableTextWrap}>
            <Text>{text}</Text>
          </View>
          <Animated.View style={iconWrap}>
            <MCIcon color={bgContrast} name="chevron-down" size={25} />
          </Animated.View>
        </View>
      </Pressable>
      {childContent}
    </View>
  );
};

export default React.memo(Expandable);
