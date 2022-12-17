import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import { Size } from '../../constants/enums';
import Text from '../Text';
import { HeadingProps } from './types';

export const headings = [
  Size.XL,
  Size.LG,
  Size.MD,
  Size.SM,
  Size.XS,
];

const Heading: React.FC<HeadingProps> = ({
  center = false,
  label,
  noPadding = false,
  size = Size.MD,
}) => {
  const headingViewStyle: ViewStyle = React.useMemo(
    () => ({
      alignItems: center ? 'center' : undefined,
      justifyContent: center ? 'center' : undefined,
      marginBottom: size,
    }),
    //   let style = {
    //     marginBottom: size,
    //   };
    //   if (center) {
    //     style = {
    //       ...style,
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     };
    //   }
    //   return style;
    // },
    [center, size],
  );

  const headingTextStyle: TextStyle & ViewStyle = React.useMemo(
    () => ({
      fontSize: size,
      fontWeight: 'bold',
      paddingHorizontal: noPadding ? 16 : 0,
    }),

      // let style = {
      //   fontWeight: 'bold',
      //   fontSize: size,
      // };

      // if (!noPadding) {
      //   style = {
      //     ...style,
      //     paddingHorizontal: noPadding ? 16 : 0,
      //   };
      // }

      // return style;
    //},
    [noPadding, size],
  );

  return (
    <View style={headingViewStyle}>
      <Text style={headingTextStyle}>{label}</Text>
    </View>
  );
};

export default React.memo(Heading);
