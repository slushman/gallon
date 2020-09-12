import React from 'react';
import { FlatList } from 'react-native';

import EntryItem from '../../components/EntryItem';
import Fabs from '../../components/Fabs';
import Wrapper from '../../components/Wrapper';
import { entries } from '../../constants/data';
import { getEntryKey } from '../../utils';

const EntryList = () => {
  const renderEntryItem = React.useCallback(({ item }) => (<EntryItem item={item} />), []);

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
