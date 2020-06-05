import React from 'react';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import Collapsible from 'react-native-collapsible';
import * as Yup from 'yup';
import { View } from 'react-native';
import * as R from 'ramda';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import TextField from '../../components/TextField';
import Wrapper from '../../components/Wrapper';
import * as utils from '../../utils';

const today = dayjs();

const initialValues = {
  date: today,
  odometer: '',
  total: '',
  gallons: '',
};

const FillupSchema = Yup.object().shape({
  gallons: Yup.number().required('Enter the total gallons for this fillup.'),
  odometer: Yup.number().required('Enter the current odometer reading.'),
  total: Yup.number().required('Enter the total price for this fillup.'),
});

const NewFillup = () => {
  const isSubscriber = false;
  const [detailsVisible, setDetailsVisible] = React.useState(false);

  const closeDetails = React.useCallback(() => setDetailsVisible(false), []);

  const openDetails = React.useCallback(() => setDetailsVisible(true), []);

  const submitForm = React.useCallback((values) => { console.log(values); }, []);

  const details = React.useMemo(() => {
    if (!isSubscriber) return null;

    return (
      <View>
        <Button label="Enter Details" onPress={openDetails} />
        <Collapsible collapsed={!detailsVisible}>
          <Button label="Cancel" onPress={closeDetails} />
        </Collapsible>
      </View>
    );
  }, [closeDetails, detailsVisible, isSubscriber, openDetails]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitForm(values)}
      validationSchema={FillupSchema}
    >
      {({ handleSubmit, values }) => {
        const hasAllRequired = utils.allHaveValues(['odometer', 'total', 'gallons'], values);

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
            <TextField
              fieldName="gallons"
              keyboardType="numeric"
              label="Gallons"
              name="gallons"
            />
            {details}
            <Button disabled={!hasAllRequired} label="Save" onPress={handleSubmit} />
          </Wrapper>
        )
    }}
    </Formik>
  );
};

export default React.memo(NewFillup);
