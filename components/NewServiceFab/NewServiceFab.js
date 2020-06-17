import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Fab from '../Fab';
import * as routes from '../../constants/routes';

const NewServiceFab = ({ expandFabs, fabsExpanded }) => {
  const { navigate } = useNavigation();

  const handlePress = React.useCallback(
    () => {
      expandFabs(false);
      navigate(routes.NEW_SERVICE);
    },
    [expandFabs, navigate],
  );

  return (
    <Fab
      iconName="oil"
      iconSize={32}
      onPress={handlePress}
      visible={fabsExpanded}
    />
  );
};

export default React.memo(NewServiceFab);
