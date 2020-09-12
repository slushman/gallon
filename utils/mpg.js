export const getMPG = ({ gallons, odometer, previousOdometer }) => {
  if (!previousOdometer) return '';

  return ((odometer - previousOdometer) / gallons);
};

export const roundMPG = (mpg) => Math.round(mpg * 10) / 10;
