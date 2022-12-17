import { Service, ServiceType } from '../constants/enums';

export type RootStackParamList = {
  FillupForm: {
    entry?: {
      id: number,
      vehicle: string,
      gallons?: string,
      type: Array<ServiceType>
      total: string,
      date: string,
      odometer: string,
      previousOdometer?: string,
      services?: Array<Service>
    },
  },
};
