import React from 'react';
import {
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import * as styles from './styles';

const Expandable = ({
  children,
  labelClosed,
  labelMain,
  labelOpen,
  startExpanded,
}) => {
  const [expanded, setExpanded] = React.useState(startExpanded);

  const expandChildren = React.useCallback(
    () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    },
    [expanded],
  );

  const childContent = expanded ? children : null;
  const icon = expanded ? 'chevron-up' : 'chevron-down';
  const text = expanded ? labelOpen : labelClosed;

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
          <MCIcon color="black" name={icon} size={25} />
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
