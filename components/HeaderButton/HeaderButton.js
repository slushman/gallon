import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import * as colors from '../../constants/colors';
import { LEFT, RIGHT } from '../../constants/settings';

const textStyle = {
  color: colors.gallonBlue,
  fontSize: 16,
};

const HeaderButton = ({
  route,
  side,
  text,
}) => {
  const { navigate } = useNavigation();

  const handlePress = React.useCallback(
    () => navigate(route),
    [navigate, route],
  );

  const touchableStyle = React.useMemo(
    () => ({
      marginLeft: side === LEFT ? 16 : undefined,
      marginRight: side === RIGHT ? 16 : undefined,
    }),
    [side],
  );

  return (
    <TouchableOpacity onPress={handlePress} style={touchableStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

HeaderButton.propTypes = {
  iconName: PropTypes.string,
  route: PropTypes.string,
  side: PropTypes.oneOf([LEFT, RIGHT]),
  text: PropTypes.string,
};

HeaderButton.defaultProps = {
  iconName: '',
  route: '',
  text: '',
};

export default React.memo(HeaderButton);
