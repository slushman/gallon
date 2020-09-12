import React from 'react';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import * as R from 'ramda';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import ScrollView from '../../components/ScrollView';
import TextField from '../../components/TextField';
import VehicleChooser from '../../components/VehicleChooser';
import Wrapper from '../../components/Wrapper';
import * as utils from '../../utils';

const today = dayjs();

const FillupSchema = Yup.object().shape({
  fillupGallons: Yup.number().required('Enter the total gallons for this fillup.'),
  fillupOdometer: Yup.number().required('Enter the current odometer reading.'),
  fillupTotal: Yup.number().required('Enter the total price for this fillup.'),
});

const FillupForm = ({ navigation: { setOptions }, route }) => {
  const entry = R.pathOr('', ['params', 'entry'], route);

  console.log({ route, entry });

  const date = R.propOr('', 'date', entry);
  const gallons = R.propOr('', 'gallons', entry);
  const odometer = R.propOr('', 'odometer', entry);
  const total = R.propOr('', 'total', entry);
  const vehicle = R.propOr(0, 'vehicle', entry);
  const requiredFields = ['fillupOdometer', 'fillupTotal', 'fillupGallons', 'fillupVehicle'];

  React.useLayoutEffect(() => {
    setOptions({
      title: R.isEmpty(entry) ? 'New Fillup' : 'Edit Fillup',
    });
  }, [entry, setOptions]);

  const initialValues = React.useMemo(
    () => ({
      fillupDate: date === '' ? today : dayjs(date),
      fillupGallons: gallons,
      fillupOdometer: odometer,
      fillupTotal: total,
      fillupVehicle: vehicle,
    }),
    [date, gallons, odometer, total, vehicle ],
  );

  const getOdometer = React.useCallback(
    () => {
      // get previous entry
      // If there is one, get the odometer reading and add it to this entry
      // If there isn't one, get the vehicle once it's chosen,
      //    get its odometer, then add it to this entry
    },
    [],
  );

  const submitButton = React.useMemo(
    (handleSubmit, disabled) => () => (
      <Button disabled={disabled} label="Save Fill-up" onPress={handleSubmit} />
    ),
    [],
  );

  const submitForm = React.useCallback((values) => { console.log(values); }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitForm(values)}
      validationSchema={FillupSchema}
    >
      {({ handleSubmit, values }) => {
        const hasAllRequired = utils.allHaveValues(requiredFields, values);

        if (utils.hasValue(R.prop('fillupVehicle', values))) {
          getOdometer();
        }

        return (
          <Wrapper>
            <ScrollView>
              <VehicleChooser name="fillupVehicle" />
              <DatePicker label="Date" name="fillupDate" />
              <TextField
                keyboardType="numeric"
                label="Gallons"
                name="fillupGallons"
              />
              <TextField
                keyboardType="numeric"
                label="Total"
                name="fillupTotal"
              />
              <TextField
                keyboardType="numeric"
                label="Odometer"
                name="fillupOdometer"
              />
              {submitButton(handleSubmit, !hasAllRequired)}
            </ScrollView>
          </Wrapper>
        );
    }}
    </Formik>
  );
};

export default React.memo(FillupForm);
