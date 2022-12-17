import React from 'react';
import { View } from 'react-native';
import * as R from 'ramda';
import dayjs from 'dayjs';

import HeaderButton from '../../components/HeaderButton';
import ScrollView from '../../components/ScrollView';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import { Route } from '../../constants/enums';
import * as uniStyles from '../../utils/styles';
import { getMPG } from '../../utils/mpg';

const FillupDetails: React.FC = ({ navigation: { setOptions }, route }) => {
  const entry = R.path(['params'], route);
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
          route={Route.FILLUP_FORM}
          routeParams={headerButtonParams}
          text="Edit"
        />
      ),
    });
  }, [headerButtonParams, setOptions]);

  const fillupMPG = getMPG({ gallons, odometer, previousOdometer }).toFixed(1);

  return (
    <Wrapper>
      <ScrollView>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>MPG:</Text>
          <Text style={uniStyles.detailsText}>{`${fillupMPG} mpg`}</Text>
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
