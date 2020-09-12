import React from 'react';
import * as R from 'ramda';
import dayjs from 'dayjs';
import * as ReactRedux from 'react-redux';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import ListItem from '../../components/ListItem';
import Swipeable from '../../components/Swipeable';
import * as colors from '../../constants/colors';
import * as maps from '../../constants/maps';
import * as routes from '../../constants/routes';
import * as selectors from '../../redux/selectors';
import * as services from '../../constants/services';
import * as types from '../../constants/types';
import { useDarkmode } from '../../hooks/useDarkMode';
import { getMPG } from '../../utils/mpg';
import { noop } from '../../utils';

dayjs.extend(LocalizedFormat);

const EntryItem = ({ item }) => {
  const { navigate } = useNavigation();

  const isDarkMode = useDarkmode();
  const green = colors.getGreen(isDarkMode);
  const red = colors.getRed(isDarkMode);
  const date = dayjs(R.prop('date', item)).format('LLL');
  const showGallons = ReactRedux.useSelector(selectors.showGallonsSelector);
  const showPrice = ReactRedux.useSelector(selectors.showPriceSelector);
  const type = R.prop('type', item);

  const getEntryMPG = React.useCallback(
    (entry) => {
      if (R.prop('type', entry) === types.SERVICE) return null;
      return `${getMPG(entry).toFixed(1)} mpg`;
    },
    [],
  );

  const getSubtitleContent = React.useCallback(
    (entry) => {
      let content = [];
      const entryType = R.prop('type', entry);

      if (entryType === types.FILLUP) {
        if (showGallons) {
          content.push(`${R.prop('gallons', entry)} gallons`);
        }

        if (showPrice) {
          content.push(`$${R.prop('total', entry)}`);
        }
      }

      if (entryType === types.SERVICE) {
        content = R.prop('services', entry);
      }

      return R.join(', ', content);
    },
    [showGallons, showPrice],
  );

  const goToEdit = React.useCallback(
    (entry) => {
      const entryType = R.prop('type', entry);
      const route = entryType === types.FILLUP
        ? routes.FILLUP_FORM
        : routes.SERVICE_FORM;
      console.log({ route, entry });
      const params = entryType === types.FILLUP
        ? { entry }
        : { screen: route,
          params: { entry } };
      navigate(route, params);
    },
    [navigate],
  );

  const handleEntryPress = React.useCallback(
    (entry) => () => {
      const entryType = R.prop('type', entry);
      const route = entryType === types.FILLUP
        ? routes.FILLUP_DETAILS
        : routes.SERVICE_DETAILS;
      navigate(route, { ...entry });
    },
    [navigate],
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
        rightContent={getEntryMPG(item)}
        subtitle={getSubtitleContent(item)}
      />
    </Swipeable>
  );
};

EntryItem.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string,
    gallons: PropTypes.string,
    id: PropTypes.number,
    odometer: PropTypes.string,
    previousOdometer: PropTypes.string,
    services: PropTypes.arrayOf(PropTypes.oneOf(services.serviceList)),
    total: PropTypes.string,
    type: PropTypes.oneOf([types.FILLUP, types.SERVICE]),
    vehicle: PropTypes.string,
  }).isRequired,
};

export default React.memo(EntryItem);
