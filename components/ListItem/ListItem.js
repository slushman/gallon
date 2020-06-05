import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Micon from 'react-native-vector-icons/MaterialIcons';

import * as colors from '../../constants/colors';
import * as utils from '../../utils';

const prefix = utils.getPrefix();

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
  onPress,
  rightContent,
  subtitle,
}) => {
  const icon = React.useMemo(
    () => {
      if (isSelected) {
        return (
          <View style={iconWrap}>
            <Micon color={colors.gallonBlue} name="check" size={20} />
          </View>
        );
      }

      return (
        <View style={iconWrap}>
          <Icon color={colors.gallonLightGray} name={`${prefix}arrow-forward`} size={20} />
        </View>
      );
    },
    [isSelected],
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
          <View style={leftContentTextStyle}>
            <Text>{leftContent}</Text>
            {subtitleContent}
          </View>
        </View>
        <View style={rightContentStyle}>
          <View style={rightContentTextStyle}>
            <Text>{rightContent}</Text>
          </View>
          {icon}
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  isSelected: PropTypes.bool,
  leftContent: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  rightContent: PropTypes.string,
  subtitle: PropTypes.string,
};

ListItem.defaultProps = {
  isSelected: false,
  leftContent: '',
  rightContent: '',
  subtitle: '',
};

export default React.memo(ListItem);
