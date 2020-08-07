import React from 'react';
import { Pressable, View } from 'react-native';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import Text from '../../components/Text';
import * as colors from '../../constants/colors';
import * as routes from '../../constants/routes';
import * as uniStyles from '../../utils/styles';
import { useDarkmode } from '../../hooks/useDarkMode';

const ServicesField = (props) => {
  const [field, meta, { setValue }] = useField(props);
  const { entry, navigate, services: serviceList } = props;
  const services = R.propOr(serviceList, 'services', entry);
  let hasServices = services.length > 0;
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);
  const bgContrast = colors.getBgContrast(isDarkMode);

  React.useEffect(
    () => {
      const hasNewServices = R.prop('value', field) !== services;
      if (hasServices && hasNewServices) {
        setValue(services);
      }
    },
    [field, hasServices, services, setValue],
  );

  const goToSelectServices = React.useCallback(
    () => navigate(routes.SELECT_SERVICES, { entry }),
    [entry, navigate],
  );

  const labelStyle = React.useMemo(
    () => ({
      color: bgContrast,
      fontSize: hasServices ? 14 : 20,
    }),
    [bgContrast, hasServices],
  );

  const labelWrapperStyle = React.useMemo(
    () => ({
      backgroundColor: bgColor,
      elevation: 100000,
      left: 3,
      marginLeft: hasServices ? 4 : undefined,
      paddingHorizontal: hasServices ? 2 : 7,
      paddingTop: 6,
      position: 'absolute',
      top: hasServices ? -15 : 3,
    }),
    [bgColor, hasServices],
  );

  const wrapperStyle = React.useMemo(
    () => ({
      borderColor: bgContrast,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      marginBottom: 20,
      marginHorizontal: 20,
      padding: hasServices ? 1 : 4,
    }),
    [bgContrast, hasServices],
  );

  return (
    <Pressable onPress={goToSelectServices} style={wrapperStyle}>
      <View style={labelWrapperStyle}>
        <Text style={labelStyle}>Services</Text>
      </View>
      <Text style={uniStyles.inputStyle}>{hasServices ? R.join(', ', services) : ''}</Text>
    </Pressable>
  );
};

ServicesField.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default React.memo(ServicesField);
