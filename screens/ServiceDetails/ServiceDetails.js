import React from 'react';
import { View } from 'react-native';
import * as R from 'ramda';
import dayjs from 'dayjs';

import HeaderButton from '../../components/HeaderButton';
import ScrollView from '../../components/ScrollView';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import * as routes from '../../constants/routes';
import * as uniStyles from '../../utils/styles';

const ServiceDetails = ({ navigation: { setOptions }, route }) => {
  const entry = R.prop('params', route);
  const { date, odometer, services, total, vehicle } = R.prop('params', route);

  const headerButtonParams = React.useMemo(
    () => ({
      screen: routes.SERVICE_FORM,
      params: { entry },
    }),
    [entry],
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButton
          route={routes.SERVICE_FORM}
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

  return (
    <Wrapper>
      <ScrollView>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Vehicle:</Text>
          <Text style={uniStyles.detailsText}>{vehicle}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Date:</Text>
          <Text style={uniStyles.detailsText}>{getDate()}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Odometer:</Text>
          <Text style={uniStyles.detailsText}>{odometer}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Total Price:</Text>
          <Text style={uniStyles.detailsText}>{total}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Services:</Text>
          <Text numberOfLines={3} style={uniStyles.detailsText}>{R.join(', ', services)}</Text>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default React.memo(ServiceDetails);
