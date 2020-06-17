import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { LEFT, RIGHT } from '../../constants/settings';

const HeaderButton = ({
  iconName,
  navigate,
  route,
  side,
  text,
}) => {
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
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

HeaderButton.propTypes = {
  iconName: PropTypes.string,
  navigate: PropTypes.func.isRequired,
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
