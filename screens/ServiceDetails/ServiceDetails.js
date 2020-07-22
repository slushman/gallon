import React from 'react';
import { Text, View } from 'react-native';
import * as R from 'ramda';
import dayjs from 'dayjs';

import HeaderButton from '../../components/HeaderButton';
import ScrollView from '../../components/ScrollView';
import Wrapper from '../../components/Wrapper';
import { useDarkmode } from '../../hooks/useDarkMode';
import * as colors from '../../constants/colors';
import * as routes from '../../constants/routes';
import * as styles from './styles';

const ServiceDetails = ({ navigation: { setOptions }, route }) => {
  const isDarkMode = useDarkmode();
  const entry = R.prop('params', route);
  const { date, odometer, services, total, vehicle } = R.prop('params', route);

  const headerButtonParams = React.useMemo(
    () => ({
      screen: routes.EDIT_SERVICE,
      params: { entry },
    }),
    [entry],
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButton
          route={routes.NEW_SERVICE}
          routeParams={headerButtonParams}
          text="Edit"
        />
      ),
    });
  }, [headerButtonParams, setOptions]);

  const getDate = React.useCallback(
    () => {
      if (R.is(String, date)) return dayjs(date).format('MMMM D, YYYY');

      return dayjs(date).toISOString();
    },
    [date],
  );

  const detailsText = React.useMemo(
    () => ({
      color: colors.getBgContrast(isDarkMode),
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 20,
    }),
    [isDarkMode],
  );

  const labelText = React.useMemo(
    () => ({
      color: colors.getBgContrast(isDarkMode),
      fontSize: 20,
      width: '33%',
    }),
    [isDarkMode],
  );

  return (
    <Wrapper>
      <ScrollView>
        <View style={styles.dataRow}>
          <Text style={labelText}>Vehicle:</Text>
          <Text style={detailsText}>{vehicle}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={labelText}>Date:</Text>
          <Text style={detailsText}>{getDate()}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={labelText}>Odometer:</Text>
          <Text style={detailsText}>{odometer}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={labelText}>Total Price:</Text>
          <Text style={detailsText}>{total}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={labelText}>Services:</Text>
          <Text numberOfLines={3} style={detailsText}>{R.join(', ', services)}</Text>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default React.memo(ServiceDetails);
