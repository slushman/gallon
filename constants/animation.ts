import { AnimationType } from '../hooks/useAnimation/types';

export const duration: number = 250;
export const useNativeDriver: boolean = false;

interface AnimationSettingsProps {
  duration: number,
  type: AnimationType,
  useNativeDriver: boolean,
}

export const springSettings: AnimationSettingsProps = {
  duration,
  type: 'spring',
  useNativeDriver,
};

export const timingSettings: AnimationSettingsProps = {
  duration,
  type: 'timing',
  useNativeDriver,
};
