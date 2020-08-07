import React from 'react';
import { Animated, Easing, PanResponder, StyleSheet, View, ViewPropTypes } from 'react-native';
import { PropTypes } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  content: {
    flex: 1
  }
});

const Swipeable = ({
  children,
  contentContainerStyle,
  leftActionActivationDistance,
  leftActionReleaseAnimationConfig,
  leftActionReleaseAnimationFn,
  leftButtonContainerStyle,
  leftButtons,
  leftButtonsActivationDistance,
  leftButtonsCloseReleaseAnimationConfig,
  leftButtonsCloseReleaseAnimationFn,
  leftButtonsOpenReleaseAnimationConfig,
  leftButtonsOpenReleaseAnimationFn,
  leftButtonWidth,
  leftContainerStyle,
  leftContent,
  onLeftActionActivate,
  onLeftActionComplete,
  onLeftActionDeactivate,
  onLeftActionRelease,
  onLeftButtonsActivate,
  onLeftButtonsCloseComplete,
  onLeftButtonsCloseRelease,
  onLeftButtonsDeactivate,
  onLeftButtonsOpenComplete,
  onLeftButtonsOpenRelease,
  onPanAnimatedValueRef,
  onRef,
  onRightActionActivate,
  onRightActionComplete,
  onRightActionDeactivate,
  onRightActionRelease,
  onRightButtonsActivate,
  onRightButtonsCloseComplete,
  onRightButtonsCloseRelease,
  onRightButtonsDeactivate,
  onRightButtonsOpenComplete,
  onRightButtonsOpenRelease,
  onSwipeComplete,
  onSwipeMove,
  onSwipeRelease,
  onSwipeStart,
  rightActionActivationDistance,
  rightActionReleaseAnimationConfig,
  rightActionReleaseAnimationFn,
  rightButtonContainerStyle,
  rightButtons,
  rightButtonsActivationDistance,
  rightButtonsCloseReleaseAnimationConfig,
  rightButtonsCloseReleaseAnimationFn,
  rightButtonsOpenReleaseAnimationConfig,
  rightButtonsOpenReleaseAnimationFn,
  rightButtonWidth,
  rightContainerStyle,
  rightContent,
  style,
  swipeReleaseAnimationConfig,
  swipeReleaseAnimationFn,
  swipeStartMinDistance,
}) => {
  const [lastOffset, setLastOffset] = React.useState({x: 0, y: 0});
  const [leftActionActivated, setLeftActionActivated] = React.useState(false);
  const [leftButtonsActivated, setLeftButtonsActivated] = React.useState(false);
  const [leftButtonsOpen, setLeftButtonsOpen] = React.useState(false);
  const [pan, setPan] = React.useState(new Animated.ValueXY());
  const [rightActionActivated, setRightActionActivated] = React.useState(false);
  const [rightButtonsActivated, setRightButtonsActivated] = React.useState(false);
  const [rightButtonsOpen, setRightButtonsOpen] = React.useState(false);
  const [width, setWidth] = React.useState(0);

  const hasLeftButtons = React.useMemo(
    () => !leftContent && leftButtons && leftButtons.length,
    [leftButtons, leftContent],
  );
  
  const hasRightButtons = React.useMemo(
    () => !rightContent && rightButtons && rightButtons.length,
    [rightButtons, rightContent],
  );

  const canSwipeLeft = React.useMemo(
    () => rightContent || hasRightButtons,
    [hasRightButtons, rightContent],
  );

  const canSwipeRight = React.useMemo(
    () => leftContent || hasLeftButtons,
    [hasLeftButtons, leftContent],
  );

  const handleLayout = React.useCallback(
    ({ nativeEvent: { layout: { width } } }) => setWidth(width),
    [],
  );

  const transform = React.useMemo(
    () => [{
      translateX: pan.x.interpolate({
        inputRange: [canSwipeLeft ? -width : 0, canSwipeRight ? width : 0],
        outputRange: [
          canSwipeLeft ? -width + StyleSheet.hairlineWidth : 0,
          canSwipeRight ? width - StyleSheet.hairlineWidth : 0
        ],
        extrapolate: 'clamp'
      })
    }],
    [canSwipeLeft, canSwipeRight, pan, width],
  );

  const renderButtons = React.useCallback(
    (buttons, isLeftButtons) => {
      const count = buttons.length;
      const leftEnd = canSwipeLeft ? -width : 0;
      const rightEnd = canSwipeRight ? width : 0;
      const inputRange = isLeftButtons ? [0, rightEnd] : [leftEnd, 0];

      return buttons.map((buttonContent, index) => {
        const outputMultiplier = -index / count;
        const outputRange = isLeftButtons ? [0, rightEnd * outputMultiplier] : [leftEnd * outputMultiplier, 0];
        const transform = [{
          translateX: pan.x.interpolate({
            inputRange,
            outputRange,
            extrapolate: 'clamp'
          })
        }];
        const buttonStyle = [
          StyleSheet.absoluteFill,
          { transform, width },
          isLeftButtons ? leftButtonContainerStyle : rightButtonContainerStyle
        ];

        return (
          <Animated.View key={index} style={buttonStyle}>
            {buttonContent}
          </Animated.View>
        );
      });
    },
    [
      canSwipeLeft,
      canSwipeRight,
      leftButtonContainerStyle,
      pan,
      rightButtonContainerStyle,
      width,
    ],
  );

  const handlePan = React.useMemo(
    (event, gestureState) => {
      Animated.event([null, {
        dx: pan.x,
        dy: pan.y
      }]);
    },
    [pan],
  );

  const handleMoveShouldSetPanResponder = React.useCallback(
    (event, gestureState) => (Math.abs(gestureState.dx) > swipeStartMinDistance),
    [swipeStartMinDistance],
  );

  const handlePanResponderStart = React.useCallback(
    (event, gestureState) => {
      pan.setOffset(lastOffset);
      onSwipeStart(event, gestureState, this);
    },
    [lastOffset, onSwipeStart, pan],
  );

  const handlePanResponderMove = React.useCallback(
    (event, gestureState) => {
      const { dx, vx } = gestureState;
      const x = dx + lastOffset.x;
      const isSwipingLeft = vx < 0;
      const isSwipingRight = vx > 0;
      let nextLeftActionActivated = leftActionActivated;
      let nextLeftButtonsActivated = leftButtonsActivated;
      let nextRightActionActivated = rightActionActivated;
      let nextRightButtonsActivated = rightButtonsActivated;

      handlePan(event, gestureState);
      onSwipeMove(event, gestureState, this);

      if (!leftActionActivated && canSwipeRight && x >= leftActionActivationDistance) {
        nextLeftActionActivated = true;
        onLeftActionActivate(event, gestureState, this);
      }

      if (leftActionActivated && canSwipeRight && x < leftActionActivationDistance) {
        nextLeftActionActivated = false;
        onLeftActionDeactivate(event, gestureState, this);
      }

      if (!rightActionActivated && canSwipeLeft && x <= -rightActionActivationDistance) {
        nextRightActionActivated = true;
        onRightActionActivate(event, gestureState, this);
      }

      if (rightActionActivated && canSwipeLeft && x > -rightActionActivationDistance) {
        nextRightActionActivated = false;
        onRightActionDeactivate(event, gestureState, this);
      }

      if (!leftButtonsActivated && hasLeftButtons && !isSwipingLeft && x >= leftButtonsActivationDistance) {
        nextLeftButtonsActivated = true;
        onLeftButtonsActivate(event, gestureState, this);
      }

      if (leftButtonsActivated && hasLeftButtons && isSwipingLeft) {
        nextLeftButtonsActivated = false;
        onLeftButtonsDeactivate(event, gestureState, this);
      }

      if (!rightButtonsActivated && hasRightButtons && !isSwipingRight && x <= -rightButtonsActivationDistance) {
        nextRightButtonsActivated = true;
        onRightButtonsActivate(event, gestureState, this);
      }

      if (rightButtonsActivated && hasRightButtons && isSwipingRight) {
        nextRightButtonsActivated = false;
        onRightButtonsDeactivate(event, gestureState, this);
      }

      const needsUpdate =
        nextLeftActionActivated !== leftActionActivated ||
        nextLeftButtonsActivated !== leftButtonsActivated ||
        nextRightActionActivated !== rightActionActivated ||
        nextRightButtonsActivated !== rightButtonsActivated;

      if (needsUpdate) {
        setLeftActionActivated(nextLeftActionActivated);
        setLeftButtonsActivated(nextLeftButtonsActivated);
        setRightActionActivated(nextRightActionActivated);
        setRightButtonsActivated(nextRightButtonsActivated);
      }
    },
    [
      canSwipeLeft,
      canSwipeRight,
      hasLeftButtons,
      hasRightButtons,
      lastOffset,
      leftActionActivated,
      leftActionActivationDistance,
      leftButtonsActivated,
      leftButtonsActivationDistance,
      onLeftActionActivate,
      onLeftActionDeactivate,
      onLeftButtonsActivate,
      onLeftButtonsDeactivate,
      onRightActionActivate,
      onRightActionDeactivate,
      onRightButtonsActivate,
      onRightButtonsDeactivate,
      onSwipeMove,
      rightActionActivated,
      rightActionActivationDistance,
      rightButtonsActivated,
      rightButtonsActivationDistance,
    ],
  );

  const releaseAnimationFn = React.useCallback(
    () => {
      if (leftActionActivated && leftActionReleaseAnimationFn) {
        return leftActionReleaseAnimationFn;
      }
  
      if (rightActionActivated && rightActionReleaseAnimationFn) {
        return rightActionReleaseAnimationFn;
      }
  
      if (leftButtonsActivated && leftButtonsOpenReleaseAnimationFn) {
        return leftButtonsOpenReleaseAnimationFn;
      }
  
      if (!leftButtonsActivated && leftButtonsOpen && leftButtonsCloseReleaseAnimationFn) {
        return leftButtonsCloseReleaseAnimationFn;
      }
  
      if (rightButtonsActivated && rightButtonsOpenReleaseAnimationFn) {
        return rightButtonsOpenReleaseAnimationFn;
      }
  
      if (!rightButtonsActivated && rightButtonsOpen && rightButtonsCloseReleaseAnimationFn) {
        return rightButtonsCloseReleaseAnimationFn;
      }
  
      return swipeReleaseAnimationFn;
    },
    [
      leftActionActivated,
      leftActionReleaseAnimationFn,
      leftButtonsActivated,
      leftButtonsCloseReleaseAnimationFn,
      leftButtonsOpen,
      leftButtonsOpenReleaseAnimationFn,
      rightActionActivated,
      rightActionReleaseAnimationFn,
      rightButtonsActivated,
      rightButtonsCloseReleaseAnimationFn,
      rightButtonsOpen,
      rightButtonsOpenReleaseAnimationFn,
      swipeReleaseAnimationFn,
    ],
  );

  const releaseAnimationConfig = React.useMemo(
    () => {
      if (leftActionActivated && leftActionReleaseAnimationConfig) {
        return leftActionReleaseAnimationConfig;
      }

      if (rightActionActivated && rightActionReleaseAnimationConfig) {
        return rightActionReleaseAnimationConfig;
      }

      if (leftButtonsActivated) {
        return {
          ...swipeReleaseAnimationConfig,
          toValue: {
            x: leftButtons.length * leftButtonWidth,
            y: 0
          },
          ...leftButtonsOpenReleaseAnimationConfig
        };
      }

      if (rightButtonsActivated) {
        return {
          ...swipeReleaseAnimationConfig,
          toValue: {
            x: rightButtons.length * rightButtonWidth * -1,
            y: 0
          },
          ...rightButtonsOpenReleaseAnimationConfig
        };
      }

      if (!leftButtonsActivated && leftButtonsOpen && leftButtonsCloseReleaseAnimationConfig) {
        return leftButtonsCloseReleaseAnimationConfig;
      }

      if (!rightButtonsActivated && rightButtonsOpen && rightButtonsCloseReleaseAnimationConfig) {
        return rightButtonsCloseReleaseAnimationConfig;
      }

      return swipeReleaseAnimationConfig;
    },
    [
      leftActionActivated,
      leftActionReleaseAnimationConfig,
      leftButtons,
      leftButtonsActivated,
      leftButtonsCloseReleaseAnimationConfig,
      leftButtonsOpen,
      leftButtonsOpenReleaseAnimationConfig,
      leftButtonWidth,
      rightActionActivated,
      rightActionReleaseAnimationConfig,
      rightButtons,
      rightButtonsActivated,
      rightButtonsCloseReleaseAnimationConfig,
      rightButtonsOpen,
      rightButtonsOpenReleaseAnimationConfig,
      rightButtonWidth,
      swipeReleaseAnimationConfig,
    ],
  );

  const handlePanResponderEnd = React.useCallback(
    (event, gestureState) => {
      onSwipeRelease(event, gestureState, this);

      if (leftActionActivated) {
        onLeftActionRelease(event, gestureState, this);
      }

      if (rightActionActivated) {
        onRightActionRelease(event, gestureState, this);
      }

      if (leftButtonsActivated && !leftButtonsOpen) {
        onLeftButtonsOpenRelease(event, gestureState, this);
      }

      if (!leftButtonsActivated && leftButtonsOpen) {
        onLeftButtonsCloseRelease(event, gestureState, this);
      }

      if (rightButtonsActivated && !rightButtonsOpen) {
        onRightButtonsOpenRelease(event, gestureState, this);
      }

      if (!rightButtonsActivated && rightButtonsOpen) {
        onRightButtonsCloseRelease(event, gestureState, this);
      }

      this.setState({
        lastOffset: {x: releaseAnimationConfig.toValue.x, y: releaseAnimationConfig.toValue.y},
        leftActionActivated: false,
        rightActionActivated: false,
        leftButtonsOpen: leftButtonsActivated,
        rightButtonsOpen: rightButtonsActivated
      });

      pan.flattenOffset();

      releaseAnimationFn(pan, releaseAnimationConfig).start(() => {
        if (this._unmounted) {
          return;
        }

        onSwipeComplete(event, gestureState, this);

        if (leftActionActivated) {
          onLeftActionComplete(event, gestureState, this);
          onLeftActionDeactivate(event, gestureState, this);
        }

        if (rightActionActivated) {
          onRightActionComplete(event, gestureState, this);
          onRightActionDeactivate(event, gestureState, this);
        }

        if (leftButtonsActivated && !leftButtonsOpen) {
          onLeftButtonsOpenComplete(event, gestureState, this);
        }

        if (!leftButtonsActivated && leftButtonsOpen) {
          onLeftButtonsCloseComplete(event, gestureState, this);
        }

        if (rightButtonsActivated && !rightButtonsOpen) {
          onRightButtonsOpenComplete(event, gestureState, this);
        }

        if (!rightButtonsActivated && rightButtonsOpen) {
          onRightButtonsCloseComplete(event, gestureState, this);
        }
      });
    },
    [
      leftActionActivated,
      leftButtonsActivated,
      leftButtonsOpen,
      onLeftActionComplete,
      onLeftActionDeactivate,
      onLeftActionRelease,
      onLeftButtonsCloseComplete,
      onLeftButtonsCloseRelease,
      onLeftButtonsOpenComplete,
      onLeftButtonsOpenRelease,
      onRightActionComplete,
      onRightActionDeactivate,
      onRightActionRelease,
      onRightButtonsCloseComplete,
      onRightButtonsCloseRelease,
      onRightButtonsOpenComplete,
      onRightButtonsOpenRelease,
      onSwipeComplete,
      onSwipeRelease,
      pan,
      rightActionActivated,
      rightButtonsActivated,
      rightButtonsOpen,
    ],
  );

  const recenter = React.useCallback(
    (
      animationFn = swipeReleaseAnimationFn,
      animationConfig = swipeReleaseAnimationConfig,
      onDone,
    ) => {
      setLastOffset({x: 0, y: 0});
      setLeftActionActivated(false);
      setLeftButtonsActivated(false);
      setLeftButtonsOpen(false);
      setRightActionActivated(false);
      setRightButtonsActivated(false);
      setRightButtonsOpen(false);

      pan.flattenOffset();

      animationFn(pan, animationConfig).start(onDone);
    },
    [pan],
  );

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
    onMoveShouldSetPanResponderCapture: handleMoveShouldSetPanResponder,
    onPanResponderGrant: handlePanResponderStart,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderEnd,
    onPanResponderTerminate: handlePanResponderEnd,
    onPanResponderTerminationRequest: handlePanResponderEnd
  });

  return (
    <View onLayout={handleLayout} style={[ styles.container, style ]} {...panResponder.panHandlers} {...props}>
      {canSwipeRight && (
        <Animated.View style={[{ transform, marginLeft: -width, width }, leftContainerStyle ]}>
          {leftContent || renderButtons(leftButtons, true)}
        </Animated.View>
      )}
      <Animated.View style={[ { transform }, styles.content, contentContainerStyle ]}>{children}</Animated.View>
      {canSwipeLeft && (
        <Animated.View style={[ { transform, marginRight: -width, width }, rightContainerStyle ]}>
          {rightContent || renderButtons(rightButtons, false)}
        </Animated.View>
      )}
    </View>
  );
};

