import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import * as R from 'ramda';
import { useField } from 'formik';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Text from '../Text';
import * as colors from '../../utils/colors';
import { Route } from '../../constants/enums';
import * as uniStyles from '../../utils/styles';
import { useDarkmode } from '../../hooks';
import * as fieldUtils from '../../utils/fields';
import { ServicesFieldProps, ServicesArray } from './types';

const ServicesField: React.FC<ServicesFieldProps> = ({ entry, name, navigate, services: serviceList = [] }) => {
  const [field, { error, touched }, { setTouched, setValue }] = useField(name);
  // const { entry, navigate, services: serviceList } = props;
  const services: ServicesArray = R.propOr(serviceList, 'services', entry);
  let hasServices = services.length > 0;
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);
  const fieldTouched = touched && hasServices;
  const fieldStatus = fieldUtils.getFieldStatus(error, field, fieldTouched);
  const borderAndTextColor = fieldUtils.getBorderAndTextColor(fieldStatus, false);
  const statusIcon = fieldUtils.getStatusIcon(fieldStatus, false);

  React.useEffect(
    () => {
      const hasNewServices = R.prop('value', field) !== services;
      if (hasServices && hasNewServices) {
        setTouched(true);
        setValue(services);
      }
    },
    [field, hasServices, services, setTouched, setValue],
  );

  const goToSelectServices = React.useCallback(
    () => navigate(Route.SELECT_SERVICES, { entry, services }),
    [entry, navigate, services],
  );

  const labelStyle = React.useMemo(
    () => ({
      ...uniStyles.inputLabelText,
      color: borderAndTextColor,
    }),
    [borderAndTextColor],
  );

  const labelWrapperStyle: ViewStyle = React.useMemo(
    () => ({
      backgroundColor: bgColor,
      elevation: 100000,
      left: 3,
      marginLeft: 4,
      paddingHorizontal: 2,
      paddingTop: 6,
      position: 'absolute',
      top: -15,
    }),
    [bgColor],
  );

  const wrapperStyle: ViewStyle = React.useMemo(
    () => ({
      borderColor: borderAndTextColor,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      marginBottom: 20,
      marginHorizontal: 20,
      padding: hasServices ? 1 : 4,
    }),
    [borderAndTextColor, hasServices],
  );

  const FieldIcon = React.useMemo(
    () => {
      if (statusIcon === '') return null;

      return (
        <View style={uniStyles.fieldIconStyle}>
          <MCIcon color={borderAndTextColor} name={statusIcon} size={25} />
        </View>
      );
    },
    [borderAndTextColor, statusIcon],
  );

  return (
    <Pressable onPress={goToSelectServices} style={wrapperStyle}>
      <View style={labelWrapperStyle}>
        <Text style={labelStyle}>Services</Text>
      </View>
      <Text style={uniStyles.inputStyle}>{hasServices ? R.join(', ', services) : ''}</Text>
      {FieldIcon}
    </Pressable>
  );
};

export default React.memo(ServicesField);
