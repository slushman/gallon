import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as colors from '../../constants/colors';
import * as styles from './styles';

const ListItem = ({
  isSelected,
  leftContent,
  leftIcon,
  noPadding,
  onPress,
  rightContent,
  shortItem,
  subtitle,
}) => {
  const icon = React.useMemo(
    () => {
      if (isSelected) {
        return (
          <View style={styles.iconWrap}>
            <MCIcon color={colors.gallonBlue} name="check" size={20} />
          </View>
        );
      }

      return (
        <View style={styles.iconWrap}>
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
        <View style={styles.leftContentIconWrap}>
          <MCIcon color={color} name={leftIcon} size={25} />
        </View>
      );
    },
    [leftIcon, isSelected],
  );

  const listItemWrapStyle = React.useMemo(
    () => {
      let style = {
        flexDirection: 'row',
        justifyContent: 'space-between',
      };

      if (!noPadding) {
        style = {
          ...style,
          paddingLeft: 16,
        };

        if (!shortItem) {
          style = {
            ...style,
            paddingVertical: 8,
          };
        }
      }

      return style;
    },
    [noPadding, shortItem],
  );

  const right = React.useMemo(
    () => {
      if (!rightContent) return null;

      return (
        <View style={styles.rightContentTextStyle}>
          <Text>{rightContent}</Text>
        </View>
      );
    },
    [rightContent],
  );

  const subtitleContent = React.useMemo(
    () => {
      if (!subtitle) return null;

      return (<Text style={{ color: colors.gallonMedGray }}>{subtitle}</Text>);
    },
    [subtitle],
  );

  return (
    <TouchableOpacity onPress={onPress} style={listItemWrapStyle}>
      <View style={styles.leftContentStyle}>
        {leftIconContent}
        <View style={styles.leftContentTextStyle}>
          <Text style={{ fontSize: 16 }}>{leftContent}</Text>
          {subtitleContent}
        </View>
      </View>
      <View style={styles.rightContentStyle}>
        {right}
        {icon}
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  isSelected: PropTypes.bool,
  leftContent: PropTypes.string,
  leftIcon: PropTypes.string,
  noPadding: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  rightContent: PropTypes.string,
  shortItem: PropTypes.bool,
  subtitle: PropTypes.string,
};

ListItem.defaultProps = {
  isSelected: false,
  leftContent: '',
  leftIcon: undefined,
  noPadding: false,
  rightContent: '',
  shortItem: false,
  subtitle: '',
};

export default React.memo(ListItem);
