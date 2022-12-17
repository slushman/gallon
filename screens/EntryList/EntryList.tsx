import React from 'react';
import { FlatList } from 'react-native';
import * as R from 'ramda';

import EntryItem from '../../components/EntryItem';
import Fabs from '../../components/Fabs';
import Wrapper from '../../components/Wrapper';
import { entries } from '../../constants/data';
import { getEntryKey } from '../../utils';

const EntryList = () => {
  const renderEntryItem = React.useCallback(
    ({ item }) => (
      <EntryItem
        date={R.prop('date', item)}
        gallons={R.propOr('', 'gallons', item)}
        id={R.prop('id', item)}
        odometer={R.prop('odometer', item)}
        previousOdometer={R.propOr('', 'previousOdometer', item)}
        services={R.propOr([], 'services', item)}
        total={R.propOr('', 'total', item)}
        type={R.prop('type', item)}
        vehicle={R.prop('vehicle', item)}
      />
    ),
    [],
  );

  return (
    <Wrapper>
      <FlatList
        data={entries}
        keyExtractor={getEntryKey}
        renderItem={renderEntryItem}
      />
      <Fabs />
    </Wrapper>
  );
};

export default React.memo(EntryList);
