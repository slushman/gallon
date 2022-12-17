import React from 'react';
import { I18nManager, View, ViewStyle } from 'react-native';
import RNSwipeable, { SwipeableProperties } from 'react-native-gesture-handler/Swipeable';

import { actionButtonWidth } from '../../constants/sizes';
import { noop } from '../../utils';
import SwipeableButton from '../SwipeableButton';
import { SwipeableProps, SwipeRefProps } from './types';

const Swipeable: React.FC<SwipeableProperties & SwipeableProps & SwipeRefProps> =  React.forwardRef(({
  children,
  item,
  leftActions = [],
  onSwipeLeft = noop,
  onSwipeRight = noop,
  rightActions = [],
}, ref) => {
  const swipeableRef = React.useRef<SwipeRefProps>(null);

  const buttonRowStyle = React.useCallback(
    (count) => ({
      flexDirection: I18nManager.isRTL ? 'row-reverse' as 'row-reverse' : 'row' as 'row',
      width: count * actionButtonWidth,
    }),
    [],
  );

  React.useImperativeHandle(ref, () => ({
    close() {
      swipeableRef.current?.close;
    },
  }));

  const closeSwipeable = React.useCallback(
    () => {
      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
    },
    [swipeableRef],
  );

  const handleSwipeLeft = React.useCallback(
    () => {
      if (item && onSwipeLeft) {
        onSwipeLeft(item);
      }
    },
    [item, onSwipeLeft],
  );

  const handleSwipeRight = React.useCallback(
    () => {
      if (item && onSwipeRight) {
        onSwipeRight(item);
      }
    },
    [item, onSwipeRight],
  );

  const renderActionButton = React.useCallback(
    ({ bgColor, label, onPress, textColor }, index) => (
      <SwipeableButton
        bgColor={bgColor}
        item={item}
        label={label}
        key={index}
        onClose={closeSwipeable}
        onPress={onPress}
        textColor={textColor}
      />
    ),
    [closeSwipeable, item],
  );

  const renderLeftActions = React.useCallback(
    () => {
      const rowStyles: ViewStyle = buttonRowStyle(leftActions.length);
      return (
        <View style={rowStyles}>
          {leftActions.forEach(renderActionButton)}
        </View>
      );
    },
    [buttonRowStyle, leftActions, renderActionButton],
  );

  const renderRightActions = React.useCallback(
    () => {
      const rowStyles: ViewStyle = buttonRowStyle(rightActions.length);
      return (
        <View style={rowStyles}>
          {rightActions.map(renderActionButton)}
        </View>
      );
    },
    [buttonRowStyle, renderActionButton, rightActions],
  );

  return (
    <RNSwipeable
      onSwipeableLeftOpen={handleSwipeLeft}
      onSwipeableRightOpen={handleSwipeRight}
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {children}
    </RNSwipeable>
  );
});

export default React.memo(Swipeable);