Swipeable.propTypes = {
  // elements
  children: PropTypes.any,
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  leftButtons: PropTypes.array,
  rightButtons: PropTypes.array,

  // left action lifecycle
  onLeftActionActivate: PropTypes.func,
  onLeftActionDeactivate: PropTypes.func,
  onLeftActionRelease: PropTypes.func,
  onLeftActionComplete: PropTypes.func,
  leftActionActivationDistance: PropTypes.number,
  leftActionReleaseAnimationFn: PropTypes.func,
  leftActionReleaseAnimationConfig: PropTypes.object,

  // right action lifecycle
  onRightActionActivate: PropTypes.func,
  onRightActionDeactivate: PropTypes.func,
  onRightActionRelease: PropTypes.func,
  onRightActionComplete: PropTypes.func,
  rightActionActivationDistance: PropTypes.number,
  rightActionReleaseAnimationFn: PropTypes.func,
  rightActionReleaseAnimationConfig: PropTypes.object,

  // left buttons lifecycle
  onLeftButtonsActivate: PropTypes.func,
  onLeftButtonsDeactivate: PropTypes.func,
  onLeftButtonsOpenRelease: PropTypes.func,
  onLeftButtonsOpenComplete: PropTypes.func,
  onLeftButtonsCloseRelease: PropTypes.func,
  onLeftButtonsCloseComplete: PropTypes.func,
  leftButtonWidth: PropTypes.number,
  leftButtonsActivationDistance: PropTypes.number,
  leftButtonsOpenReleaseAnimationFn: PropTypes.func,
  leftButtonsOpenReleaseAnimationConfig: PropTypes.object,
  leftButtonsCloseReleaseAnimationFn: PropTypes.func,
  leftButtonsCloseReleaseAnimationConfig: PropTypes.object,

  // right buttons lifecycle
  onRightButtonsActivate: PropTypes.func,
  onRightButtonsDeactivate: PropTypes.func,
  onRightButtonsOpenRelease: PropTypes.func,
  onRightButtonsOpenComplete: PropTypes.func,
  onRightButtonsCloseRelease: PropTypes.func,
  onRightButtonsCloseComplete: PropTypes.func,
  rightButtonWidth: PropTypes.number,
  rightButtonsActivationDistance: PropTypes.number,
  rightButtonsOpenReleaseAnimationFn: PropTypes.func,
  rightButtonsOpenReleaseAnimationConfig: PropTypes.object,
  rightButtonsCloseReleaseAnimationFn: PropTypes.func,
  rightButtonsCloseReleaseAnimationConfig: PropTypes.object,

  // base swipe lifecycle
  onSwipeStart: PropTypes.func,
  onSwipeMove: PropTypes.func,
  onSwipeRelease: PropTypes.func,
  onSwipeComplete: PropTypes.func,
  swipeReleaseAnimationFn: PropTypes.func,
  swipeReleaseAnimationConfig: PropTypes.object,

  // misc
  onRef: PropTypes.func,
  onPanAnimatedValueRef: PropTypes.func,
  swipeStartMinDistance: PropTypes.number,

  // styles
  style: ViewPropTypes.style,
  leftContainerStyle: ViewPropTypes.style,
  leftButtonContainerStyle: ViewPropTypes.style,
  rightContainerStyle: ViewPropTypes.style,
  rightButtonContainerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style
};

