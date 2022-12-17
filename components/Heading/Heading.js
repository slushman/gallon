import React from 'react';
import { View } from 'react-native';
import { Size } from '../../constants/enums';
import Text from '../Text';
export const headings = [
    Size.XL,
    Size.LG,
    Size.MD,
    Size.SM,
    Size.XS,
];
const Heading = ({ center = false, label, noPadding = false, size = Size.MD, }) => {
    const headingViewStyle = React.useMemo(() => {
        let style = {
            marginBottom: size,
        };
        if (center) {
            style = Object.assign(Object.assign({}, style), { alignItems: 'center', justifyContent: 'center' });
        }
        return style;
    }, [center, size]);
    const headingTextStyle = React.useMemo(() => {
        let style = {
            fontWeight: 'bold',
            fontSize: size,
        };
        if (!noPadding) {
            style = Object.assign(Object.assign({}, style), { paddingHorizontal: 16 });
        }
        return style;
    }, [noPadding, size]);
    return (<View style={headingViewStyle}>
      <Text style={headingTextStyle}>{label}</Text>
    </View>);
};
export default React.memo(Heading);
//# sourceMappingURL=Heading.js.map