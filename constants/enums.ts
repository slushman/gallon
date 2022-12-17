export enum Color {
  DARK_BLUE = 'rgba(10, 132, 255, 1)',
  DARK_GRAY = 'rgba(72, 72, 74, 1)',
  DARK_GREEN = 'rgba(48, 209, 88, 1)',
  DARK_RED = 'rgba(255, 69, 58, 1)',
  GALLON_BLACK = 'rgba(28, 28, 30, 1)',
  LIGHT_BLUE = 'rgba(0, 109, 247, 1)',
  LIGHT_GRAY = 'rgba(242, 242, 247, 1)',
  LIGHT_GREEN = 'rgba(52, 199, 89, 1)',
  LIGHT_RED = 'rgba(215, 0, 21, 1)',
  PERFECT_GRAY = 'rgba(117, 117, 117, 1)',
  TRANSPARENT = 'rgba(255, 255, 255, 0)',
  WHITE = 'rgba(255, 255, 255, 1)',
}

export enum FieldStatus {
  ISVALID = 'isValid',
  HASERROR = 'hasError',
  HASVALUE = 'hasValue',
}

export enum ReduxKey {
  FABS_EXPANDED = 'FABS_EXPANDED',
  HAND_PREFERENCE = 'HAND_PREFERENCE',
  SETTINGS_MODAL = 'SETTINGS_MODAL',
  SHOW_GALLONS = 'SHOW_GALLONS',
  SHOW_ODOMETER = 'SHOW_ODOMETER',
  SHOW_PRICE = 'SHOW_PRICE',
  VEHICLE_LIST = 'VEHICLE_LIST',
}

export enum Route {
  ENTRY = 'Entry',
  ENTRY_LIST = 'Entries',
  FILLUP_DETAILS = 'Fill-up Details',
  FILLUP_FORM = 'Fill-up',
  HOME = 'Home',
  SELECT_SERVICES = 'Select Services',
  SERVICE_DETAILS = 'Service Details',
  SERVICE_FORM = 'Service',
  SETTINGS = 'Settings',
  VEHICLE_DETAILS = 'Vehicle Details',
  VEHICLE_FORM = 'Vehicle',
}

export enum Service {
  AIR_FILTER = 'Air Filter',
  FRONT_DRIVER_TIRE = 'Front Driver Tire',
  FRONT_PASSENGER_TIRE = 'Front Passenger Tire',
  OIL_CHANGE = 'Oil Change',
  RADIOATOR_FLUSH = 'Radiator Flush',
  REAR_DRIVER_TIRE = 'Rear Driver Tire',
  REAR_PASSENGER_TIRE = 'Rear Passenger Tire',
  TIRE_ROTATION = 'Tire Rotation',
  TRANSMISSION_FLUID = 'Transmission Fluid',
  OTHER = 'Other',
}

export enum ServiceType {
  FILLUP = 'fillup',
  SERVICE = 'service',
}

export enum Setting {
  LEFT = 'Left',
  RIGHT = 'Right',
}

export enum Size {
  XL = 36,
  LG = 30,
  MD = 24,
  SM = 20,
  XS = 16,
}
