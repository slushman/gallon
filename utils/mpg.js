export const getMPG = ({ gallons, odometer, previousOdometer }) => {
  if (!previousOdometer) return '';

  return `${((odometer - previousOdometer) / gallons).toFixed(1)} mpg`;
};