Swipeable.defaultProps = {
  leftContent: null,
  rightContent: null,
  leftButtons: null,
  rightButtons: null,

  // left action lifecycle
  onLeftActionActivate: noop,
  onLeftActionDeactivate: noop,
  onLeftActionRelease: noop,
  onLeftActionComplete: noop,
  leftActionActivationDistance: 125,
  leftActionReleaseAnimationFn: null,
  leftActionReleaseAnimationConfig: null,

  // right action lifecycle
  onRightActionActivate: noop,
  onRightActionDeactivate: noop,
  onRightActionRelease: noop,
  onRightActionComplete: noop,
  rightActionActivationDistance: 125,
  rightActionReleaseAnimationFn: null,
  rightActionReleaseAnimationConfig: null,

  // left buttons lifecycle
  onLeftButtonsActivate: noop,
  onLeftButtonsDeactivate: noop,
  onLeftButtonsOpenRelease: noop,
  onLeftButtonsOpenComplete: noop,
  onLeftButtonsCloseRelease: noop,
  onLeftButtonsCloseComplete: noop,
  leftButtonWidth: 75,
  leftButtonsActivationDistance: 75,
  leftButtonsOpenReleaseAnimationFn: null,
  leftButtonsOpenReleaseAnimationConfig: null,
  leftButtonsCloseReleaseAnimationFn: null,
  leftButtonsCloseReleaseAnimationConfig: null,

  // right buttons lifecycle
  onRightButtonsActivate: noop,
  onRightButtonsDeactivate: noop,
  onRightButtonsOpenRelease: noop,
  onRightButtonsOpenComplete: noop,
  onRightButtonsCloseRelease: noop,
  onRightButtonsCloseComplete: noop,
  rightButtonWidth: 75,
  rightButtonsActivationDistance: 75,
  rightButtonsOpenReleaseAnimationFn: null,
  rightButtonsOpenReleaseAnimationConfig: null,
  rightButtonsCloseReleaseAnimationFn: null,
  rightButtonsCloseReleaseAnimationConfig: null,

  // base swipe lifecycle
  onSwipeStart: noop,
  onSwipeMove: noop,
  onSwipeRelease: noop,
  onSwipeComplete: noop,
  swipeReleaseAnimationFn: Animated.timing,
  swipeReleaseAnimationConfig: {
    toValue: {x: 0, y: 0},
    duration: 250,
    easing: Easing.elastic(0.5)
  },

  // misc
  onRef: noop,
  onPanAnimatedValueRef: noop,
  swipeStartMinDistance: 15
};

export default React.memo(Swipeable);












export default class Swipeable extends PureComponent {

  componentWillMount() {
    onRef(this);
    onPanAnimatedValueRef(this.state.pan);
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  _unmounted = false;

  React.useEffect(
    () => {},
    [onPanAnimatedValueRef, onRef, pan],
  );
}
