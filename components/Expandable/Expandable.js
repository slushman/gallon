import React from 'react';
import {
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import * as Animated from 'react-native-animatable';

import { timingSettings } from '../../constants/animation';
import * as colors from '../../constants/colors';
import * as styles from './styles';

const Expandable = ({
  children,
  labelClosed,
  labelMain,
  labelOpen,
  startExpanded,
}) => {
  const [expanded, setExpanded] = React.useState(startExpanded);
  const rotateValue = expanded ? 1 : 0;
  const rotateAnim = useAnimation({ toValue: rotateValue, ...timingSettings });
  const childContent = expanded ? children : null;
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

  const iconWrap = React.useMemo(
    () => ({ transform: [{ rotate: iconRotation }] }),
    [iconRotation],
  );

  return (
    <View style={styles.expandableWrap}>
      <TouchableOpacity onPress={expandChildren} style={styles.expandableTouch}>
        <View style={styles.expandableTextWrap}>
          <Text style={styles.mainLabel}>{labelMain}</Text>
        </View>
        <View style={styles.expanderButton}>
          <View style={styles.expandableTextWrap}>
            <Text>{text}</Text>
          </View>
          <Animated.View style={iconWrap}>
            <MCIcon color={colors.gallonBlack} name="chevron-down" size={25} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {childContent}
    </View>
  );
};

Expandable.propTypes = {
  children: PropTypes.node.isRequired,
  labelClosed: PropTypes.string,
  labelMain: PropTypes.string,
  labelOpen: PropTypes.string,
  startExpanded: PropTypes.bool,
};

Expandable.defaultProps = {
  labelClosed: 'Expand',
  labelMain: '',
  labelOpen: 'Collapse',
  startExpanded: false,
};

export default React.memo(Expandable);
