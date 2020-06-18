import React from 'react';
import { Text, View } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import * as R from 'ramda';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import HeaderButton from '../../components/HeaderButton';
import Heading from '../../components/Heading';
import VehicleList from '../../components/VehicleList';
import Wrapper from '../../components/Wrapper';
import * as colors from '../../constants/colors';
import * as routes from '../../constants/routes';
import { RIGHT, values } from '../../constants/settings';
import * as styles from './styles';

const Settings = ({
  handPreference,
  setHandPreference,
}) => {
  const { navigate, setOptions } = useNavigation();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButton
          route={routes.ENTRY_LIST}
          side={RIGHT}
          text="Close"
        />
      ),
    });
  }, [setOptions]);

  const handleHandPref = React.useCallback(
    (event) => {
      console.log('handleHandPref: ', event.nativeEvent);
      setHandPreference(R.path(['nativeEvent', 'selectedSegmentIndex'], event));
    },
    [setHandPreference],
  );

  const handleNewVehicle = React.useCallback(
    () => navigate(routes.NEW_VEHICLE),
    [navigate],
  );

  const NewVehicleButtonLabel = React.useMemo(
    () => (
      <View style={styles.vehicleButtonLabel}>
        <MCIcon color={colors.gallonBlue} name="plus" size={20} />
        <Text style={styles.vehicleButtonLabelText}>Add New Vehicle</Text>
      </View>
    ),
    [],
  );

  return (
    <Wrapper>
      <View style={styles.settingWrap}>
        <Heading label="Manage Vehicles" noPadding={true} />
        <VehicleList />
        <Button label={NewVehicleButtonLabel} onPress={handleNewVehicle} />
      </View>
      <Heading label="Preferences" />
      <View style={styles.settingWrap}>
        <Text style={styles.settingLabel}>Which is your dominant hand?</Text>
        <SegmentedControl
          onChange={handleHandPref}
          selectedIndex={handPreference}
          values={values}
        />
      </View>
    </Wrapper>
  );
};

export default React.memo(Settings);
