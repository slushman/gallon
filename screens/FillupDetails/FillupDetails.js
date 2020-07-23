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
import { getMPG } from '../../utils/mpg';

const FillupDetails = ({ navigation: { setOptions }, route }) => {
  const entry = R.prop('params', route);
  const { date, gallons, odometer, previousOdometer, total, vehicle } = R.prop('params', route);

  const getDate = React.useCallback(
    () => {
      if (R.is(String, date)) return dayjs(date).format('MMMM D, YYYY');

      return dayjs(date).toISOString();
    },
    [date],
  );

  const headerButtonParams = React.useMemo(() => ({ entry }), [entry]);

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButton
          route={routes.EDIT_FILLUP}
          routeParams={headerButtonParams}
          text="Edit"
        />
      ),
    });
  }, [headerButtonParams, setOptions]);

  return (
    <Wrapper>
      <ScrollView>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>MPG:</Text>
          <Text style={uniStyles.detailsText}>{getMPG({ gallons, odometer, previousOdometer })}</Text>
        </View>
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
          <Text style={uniStyles.labelText}>Gallons:</Text>
          <Text style={uniStyles.detailsText}>{gallons}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Date:</Text>
          <Text style={uniStyles.detailsText}>{date}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Total Price:</Text>
          <Text style={uniStyles.detailsText}>{total}</Text>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default React.memo(FillupDetails);
