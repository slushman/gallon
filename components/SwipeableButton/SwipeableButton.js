import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { actionButtonWidth } from '../../constants/sizes';
import { Color } from '../../constants/enums';
import Text from '../Text';
const SwipeableButton = ({ buttonProps, item, onClose, }) => {
    const { bgColor, label, onPress, textColor } = buttonProps;
    const rectButtonStyle = React.useCallback(() => ({
        backgroundColor: bgColor,
        justifyContent: 'center',
        width: actionButtonWidth,
    }), [bgColor]);
    const rectTextStyle = React.useMemo(() => {
        const color = textColor || Color.WHITE;
        return ({ color });
    }, [textColor]);
    const handlePress = React.useCallback(() => {
        onPress(item);
        onClose();
    }, [item, onClose, onPress]);
    return (<RectButton onPress={handlePress} style={rectButtonStyle()}>
      <Text center style={rectTextStyle}>{label}</Text>
    </RectButton>);
};
export default React.memo(SwipeableButton);
//# sourceMappingURL=SwipeableButton.js.map