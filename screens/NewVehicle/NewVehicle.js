import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import Expandable from '../../components/Expandable/Expandable';
import TextField from '../../components/TextField';
import Wrapper from '../../components/Wrapper';
import * as utils from '../../utils';

const today = dayjs();

const initialValues = {
  vehicleLicensePlate: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleName: '',
  vehicleOdometer: '',
  vehiclePurchaseDate: today,
  vehicleVIN: '',
  vehicleYear: '',
};

const VehicleSchema = Yup.object().shape({
  vehicleMake: Yup.number().required('Enter the make for this vehicle.'),
  vehicleModel: Yup.number().required('Enter the model for this vehicle.'),
  vehicleName: Yup.number().required('Enter a name for this vehicle.'),
  vehicleOdometer: Yup.number().required('Enter the current odometer reading for this vehicle.'),
  vehicleYear: Yup.number().required('Enter the year for this vehicle.'),
});

const NewVehicle = ({ navigation: { navigate }, route }) => {
  const submitForm = React.useCallback((values) => { console.log(values); }, []);

  const requiredFields = ['vehicleName', 'vehicleYear', 'vehicleMake', 'vehicleModel', 'vehicleOdometer'];

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
            <TextField
              fieldName="vehicleName"
              label="Name"
              name="vehicleName"
            />
            <TextField
              fieldName="vehicleYear"
              keyboardType="numeric"
              label="Year"
              name="vehicleYear"
            />
            <TextField
              fieldName="vehicleMake"
              label="Make"
              name="vehicleMake"
            />
            <TextField
              fieldName="vehicleModel"
              label="Model"
              name="vehicleModel"
            />
            <TextField
              fieldName="vehicleOdometer"
              label="Odometer"
              name="vehicleOdometer"
            />
            <Expandable labelMain="Optional Settings">
              <DatePicker label="Purchase Date" name="vehiclePurchaseDate" />
              <TextField
                fieldName="vehicleLicensePlate"
                label="License Plate"
                name="vehicleLicensePlate"
              />
              <TextField
                fieldName="vehicleVIN"
                label="VIN"
                name="vehicleVIN"
              />
            </Expandable>
            <Button disabled={!hasAllRequired} label="Save" onPress={handleSubmit} />
          </Wrapper>
        );
      }}
    </Formik>
  );
};

NewVehicle.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({}),
};

export default React.memo(NewVehicle);
