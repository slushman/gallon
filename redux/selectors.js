import * as R from 'ramda';

export const fabsExpandedSelector = R.pathOr(false, ['modals', 'fabsExpanded']);

export const handPreferenceSelector = R.pathOr(1, ['settings', 'handPreference']);

export const vehicleListSelector = () => {
  return [
    {
      vehicleId: 1,
      vehicleMake: 'Toyota',
      vehicleModel: 'Sienna',
      vehicleName: 'Willie Wagon',
      vehicleYear: '2011',
    },
    {
      vehicleId: 2,
      vehicleMake: 'Toyota',
      vehicleModel: 'Prius',
      vehicleName: 'Scooby',
      vehicleYear: '2010',
    },
  ];
};
