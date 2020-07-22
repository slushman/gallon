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
import { getMPG } from '../../utils/mpg';

dayjs.extend(LocalizedFormat);

const EntryList = ({
  navigation: {
    navigate,
  },
}) => {
  const showGallons = ReactRedux.useSelector(selectors.showGallonsSelector);
  const showPrice = ReactRedux.useSelector(selectors.showPriceSelector);

  const handleEntryPress = React.useCallback(
    (entry) => () => {
      const route = R.prop('type', entry) === types.FILLUP
        ? routes.FILLUP_DETAILS
        : routes.SERVICE_DETAILS;
      navigate(route, { ...entry });
    },
    [navigate],
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
    [getSubtitleContent, handleEntryPress],
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
