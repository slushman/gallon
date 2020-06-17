import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import ServicesField from '../../components/ServicesField';
import TextField from '../../components/TextField';
import Wrapper from '../../components/Wrapper';
import * as utils from '../../utils';
import * as services from '../../constants/services';

const today = dayjs();

const initialValues = {
  serviceDate: today,
  serviceOdometer: '',
  services: [],
  serviceTotal: '',
};

const ServiceSchema = Yup.object().shape({
  serviceOdometer: Yup.number().required('Enter the current odometer reading.'),
  serviceTotal: Yup.number().required('Enter the total price for this fillup.'),
});

const NewService = ({ navigation: { navigate }, route }) => {
  const submitForm = React.useCallback((values) => { console.log(values); }, []);
  const servicesList = R.pathOr([], ['params', 'services'], route);
  const hasOtherService = R.includes(services.OTHER, servicesList);
  const requiredFields = ['serviceOdometer', 'serviceTotal', 'services'];

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
          <Wrapper centerContent>
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
            <ServicesField name="services" navigate={navigate} servicesList={servicesList} />
            {OtherField}
            <Button disabled={!hasAllRequired} label="Save" onPress={handleSubmit} />
          </Wrapper>
        );
      }}
    </Formik>
  );
};

NewService.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({}),
};

export default React.memo(NewService);
