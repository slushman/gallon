import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import * as colors from '../../constants/colors';
import * as routes from '../../constants/routes';
import { inputStyle } from '../TextField/styles';

const labelWrapStyle = {
  backgroundColor: 'white',
  elevation: 100000,
  left: 3,
  paddingHorizontal: 2,
  position: 'absolute',
};

const wrapStyle = {
  borderRadius: 5,
  borderStyle: 'solid',
  borderWidth: 1,
  marginBottom: 20,
  marginHorizontal: 20,
};

const ServicesField = (props) => {
  const [field, meta, { setTouched, setValue }] = useField(props);
  const { navigate, servicesList } = props;
  let hasServices = servicesList.length > 0;

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
    () => ({
      color: hasServices ? colors.gallonBlack : colors.gallonLightGray,
      fontSize: hasServices ? 14 : 20,
    }),
    [hasServices],
  );

  const labelWrapperStyle = React.useMemo(
    () => ({
      top: hasServices ? -15 : 3,
      ...labelWrapStyle,
    }),
    [hasServices],
  );

  const wrapperStyle = React.useMemo(
    () => ({
      borderColor: hasServices ? colors.gallonBlack : colors.transparent,
      ...wrapStyle,
    }),
    [hasServices],
  );

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity onPress={goToSelectServices}>
        <View style={labelWrapperStyle}>
          <Text style={labelStyle}>Services</Text>
        </View>
        <Text style={inputStyle}>{hasServices ? R.join(', ', servicesList) : ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

ServicesField.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default React.memo(ServicesField);
