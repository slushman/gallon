import React from 'react';
import { RectButton } from 'react-native-gesture-handler';

import { actionButtonWidth } from '../../constants/sizes';
import { Color } from '../../constants/enums';
import Text from '../Text';
import { SwipeableButtonProps } from './types';

const SwipeableButton: React.FC<SwipeableButtonProps> = ({
  bgColor,
  item,
  label,
  onClose,
  onPress,
  textColor = Color.WHITE,
}) => {
  const rectButtonStyle = React.useMemo(
    () => ({
      backgroundColor: bgColor,
      justifyContent: 'center' as 'center',
      width: actionButtonWidth,
    }),
    [bgColor],
  );

  const rectTextStyle = React.useMemo(() => ({ color: textColor }), [textColor]);

  const handlePress = React.useCallback(
    () => {
      if (onPress) {
        onPress(item);
      }
      onClose();
    },
    [item, onClose, onPress],
  );

  return (
    <RectButton onPress={handlePress} style={rectButtonStyle}>
      <Text center style={rectTextStyle}>{label}</Text>
    </RectButton>
  );
};

export default React.memo(SwipeableButton);
