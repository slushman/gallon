import React from 'react';
import { Animated } from 'react-native';
import {
  UseAnimationProps,
} from './types';

const getInitialValue = (config: UseAnimationProps) => {
  if (typeof config.initialValue !== 'undefined') {
    return config.initialValue;
  } else {
    return config.toValue as number;
  }
};

export const useAnimatedValue = (initialValue: number): Animated.Value => {
  const ref = React.useRef(new Animated.Value(initialValue));
  return ref.current;
};

export const useAnimation = (config: UseAnimationProps): Animated.Value => {
  const animatedValue = useAnimatedValue(getInitialValue(config));

  const animate = () => {
    if (config.type === 'timing') {
      Animated.timing(animatedValue, config).start();
    } else if (config.type === 'spring') {
      Animated.spring(animatedValue, config).start();
    } else {
      // @ts-ignore
      throw new Error('unsupported animation type=' + config.type);
    }
  };

  // Currently useEffect is buggy, see https://github.com/facebook/react-native/issues/21967
  React.useEffect(animate, [animatedValue, config]);

  return animatedValue;
};
