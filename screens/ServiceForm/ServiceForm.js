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

const ServiceForm = ({ navigation: { navigate }, route }) => {
  const date = R.pathOr('', ['params', 'entry', 'date'], route);
  const odometer = R.pathOr('', ['params', 'entry', 'odometer'], route);
  const serviceList = R.pathOr([], ['params', 'services'], route);
  const services = R.pathOr(serviceList, ['params', 'entry', 'services'], route);
  const total = R.pathOr('', ['params', 'entry', 'total'], route);
  const vehicle = R.pathOr(0, ['params', 'entry', 'vehicle'], route);

  const submitForm = React.useCallback((values) => { console.log(values); }, []);
  const hasOtherService = R.includes(serviceTypes.OTHER, services);
  const requiredFields = ['serviceOdometer', 'serviceTotal', 'services', 'serviceVehicle'];

  const initialValues = React.useMemo(
    () => ({
      serviceDate: date === '' ? today : dayjs(date).toISOString(),
      serviceOdometer: odometer,
      services: services,
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
                fieldName="serviceOdometer"
                keyboardType="numeric"
                label="Odometer"
                name="serviceOdometer"
              />
              <TextField
                fieldName="serviceTotal"
                keyboardType="numeric"
                label="Total"
                name="serviceTotal"
              />
              <ServicesField
                name="services"
                navigate={navigate}
                servicesList={services}
              />
              {OtherField}
              <Button disabled={!hasAllRequired} label="Save" onPress={handleSubmit} />
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
