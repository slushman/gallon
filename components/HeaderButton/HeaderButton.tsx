import React from 'react';
import { Pressable, Platform, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Text from '../Text';
import * as colors from '../../utils/colors';
import { useDarkmode } from '../../hooks';
import { HeaderButtonProps } from './types';

const prefix = Platform.OS === 'ios' ? 'ios' : 'md';

const HeaderButton: React.FC<HeaderButtonProps> = ({
  leftIconName = undefined,
  onPress = () => {},
  rightIconName = undefined,
  route = '',
  routeParams,
  text = '',
}) => {
  const { navigate } = useNavigation();
  const isDarkMode = useDarkmode();
  const gallonBlue = colors.getBlue(isDarkMode);

  const handlePress = React.useCallback(
    () => {
      if (onPress !== null) {
        onPress(routeParams);
        return;
      }

      console.log({ routeParams });

      navigate(route, routeParams);
    },
    [navigate, onPress, route, routeParams],
  );

  const LeftIcon = React.useMemo(
    () => {
      if (!leftIconName) return null;

      return (<Ionicon color={gallonBlue} name={`${prefix}-${leftIconName}`} size={32} />);
    },
    [gallonBlue, leftIconName],
  );

  const RightIcon = React.useMemo(
    () => {
      if (!rightIconName) return null;

      return (<Ionicon color={gallonBlue} name={`${prefix}-${rightIconName}`} size={32} />);
    },
    [gallonBlue, rightIconName],
  );

  const textStyle = React.useMemo(
    () => ({
      color: gallonBlue,
      fontSize: 18,
      marginLeft: leftIconName ? 8 : undefined,
      marginRight: rightIconName ? 8 : undefined,
    }),
    [gallonBlue, leftIconName, rightIconName],
  );

  const pressableStyle: ViewStyle = React.useMemo(
    () => ({
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: leftIconName || text ? 8 : undefined,
      marginRight: rightIconName || text ? 8 : undefined,
    }),
    [leftIconName, rightIconName, text],
  );

  return (
    <Pressable onPress={handlePress} style={pressableStyle}>
      {LeftIcon}
      <Text style={textStyle}>{text}</Text>
      {RightIcon}
    </Pressable>
  );
};

export default React.memo(HeaderButton);