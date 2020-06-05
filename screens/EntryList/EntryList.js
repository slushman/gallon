import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import ListItem from '../../components/ListItem';
import Wrapper from '../../components/Wrapper';
import * as routes from '../../constants/routes';
import { FILLUP } from '../../constants/types';

const entries = [
  { id: 1234, type: FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1235, type: FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1236, type: FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1237, type: FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1238, type: FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
  { id: 1239, type: FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1245, type: FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1246, type: FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1247, type: FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1248, type: FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
  { id: 1254, type: FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1255, type: FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1256, type: FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1257, type: FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1258, type: FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
  { id: 1264, type: FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1265, type: FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1266, type: FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1267, type: FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1268, type: FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
  { id: 1274, type: FILLUP, total: '25.46', date: '2020-04-01', odometer: '123456'},
  { id: 1275, type: FILLUP, total: '21.66', date: '2020-03-27', odometer: '123456'},
  { id: 1276, type: FILLUP, total: '26.72', date: '2020-03-21', odometer: '123456'},
  { id: 1277, type: FILLUP, total: '24.33', date: '2020-03-15', odometer: '123456'},
  { id: 1278, type: FILLUP, total: '20.79', date: '2020-03-08', odometer: '123456'},
];

const EntryList = ({ navigation: { navigate } }) => {
  // fetch data from Mongo/Realm

  const handleEntryPress = React.useCallback(
    (entry) => () => { navigate(routes.ENTRY, entry); },
    [navigate],
  );

  return (
    <Wrapper>
      <ScrollView>
        {entries.map((entry, index) => (
          <ListItem
            key={index}
            leftContent={R.prop('date', entry)}
            onPress={handleEntryPress(entry)}
            pressData={entry}
            rightContent={`$${R.prop('total', entry)}`}
            subtitle={R.prop('type', entry)}
          />
        ))}
      </ScrollView>
    </Wrapper>
  );
};

EntryList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default React.memo(EntryList);
