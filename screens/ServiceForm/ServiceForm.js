import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import ScrollView from '../../components/ScrollView';
import ServicesField from '../../components/ServicesField';
import TextField from '../../components/TextField';
import VehicleChooser from '../../components/VehicleChooser';
import Wrapper from '../../components/Wrapper';
import * as serviceTypes from '../../constants/services';
import * as utils from '../../utils';

const today = dayjs();

const ServiceSchema = Yup.object().shape({
  serviceOdometer: Yup.number().required('Enter the current odometer reading.'),
  serviceTotal: Yup.number().required('Enter the total price for this fillup.'),
});

const ServiceForm = ({ navigation: { navigate, setOptions }, route }) => {
  console.log({ route });
  const selectedServices = R.pathOr([], ['params', 'selectedServices'], route);
  const entry = R.pathOr({}, ['params', 'entry'], route);
  const date = R.propOr('', 'date', entry);
  const odometer = R.propOr('', 'odometer', entry);
  const services = R.propOr(selectedServices, 'services', entry);
  const total = R.propOr('', 'total', entry);
  const vehicle = R.propOr(0, 'vehicle', entry);

  React.useLayoutEffect(() => {
    setOptions({
      title: R.isEmpty(entry) ? 'New Service' : 'Edit Service',
    });
  }, [entry, setOptions]);

  const submitForm = React.useCallback((values) => {
    const serviceDateString = dayjs(R.prop('serviceDate', values)).toISOString();
    const newValues = R.assoc('serviceDate', serviceDateString, values);

    console.log(newValues);
  }, []);

  const hasOtherService = R.includes(serviceTypes.OTHER, services);
  const requiredFields = ['serviceOdometer', 'serviceTotal', 'services', 'serviceVehicle'];

  const initialValues = React.useMemo(
    () => ({
      serviceDate: date === '' ? today : dayjs(date),
      serviceOdometer: odometer,
      services,
      serviceTotal: total,
      serviceVehicle: vehicle,
    }),
    [date, odometer, services, total, vehicle],
  );

  if (hasOtherService) {
    requiredFields.push('servicesOther');
  }

  const OtherField = React.useMemo(
    () => {
      if (!hasOtherService) return null;

      return (
        <TextField
          fieldName="servicesOther"
          label="Other Details"
          multiline={true}
          name="servicesOther"
          numberOfLines={4}
        />
      );
    },
    [hasOtherService],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitForm(values)}
      validationSchema={ServiceSchema}
    >
      {({ handleSubmit, values }) => {
        const hasAllRequired = utils.allHaveValues(requiredFields, values);

        return (
          <Wrapper>
            <ScrollView>
              <VehicleChooser name="serviceVehicle" />
              <DatePicker label="Date" name="serviceDate" />
              <TextField
                keyboardType="numeric"
                label="Odometer"
                name="serviceOdometer"
              />
              <TextField
                keyboardType="numeric"
                label="Total"
                name="serviceTotal"
              />
              <ServicesField
                entry={entry}
                name="services"
                navigate={navigate}
                services={services}
              />
              {OtherField}
              <Button disabled={!hasAllRequired} label="Save Service Entry" onPress={handleSubmit} />
            </ScrollView>
          </Wrapper>
        );
      }}
    </Formik>
  );
};

ServiceForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({}),
};

export default React.memo(ServiceForm);
