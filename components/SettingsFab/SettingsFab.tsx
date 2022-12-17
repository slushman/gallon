import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ReactRedux from 'react-redux';

import Fab from '../Fab';
import { expandFabs } from '../../redux/actions';
import { Route } from '../../constants/enums';

const SettingsFab: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = ReactRedux.useDispatch();

  const handleExpandFabs = React.useCallback(() => dispatch(expandFabs(false)), [dispatch]);

  const handlePress = React.useCallback(
    () => {
      handleExpandFabs();
      navigate(Route.SETTINGS);
    },
    [handleExpandFabs, navigate],
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
