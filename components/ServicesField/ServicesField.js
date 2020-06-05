import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';

import * as colors from '../../constants/colors';
import * as routes from '../../constants/routes';
import { inputStyle } from '../TextField/styles';
import { updateArray } from '../../utils';

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
  marginBottom: 30,
  marginHorizontal: 20,
  padding: 5,
};

const ServicesField = (props) => {
  // const [field, { error, touched }, { setTouched }] = useField(props);
  const [services, setServices] = React.useState([]);
  // const services = ['Oil change, Rotate tires'];
  const hasServices = services.length > 0;
  const { navigate } = props;
  const [field, { error, touched }, { setTouched }] = useField(props);

  const updateValues = React.useCallback(
    (value) => {
      const updatedValues = updateArray(services, value);
      setServices(updatedValues);
    },
    [services],
  );

  const goToSelectServices = React.useCallback(
    () => navigate(routes.SELECT_SERVICES, { updateValues }),
    [navigate, updateValues],
  );

  const labelStyle = React.useMemo(
    () => ({
      color: hasServices ? 'black' : colors.gallonLightGray,
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
      borderColor: hasServices ? 'black' : 'transparent',
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
        <Text style={inputStyle}>{hasServices ? R.join(', ', services) : ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

ServicesField.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default React.memo(ServicesField);
