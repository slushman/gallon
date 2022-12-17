export const getMPG = (gallons: string | undefined, odometer: string, previousOdometer: string | undefined) => {
  if (!previousOdometer || !gallons || !odometer) return '';

  const numberGallons = parseInt(gallons, 10);
  const numberOdometer = parseInt(odometer, 10);
  const numberPreviousOdometer = parseInt(previousOdometer, 10);

  return ((numberOdometer - numberPreviousOdometer) / numberGallons);
};

export const roundMPG = (mpg: number) => Math.round(mpg * 10) / 10;
