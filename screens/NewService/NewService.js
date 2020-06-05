import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import ServicesField from '../../components/ServicesField';
import TextField from '../../components/TextField';
import Wrapper from '../../components/Wrapper';
import * as routes from '../../constants/routes';
import * as utils from '../../utils';

const today = dayjs();

const initialValues = {
  date: today,
  odometer: '',
  total: '',
  services: [],
};

const ServiceSchema = Yup.object().shape({
  gallons: Yup.number().required('Enter the total gallons for this fillup.'),
  odometer: Yup.number().required('Enter the current odometer reading.'),
  total: Yup.number().required('Enter the total price for this fillup.'),
});

const NewService = ({ navigation: { navigate } }) => {
  const selectServices = React.useCallback(
    () => navigate(routes.SELECT_SERVICES),
    [navigate],
  );

  const submitForm = React.useCallback((values) => { console.log(values); }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitForm(values)}
      validationSchema={ServiceSchema}
    >
      {({ handleSubmit, values }) => {
        const hasAllRequired = utils.allHaveValues(['odometer', 'total', 'gallons', 'services'], values);

        return (
          <Wrapper centerContent>
            <DatePicker label="Date" name="date" />
            <TextField
              fieldName="odometer"
              keyboardType="numeric"
              label="Odometer"
              name="odometer"
            />
            <TextField
              fieldName="total"
              keyboardType="numeric"
              label="Total"
              name="total"
            />
            <ServicesField name="services" navigate={navigate} />
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
};

export default React.memo(NewService);
