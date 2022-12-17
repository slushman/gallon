import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import Expandable from '../../components/Expandable/Expandable';
import ScrollView from '../../components/ScrollView';
import TextField from '../../components/TextField';
import Wrapper from '../../components/Wrapper';
import * as utils from '../../utils';

const today = dayjs();

const VehicleSchema = Yup.object().shape({
  vehicleMake: Yup.number().required('Enter the make for this vehicle.'),
  vehicleModel: Yup.number().required('Enter the model for this vehicle.'),
  vehicleName: Yup.number().required('Enter a name for this vehicle.'),
  vehicleOdometer: Yup.number().required('Enter the current odometer reading for this vehicle.'),
  vehicleYear: Yup.number().required('Enter the year for this vehicle.'),
});

const VehicleForm = ({ navigation: { navigate }, route }) => {
  const licensePlate = R.pathOr('', ['params', 'vehicle', 'vehicleLicensePlate'], route);
  const make = R.pathOr('', ['params', 'vehicle', 'vehicleMake'], route);
  const model = R.pathOr('', ['params', 'vehicle', 'vehicleModel'], route);
  const name = R.pathOr('', ['params', 'vehicle', 'vehicleName'], route);
  const odometer = R.pathOr('', ['params', 'vehicle', 'vehicleOdometer'], route);
  const purchaseDate = R.pathOr('', ['params', 'vehicle', 'vehiclePurchaseDate'], route);
  const vin = R.pathOr('', ['params', 'vehicle', 'vehicleVIN'], route);
  const year = R.pathOr('', ['params', 'vehicle', 'vehicleYear'], route);
  const requiredFields = ['vehicleName', 'vehicleYear', 'vehicleMake', 'vehicleModel', 'vehicleOdometer'];

  const initialValues = React.useMemo(
    () => ({
      vehicleLicensePlate: licensePlate,
      vehicleMake: make,
      vehicleModel: model,
      vehicleName: name,
      vehicleOdometer: odometer,
      vehiclePurchaseDate: purchaseDate === '' ? today : dayjs(purchaseDate),
      vehicleVIN: vin,
      vehicleYear: year,
    }),
    [licensePlate, make, model, name, odometer, purchaseDate, vin, year],
  );

  const submitForm = React.useCallback((values) => { console.log(values); }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitForm(values)}
      validationSchema={VehicleSchema}
    >
      {({ handleSubmit, values }) => {
        const hasAllRequired = utils.allHaveValues(requiredFields, values);

        return (
          <Wrapper>
            <ScrollView>
              <TextField
                label="Name"
                name="vehicleName"
              />
              <TextField
                keyboardType="numeric"
                label="Year"
                name="vehicleYear"
              />
              <TextField
                label="Make"
                name="vehicleMake"
              />
              <TextField
                label="Model"
                name="vehicleModel"
              />
              <TextField
                label="Odometer"
                name="vehicleOdometer"
              />
              <Expandable labelMain="Optional Settings">
                <DatePicker label="Purchase Date" mode="date" name="vehiclePurchaseDate" />
                <TextField
                  label="License Plate"
                  name="vehicleLicensePlate"
                />
                <TextField
                  label="VIN"
                  name="vehicleVIN"
                />
              </Expandable>
              <Button disabled={!hasAllRequired} label="Save Vehicle" onPress={handleSubmit} />
            </ScrollView>
          </Wrapper>
        );
      }}
    </Formik>
  );
};

VehicleForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({}),
};

export default React.memo(VehicleForm);
