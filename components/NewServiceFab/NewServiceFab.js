import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Fab from '../Fab';
import * as routes from '../../constants/routes';

const NewServiceFab = ({ expandFabs, fabsExpanded }) => {
  const { navigate } = useNavigation();

  const handlePress = React.useCallback(
    () => {
      expandFabs(false);
      navigate(routes.SERVICE_STACK, {
        screen: routes.NEW_SERVICE,
      });
    },
    [expandFabs, navigate],
  );

  return (
    <Fab
      iconName="tools"
      iconSize={30}
      onPress={handlePress}
      visible={fabsExpanded}
    />
  );
};

export default React.memo(NewServiceFab);
