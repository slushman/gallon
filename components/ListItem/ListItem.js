import React from 'react';
import { Pressable, View } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import { useDarkmode } from '../../hooks/useDarkMode';
import { Color } from '../../constants/enums';
import * as colors from '../../utils/colors';
import * as styles from './styles';
const ListItem = ({ isSelected = false, leftContent = '', leftIcon = undefined, noPadding = false, onPress, rightContent = '', shortItem = false, subtitle = '', }) => {
    const isDarkMode = useDarkmode();
    const bgColor = colors.getBgColor(isDarkMode);
    const bgContrast = colors.getBgContrast(isDarkMode);
    const gallonBlue = colors.getBlue(isDarkMode);
    const icon = React.useMemo(() => {
        if (isSelected) {
            return (<View style={styles.iconWrap}>
            <MCIcon color={gallonBlue} name="check" size={20}/>
          </View>);
        }
        return (<View style={styles.iconWrap}>
          <MCIcon color={Color.PERFECT_GRAY} name="chevron-right" size={20}/>
        </View>);
    }, [gallonBlue, isSelected]);
    const leftIconContent = React.useMemo(() => {
        if (!leftIcon)
            return null;
        const color = isSelected ? gallonBlue : colors.PERFECT_GRAY;
        return (<View style={styles.leftContentIconWrap}>
          <MCIcon color={color} name={leftIcon} size={25}/>
        </View>);
    }, [gallonBlue, leftIcon, isSelected]);
    const listItemWrapStyle = React.useMemo(() => {
        let style = {
            backgroundColor: bgColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
        };
        if (!noPadding) {
            style = Object.assign(Object.assign({}, style), { paddingLeft: 16 });
            if (!shortItem) {
                style = Object.assign(Object.assign({}, style), { paddingVertical: 8 });
            }
        }
        return style;
    }, [bgColor, noPadding, shortItem]);
    const leftContentTextStyle = React.useMemo(() => ({
        color: bgContrast,
        fontSize: 16,
    }), [bgContrast]);
    const right = React.useMemo(() => {
        if (!rightContent)
            return null;
        return (<View style={styles.rightContentTextStyle}>
          <Text>{rightContent}</Text>
        </View>);
    }, [rightContent]);
    const subtitleContent = React.useMemo(() => {
        if (!subtitle)
            return null;
        return (<Text style={styles.subtitleTextStyle}>{subtitle}</Text>);
    }, [subtitle]);
    return (<Pressable onPress={onPress} style={listItemWrapStyle}>
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
    </Pressable>);
};
export default React.memo(ListItem);
//# sourceMappingURL=ListItem.js.map