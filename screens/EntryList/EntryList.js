import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import Fabs from '../../components/Fabs';
import ListItem from '../../components/ListItem';
import Wrapper from '../../components/Wrapper';
import * as routes from '../../constants/routes';
import * as types from '../../constants/types';

dayjs.extend(LocalizedFormat);

const entries = [
  { id: 1234, type: types.FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1235, type: types.SERVICE, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1236, type: types.FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1237, type: types.SERVICE, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1238, type: types.FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
  { id: 1239, type: types.SERVICE, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1245, type: types.FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1246, type: types.SERVICE, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1247, type: types.FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1248, type: types.SERVICE, total: '20.79', date: '2020-03-08', odometer: '123456'},
  { id: 1254, type: types.FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1255, type: types.FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1256, type: types.FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1257, type: types.FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1258, type: types.FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
  { id: 1264, type: types.FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1265, type: types.FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1266, type: types.FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1267, type: types.FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1268, type: types.FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
  { id: 1274, type: types.FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1275, type: types.FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1276, type: types.FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1277, type: types.FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1278, type: types.FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
];

const iconMap = {
  [types.FILLUP]: 'gas-station',
  [types.SERVICE]: 'oil',
};

const EntryList = ({ navigation: { navigate } }) => {
  // fetch data from Mongo/Realm

  const handleEntryPress = React.useCallback(
    (entry) => () => navigate(routes.ENTRY, entry),
    [navigate],
  );

  return (
    <Wrapper>
      <ScrollView>
        {entries.map((entry, index) => {
          const date = dayjs(R.prop('date', entry)).format('LLL');
          const type = R.prop('type', entry);

          return (
            <ListItem
              key={index}
              leftContent={date}
              leftIcon={iconMap[type]}
              onPress={handleEntryPress(entry)}
              pressData={entry}
              rightContent={`$${R.prop('total', entry)}`}
            />
          );
        })}
      </ScrollView>
      <Fabs />
    </Wrapper>
  );
};

EntryList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default React.memo(EntryList);
