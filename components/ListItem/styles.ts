import { TextStyle, ViewStyle } from 'react-native';

import { Color } from '../../constants/enums';

export const iconWrap: ViewStyle = {
  justifyContent: 'center',
  paddingVertical: 16,
};

export const leftContentStyle: ViewStyle = {
  flexDirection: 'row',
};

export const leftContentTextWrapStyle: ViewStyle = {
  justifyContent: 'center',
};

export const leftContentIconWrap: ViewStyle = {
  justifyContent: 'center',
  paddingRight: 8,
};

export const rightContentStyle: ViewStyle = {
  flexDirection: 'row',
};

export const rightContentTextStyle: ViewStyle = {
  justifyContent: 'center',
};

export const subtitleTextStyle: TextStyle = {
  color: Color.PERFECT_GRAY,
};
