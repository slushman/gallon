import React from 'react';
import { I18nManager, View } from 'react-native';
import RNSwipeable from 'react-native-gesture-handler/Swipeable';
import PropTypes from 'prop-types';

import { actionButtonWidth } from '../../constants/sizes';
import { noop } from '../../utils';
import SwipeableButton from '../SwipeableButton';

const Swipeable = ({
  children,
  item,
  leftActions,
  onSwipeLeft,
  onSwipeRight,
  rightActions,
}) => {
  const swipeableRef = React.useRef(null);

  const buttonRowStyle = React.useCallback(
    (count) => ({
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      width: count * actionButtonWidth,
    }),
    [],
  );

  const closeSwipeable = React.useCallback(
    () => {
      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
    },
    [swipeableRef],
  );

  const renderActionButton = React.useCallback(
    (progress) => (buttonProps, index) => {
      return (
        <SwipeableButton
          buttonProps={buttonProps}
          item={item}
          key={index}
          onClose={closeSwipeable}
        />
      );
    },
    [closeSwipeable, item],
  );

  const renderLeftActions = React.useCallback(
    (progress) => {
      const rowStyles = buttonRowStyle(leftActions.length);
      return (
        <View style={rowStyles}>
          {leftActions.forEach(renderActionButton(progress))}
        </View>
      );
    },
    [buttonRowStyle, leftActions, renderActionButton],
  );

  const renderRightActions = React.useCallback(
    (progress) => {
      const rowStyles = buttonRowStyle(rightActions.length);
      return (
        <View style={rowStyles}>
          {rightActions.map(renderActionButton(progress))}
        </View>
      );
    },
    [buttonRowStyle, renderActionButton, rightActions],
  );

  return (
    <RNSwipeable
      onSwipeableLeftOpen={onSwipeLeft(item)}
      onSwipeableRightOpen={onSwipeRight(item)}
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {children}
    </RNSwipeable>
  );
};

Swipeable.propTypes = {
  children: PropTypes.any.isRequired,
  item: PropTypes.object,
  leftActions: PropTypes.arrayOf(PropTypes.shape({
    bgColor: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    textColor: PropTypes.string,
  })),
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  rightActions: PropTypes.arrayOf(PropTypes.shape({
    bgColor: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    textColor: PropTypes.string,
  })),
};

Swipeable.defaultProps = {
  leftActions: [],
  onSwipeLeft: noop,
  onSwipeRight: noop,
  rightActions: [],
};

export default React.memo(Swipeable);
