import React from 'react';
import { Pressable, View } from 'react-native';
import PropTypes from 'prop-types';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Text from '../../components/Text';
import { useDarkmode } from '../../hooks/useDarkMode';
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
  const isDarkMode = useDarkmode();
  const bgContrast = colors.getBgContrast(isDarkMode);
  const gallonBlue = colors.getBlue(isDarkMode);

  const icon = React.useMemo(
    () => {
      if (isSelected) {
        return (
          <View style={styles.iconWrap}>
            <MCIcon color={gallonBlue} name="check" size={20} />
          </View>
        );
      }

      return (
        <View style={styles.iconWrap}>
          <MCIcon color={colors.perfectGray} name="chevron-right" size={20} />
        </View>
      );
    },
    [gallonBlue, isSelected],
  );

  const leftIconContent = React.useMemo(
    () => {
      if (!leftIcon) return null;
      const color = isSelected ? gallonBlue : colors.perfectGray;

      return (
        <View style={styles.leftContentIconWrap}>
          <MCIcon color={color} name={leftIcon} size={25} />
        </View>
      );
    },
    [gallonBlue, leftIcon, isSelected],
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

  const leftContentTextStyle = React.useMemo(
    () => ({
      color: bgContrast,
      fontSize: 16,
    }),
    [bgContrast],
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

      return (<Text style={styles.subtitleTextStyle}>{subtitle}</Text>);
    },
    [subtitle],
  );

  return (
    <Pressable onPress={onPress} style={listItemWrapStyle}>
      <View style={styles.leftContentStyle}>
        {leftIconContent}
        <View style={styles.leftContentTextWrapStyle}>
          <Text style={leftContentTextStyle}>{leftContent}</Text>
          {subtitleContent}
        </View>
      </View>
      <View style={styles.rightContentStyle}>
        {right}
        {icon}
      </View>
    </Pressable>
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
