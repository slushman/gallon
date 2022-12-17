import { Animated } from 'react-native';

export type ToValue =
  | number
  | Animated.AnimatedValue
  | { x: number; y: number }
  | Animated.AnimatedValueXY;

export type AnimationType = 'spring' | 'timing';

interface BaseAnimationProps {
  initialValue?: number,
  type?: AnimationType,
}

interface AnimationProps {
  duration: number,
  toValue?: ToValue,
  useNativeDriver?: boolean,
}

export type TimingAnimationProps = BaseAnimationProps & AnimationProps &
  ({ type: 'timing' } & Animated.TimingAnimationConfig)

export type SpringAnimationProps = BaseAnimationProps & AnimationProps &
  ({ type: 'spring' } & Animated.SpringAnimationConfig)


export type UseAnimationProps = TimingAnimationProps | SpringAnimationProps;
