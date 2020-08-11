import React from 'react';
import { View } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import EntriesShowSettings from '../../components/EntriesShowSettings';
import HandPreferenceSetting from '../../components/HandPreferenceSetting';
import HeaderButton from '../../components/HeaderButton';
import Heading from '../../components/Heading';
import ScrollView from '../../components/ScrollView';
import Text from '../../components/Text';
import VehicleList from '../../components/VehicleList';
import Wrapper from '../../components/Wrapper';
import * as colors from '../../constants/colors';
import * as routes from '../../constants/routes';
import * as styles from './styles';
import { useDarkmode } from '../../hooks/useDarkMode';

const Settings = () => {
  const isDarkMode = useDarkmode();
  const bgContrast = colors.getBgContrast(isDarkMode);
  const { navigate, setOptions } = useNavigation();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButton
          route={routes.ENTRY_LIST}
          text="Close"
        />
      ),
    });
  }, [setOptions]);

  const handleNewVehicle = React.useCallback(
    () => navigate(routes.NEW_VEHICLE),
    [navigate],
  );

  const NewVehicleButtonLabel = React.useMemo(
    () => (
      <View style={styles.vehicleButtonLabel}>
        <MCIcon color={bgContrast} name="plus" size={20} />
        <Text>Add New Vehicle</Text>
      </View>
    ),
    [bgContrast],
  );

  return (
    <Wrapper>
      <View style={styles.vehiclesWrap}>
        <Heading label="Manage Vehicles" noPadding={true} />
        <VehicleList />
        <Button label={NewVehicleButtonLabel} onPress={handleNewVehicle} />
      </View>
      <ScrollView>
        <Heading label="Preferences" />
        <HandPreferenceSetting />
        <EntriesShowSettings />
      </ScrollView>
    </Wrapper>
  );
};

export default React.memo(Settings);
