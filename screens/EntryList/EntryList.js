import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import * as ReactRedux from 'react-redux';

import Fabs from '../../components/Fabs';
import ListItem from '../../components/ListItem';
import ScrollView from '../../components/ScrollView';
import Wrapper from '../../components/Wrapper';
import * as maps from '../../constants/maps';
import * as routes from '../../constants/routes';
import * as selectors from '../../redux/selectors';
import * as types from '../../constants/types';
import { entries } from '../../constants/data';

dayjs.extend(LocalizedFormat);

const EntryList = ({
  navigation: {
    navigate,
  },
}) => {
  const showGallons = ReactRedux.useSelector(selectors.showGallonsSelector);
  const showPrice = ReactRedux.useSelector(selectors.showPriceSelector);

  const handleEntryPress = React.useCallback(
    (entry) => () => navigate(routes.ENTRY, entry),
    [navigate],
  );

  const getMPG = React.useCallback(
    (entry) => {
      const { gallons, odometer, previousOdometer } = entry;

      if (!previousOdometer) return '';

      return `${((odometer - previousOdometer) / gallons).toFixed(1)} mpg`;
    },
    [],
  );

  const getSubtitleContent = React.useCallback(
    (entry) => {
      let content = [];

      if (R.prop('type', entry) === types.FILLUP) {
        if (showGallons) {
          content.push(`${R.prop('gallons', entry)} gallons`);
        }

        if (showPrice) {
          content.push(`$${R.prop('total', entry)}`);
        }
      }

      if (R.prop('type', entry) === types.SERVICE) {
        content = R.prop('services', entry);
      }

      return R.join(', ', content);
    },
    [showGallons, showPrice],
  );

  const EntryListItem = React.useCallback(
    (entry, index) => {
      const date = dayjs(R.prop('date', entry)).format('LLL');
      const type = R.prop('type', entry);

      return (
        <ListItem
          key={index}
          leftContent={date}
          leftIcon={maps.iconMap[type]}
          onPress={handleEntryPress(entry)}
          pressData={entry}
          rightContent={getMPG(entry)}
          subtitle={getSubtitleContent(entry)}
        />
      );
    },
    [getMPG, getSubtitleContent, handleEntryPress],
  );

  return (
    <Wrapper>
      <ScrollView noPadding>
        {entries.map(EntryListItem)}
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
