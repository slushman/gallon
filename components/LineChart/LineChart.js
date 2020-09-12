import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';

import Heading from '../../components/Heading';
import * as colors from '../../constants/colors';
import * as sizes from '../../constants/sizes';
import * as styles from './styles';
import { useDarkmode } from '../../hooks/useDarkMode';

const screenWidth = Dimensions.get('window').width;

const LineChart = ({ chartData, heading }) => {
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);
  const bgContrast = colors.getBgContrast(isDarkMode);
  const gallonBlue = colors.getBlue(isDarkMode);

  const chartConfig = React.useMemo(() => ({
    backgroundGradientFrom: bgColor,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: bgColor,
    backgroundGradientToOpacity: 1,
    barPercentage: 0.5,
    color: () => bgContrast,
    fillShadowGradient: gallonBlue,
    propsForBackgroundLines: {
      stroke: gallonBlue,
    },
    strokeWidth: 2,
  }), [bgColor, bgContrast, gallonBlue]);

  return (
    <View style={styles.lineChartWrap}>
      <Heading label={heading} size={sizes.XS} />
        <View style={styles.chartWrap}>
          <RNLineChart
            bezier
            chartConfig={chartConfig}
            data={chartData}
            height={styles.chartHeight}
            width={screenWidth - 32}
          />
          { /*
            TODO: buttons to change how much data is shown in the chart.
            default to one month.
           */ }
        </View>
    </View>
  );
};

export default React.memo(LineChart);
