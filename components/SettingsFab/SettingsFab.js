import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Fab from '../Fab';
import * as routes from '../../constants/routes';

const SettingsFab = ({ expandFabs }) => {
  const { navigate } = useNavigation();

  const handlePress = React.useCallback(
    () => {
      expandFabs();
      navigate(routes.SETTINGS);
    },
    [expandFabs, navigate],
  );

  return (
    <Fab
      iconName="cog"
      iconSize={36}
      onPress={handlePress}
    />
  );
};

export default React.memo(SettingsFab);
