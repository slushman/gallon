import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Fab from '../Fab';
import * as routes from '../../constants/routes';

const NewFillupFab = ({ expandFabs, fabsExpanded }) => {
  const { navigate } = useNavigation();

  const handlePress = React.useCallback(
    () => {
      expandFabs();
      navigate(routes.NEW_FILLUP);
    },
    [expandFabs, navigate],
  );

  return (
    <Fab
      iconName="gas-station"
      iconSize={32}
      onPress={handlePress}
      visible={fabsExpanded}
    />
  );
};

export default React.memo(NewFillupFab);
