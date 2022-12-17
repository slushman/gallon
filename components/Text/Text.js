import React from 'react';
import { Text as RNText } from 'react-native';
import * as colors from '../../utils/colors';
import { useDarkmode } from '../../hooks/useDarkMode';
const Text = ({ center = false, children, style = {}, }) => {
    const isDarkMode = useDarkmode();
    const bgContrast = colors.getBgContrast(isDarkMode);
    const textAlign = center ? 'center' : 'auto';
    const textStyles = React.useMemo(() => (Object.assign({ color: bgContrast, textAlign }, style)), [bgContrast, style, textAlign]);
    return (<RNText style={textStyles}>{children}</RNText>);
};
export default React.memo(Text);
//# sourceMappingURL=Text.js.map