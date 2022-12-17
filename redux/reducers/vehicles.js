import { ReduxKey } from '../../constants/enums';
const initialState = {
    vehicleList: [
        {
            vehicleId: 1,
            vehicleMake: 'Toyota',
            vehicleModel: 'Sienna',
            vehicleName: 'Willie Wagon',
            vehicleOdometer: '123256',
            vehicleYear: '2011',
        },
        {
            vehicleId: 2,
            vehicleMake: 'Toyota',
            vehicleModel: 'Prius',
            vehicleName: 'Scooby',
            vehicleOdometer: '123452',
            vehicleYear: '2010',
        },
    ],
};
export const vehicles = (state = initialState, action) => {
    switch (action.type) {
        case ReduxKey.VEHICLE_LIST:
            return Object.assign(Object.assign({}, state), { settingsModal: action.vehicleList });
        default:
            return state;
    }
};
//# sourceMappingURL=vehicles.js.map