import React from 'react';
import { Pressable, View } from 'react-native';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import Text from '../../components/Text';
import * as colors from '../../constants/colors';
import * as routes from '../../constants/routes';
import { inputStyle } from '../TextField/styles';
import { useDarkmode } from '../../hooks/useDarkMode';

const ServicesField = (props) => {
  const [field, meta, { setTouched, setValue }] = useField(props);
  const { navigate, servicesList } = props;
  let hasServices = servicesList.length > 0;
  const isDarkMode = useDarkmode();

  React.useEffect(
    () => {
      const hasNewServices = R.prop('value', field) !== servicesList;
      if (hasServices && hasNewServices) {
        setValue(servicesList);
      }
    },
    [field, hasServices, servicesList, setValue],
  );

  const goToSelectServices = React.useCallback(
    () => {
      setTouched(true);
      navigate(routes.SELECT_SERVICES, { servicesList });
    },
    [navigate, servicesList, setTouched],
  );

  const labelStyle = React.useMemo(
    () => {
      let color = colors.gallonBlack;

      if (isDarkMode && hasServices) {
        color = colors.darkGallonBlue;
      } else if (isDarkMode && !hasServices) {
        color = colors.gallonLightGray;
      } else if (!isDarkMode && hasServices) {
        color = colors.gallonBlue;
      }

      return {
        color,
        fontSize: hasServices ? 14 : 20,
      };
    },
    [hasServices, isDarkMode],
  );

  const labelWrapperStyle = React.useMemo(
    () => ({
      backgroundColor: isDarkMode ? colors.gallonBlack : colors.gallonLightGray,
      elevation: 100000,
      left: 3,
      marginLeft: hasServices ? 4 : undefined,
      paddingHorizontal: hasServices ? 2 : 7,
      paddingTop: 6,
      position: 'absolute',
      top: hasServices ? -15 : 3,
    }),
    [hasServices, isDarkMode],
  );

  const wrapperStyle = React.useMemo(
    () => {
      let borderColor = colors.gallonBlack;

      if (isDarkMode && hasServices) {
        borderColor = colors.darkGallonBlue;
      } else if (isDarkMode && !hasServices) {
        borderColor = colors.gallonLightGray;
      } else if (!isDarkMode && hasServices) {
        borderColor = colors.gallonBlue;
      }

      return {
        borderColor,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 20,
        marginHorizontal: 20,
        padding: hasServices ? 1 : 4,
      };
    },
    [hasServices, isDarkMode],
  );

  return (
    <Pressable onPress={goToSelectServices} style={wrapperStyle}>
      <View style={labelWrapperStyle}>
        <Text style={labelStyle}>Services</Text>
      </View>
      <Text style={inputStyle}>{hasServices ? R.join(', ', servicesList) : ''}</Text>
    </Pressable>
  );
};

ServicesField.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default React.memo(ServicesField);
