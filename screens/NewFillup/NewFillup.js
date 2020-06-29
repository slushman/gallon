import React from 'react';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import * as R from 'ramda';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import TextField from '../../components/TextField';
import VehicleChooser from '../../components/VehicleChooser';
import Wrapper from '../../components/Wrapper';
import * as utils from '../../utils';

const today = dayjs();

const initialValues = {
  fillupDate: today,
  fillupGallons: '',
  fillupOdometer: '',
  fillupTotal: '',
  fillupVehicle: 0,
};

const FillupSchema = Yup.object().shape({
  fillupGallons: Yup.number().required('Enter the total gallons for this fillup.'),
  fillupOdometer: Yup.number().required('Enter the current odometer reading.'),
  fillupTotal: Yup.number().required('Enter the total price for this fillup.'),
});

const NewFillup = () => {
  const getOdometer = React.useCallback(
    () => {
      // get previous entry
      // If there is one, get the odometer reading and add it to this entry
      // If there isn't one, get the vehicle once it's chosen,
      //    get its odometer, then add it to this entry
    },
    []
  );

  const submitForm = React.useCallback((values) => { console.log(values); }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitForm(values)}
      validationSchema={FillupSchema}
    >
      {({ handleSubmit, values }) => {
        const hasAllRequired = utils.allHaveValues(['fillupOdometer', 'fillupTotal', 'fillupGallons', 'fillupVehicle'], values);

        if (utils.hasValue(R.prop('fillupVehicle', values))) {
          getOdometer();
        }

        return (
          <Wrapper>
            <VehicleChooser name="fillupVehicle" />
            <DatePicker label="Date" name="fillupDate" />
            <TextField
              fieldName="fillupOdometer"
              keyboardType="numeric"
              label="Odometer"
              name="fillupOdometer"
            />
            <TextField
              fieldName="fillupTotal"
              keyboardType="numeric"
              label="Total"
              name="fillupTotal"
            />
            <TextField
              fieldName="fillupGallons"
              keyboardType="numeric"
              label="Gallons"
              name="fillupGallons"
            />
            <Button disabled={!hasAllRequired} label="Save" onPress={handleSubmit} />
          </Wrapper>
        );
    }}
    </Formik>
  );
};

export default React.memo(NewFillup);
