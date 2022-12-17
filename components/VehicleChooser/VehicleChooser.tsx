import React from 'react';
import { useField } from 'formik';

import VehiclePicker from './VehiclePicker';
import VehicleSegment from './VehicleSegment';
import { VehicleChooserProps } from './types';

  const VehicleChooser: React.FC<VehicleChooserProps> = ({ name, options }) => {
  const [{ onChange, value },, { setValue }] = useField(name);

  if (options.length === 1) return null;

  return (options.length > 3
    ? <VehiclePicker onChange={onChange} options={options} setValue={setValue} value={value} />
    : <VehicleSegment onChange={onChange} options={options} setValue={setValue} value={value} />
  );
};

export default React.memo(VehicleChooser);
