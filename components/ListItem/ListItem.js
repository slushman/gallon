import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as colors from '../../constants/colors';

const iconWrap = {
  justifyContent: 'center',
  padding: 16,
};

const leftContentStyle = {
  flexDirection: 'row',
};

const leftContentTextStyle = {
  justifyContent: 'center',
};

const leftContentIconWrap = {
  justifyContent: 'center',
  paddingRight: 8,
};

const listItemWrap = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 16,
  paddingVertical: 8,
};

const rightContentStyle = {
  flexDirection: 'row',
};

const rightContentTextStyle = {
  justifyContent: 'center',
};

const ListItem = ({
  isSelected,
  leftContent,
  leftIcon,
  onPress,
  rightContent,
  subtitle,
}) => {
  const icon = React.useMemo(
    () => {
      if (isSelected) {
        return (
          <View style={iconWrap}>
            <MCIcon color={colors.gallonBlue} name="check" size={20} />
          </View>
        );
      }

      return (
        <View style={iconWrap}>
          <MCIcon color={colors.gallonLightGray} name="chevron-right" size={20} />
        </View>
      );
    },
    [isSelected],
  );

  const leftIconContent = React.useMemo(
    () => {
      if (!leftIcon) return null;
      const color = isSelected ? colors.gallonBlue : colors.gallonLightGray;

      return (
        <View style={leftContentIconWrap}>
          <MCIcon color={color} name={leftIcon} size={25} />
        </View>
      );
    },
    [leftIcon, isSelected],
  );

  const right = React.useMemo(
    () => {
      if (!rightContent) return null;

      return (
        <View style={rightContentTextStyle}>
          <Text>{rightContent}</Text>
        </View>
      );
    },
    [rightContent],
  );

  const subtitleContent = React.useMemo(
    () => {
      if (!subtitle) return null;

      return (<Text>{subtitle}</Text>);
    },
    [subtitle],
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={listItemWrap}>
        <View style={leftContentStyle}>
          {leftIconContent}
          <View style={leftContentTextStyle}>
            <Text>{leftContent}</Text>
            {subtitleContent}
          </View>
        </View>
        <View style={rightContentStyle}>
          {right}
          {icon}
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  isSelected: PropTypes.bool,
  leftContent: PropTypes.string,
  leftIcon: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  rightContent: PropTypes.string,
  subtitle: PropTypes.string,
};

ListItem.defaultProps = {
  isSelected: false,
  leftContent: '',
  leftIcon: undefined,
  rightContent: '',
  subtitle: '',
};

export default React.memo(ListItem);
