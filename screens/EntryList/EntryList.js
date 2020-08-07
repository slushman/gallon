import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import * as ReactRedux from 'react-redux';

import Fabs from '../../components/Fabs';
import ListItem from '../../components/ListItem';
import Swipeable from '../../components/Swipeable';
import Wrapper from '../../components/Wrapper';
import * as colors from '../../constants/colors';
import * as maps from '../../constants/maps';
import * as routes from '../../constants/routes';
import * as selectors from '../../redux/selectors';
import * as types from '../../constants/types';
import { entries } from '../../constants/data';
import { getMPG } from '../../utils/mpg';
import { noop } from '../../utils';
import { useDarkmode } from '../../hooks/useDarkMode';

dayjs.extend(LocalizedFormat);

const getEntryKey = entry => entry.id.toString();

const EntryList = ({ navigation: { navigate } }) => {
  const isDarkMode = useDarkmode();
  const green = colors.getGreen(isDarkMode);
  const red = colors.getRed(isDarkMode);
  const showGallons = ReactRedux.useSelector(selectors.showGallonsSelector);
  const showPrice = ReactRedux.useSelector(selectors.showPriceSelector);

  const goToEdit = React.useCallback(
    (entry) => {
      const route = R.prop('type', entry) === types.FILLUP
        ? routes.EDIT_FILLUP
        : routes.SERVICE_STACK;
      const params = R.prop('type', entry) === types.FILLUP
        ? { entry }
        : { screen: routes.EDIT_SERVICE,
          params: { entry } }
      navigate(route, params);
    },
    [navigate],
  );

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

  const rightActions = React.useMemo(
    () => {
      return [
        {
          bgColor: green,
          label: 'Edit',
          onPress: goToEdit,
          textColor: colors.gallonBlack,
        },
        {
          bgColor: red,
          label: 'Delete',
          onPress: noop,
        },
      ];
    },
    [goToEdit, green, red],
  );

  const renderEntryItem = React.useCallback(
    ({ item }) => {
      const date = dayjs(R.prop('date', item)).format('LLL');
      const type = R.prop('type', item);

      return (
        <Swipeable
          item={item}
          rightActions={rightActions}
        >
          <ListItem
            leftContent={date}
            leftIcon={maps.iconMap[type]}
            onPress={handleEntryPress(item)}
            pressData={item}
            rightContent={getMPG(item)}
            subtitle={getSubtitleContent(item)}
          />
        </Swipeable>
      );
    },
    [getSubtitleContent, handleEntryPress, rightActions],
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

EntryList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default React.memo(EntryList);
