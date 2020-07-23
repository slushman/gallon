import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import VehiclePicker from './VehiclePicker';
import VehicleSegment from './VehicleSegment';

const VehicleChooser = ({ fieldLabel, name, options }) => {
  const [field, meta, helpers] = useField(name);

  if (options.length === 1) return null;

  return (options.length > 3
    ? <VehiclePicker field={field} helpers={helpers} options={options} />
    : <VehicleSegment field={field} helpers={helpers} options={options} />
  );
};

VehicleChooser.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default React.memo(VehicleChooser);
