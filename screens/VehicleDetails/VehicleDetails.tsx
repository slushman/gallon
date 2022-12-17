import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import dayjs from 'dayjs';

import Heading from '../../components/Heading';
import HeaderButton from '../../components/HeaderButton';
import LineChart from '../../components/LineChart';
import Stat from './components/Stat';
import Wrapper from '../../components/Wrapper';
import { entries } from '../../constants/data';
import { Route, ServiceType } from '../../constants/enums';
import { getMPG, roundMPG } from '../../utils/mpg';
import * as styles from './styles';

const VehicleDetails = ({ navigation: { setOptions }, route }) => {
  const vehicle = R.path(['params', 'vehicle'], route);
  const {
    vehicleMake,
    vehicleModel,
    vehicleName,
    vehicleYear,
  } = R.path(['params', 'vehicle'], route);

  const headerButtonParams = React.useMemo(() => ({ vehicle }), [vehicle]);

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButton
          route={Route.VEHICLE_FORM}
          routeParams={headerButtonParams}
          text="Edit"
        />
      ),
      title: `${vehicleName} Details`,
    });
  }, [headerButtonParams, setOptions, vehicleName]);

  const vehicleEntries = React.useMemo(
    () => R.filter((entry) => R.prop('vehicle', entry) === vehicleName, entries),
    [vehicleName],
  );

  const vehicleFillups = React.useMemo(
    () => R.filter((entry) => R.prop('type', entry) === ServiceType.FILLUP, vehicleEntries),
    [vehicleEntries],
  );

  const chartData = React.useMemo(
    () => {
      const howMany = 8;
      const dataset = R.take(howMany, R.map((entry) => roundMPG(getMPG(entry)), vehicleFillups));
      const rawDates = R.pluck('date', vehicleFillups);
      const labels = R.take(howMany, R.map(date => dayjs(date).format('M/D'), rawDates));

      return {
        labels,
        datasets: [{ data: dataset }],
      };
    },
    [vehicleFillups],
  );

  const AverageMPG = React.useMemo(
    () => {
      const allMPGs = R.map((entry) => roundMPG(getMPG(entry)), vehicleFillups);
      const sumMPGs = R.sum(allMPGs);

      return (<Stat text={`Average MPG: ${roundMPG(sumMPGs / R.length(allMPGs))} MPG`} />);
    },
    [vehicleFillups],
  );

  const LatestMPG = React.useMemo(
    () => {
      const latest = R.take(1, vehicleFillups);
      const latestMPG = Math.round(getMPG(latest[0]) * 10) / 10;

      return (<Stat text={`Latest MPG: ${latestMPG} MPG`} />);
    },
    [vehicleFillups],
  );

  return (
    <Wrapper>
      <View style={styles.vehicleDetailsWrap}>
        <Heading center label={`${vehicleYear} ${vehicleMake} ${vehicleModel}`} />
        <LineChart
          chartData={chartData}
          heading="MPG"
        />
      </View>
      {LatestMPG}
      {AverageMPG}
      { /*
        TODO: Vehicle Stats
        miles until next oil change
        miles until next tire rotation
        /* paid version has miles until... for everything
        */ }
    </Wrapper>
  );
};

VehicleDetails.propTypes = {
  route: PropTypes.object,
};

export default React.memo(VehicleDetails);
