import React from 'react';

import Fab from '../Fab';
import { NewFabProps } from './types';

const NewFab: React.FC<NewFabProps> = ({ expandFabs, fabsExpanded }) => {
  const handlePress = React.useCallback(
    () => expandFabs(!fabsExpanded),
    [expandFabs, fabsExpanded],
  );

  return (
    <Fab
      iconName="plus"
      iconSize={42}
      onPress={handlePress}
      rotate={fabsExpanded}
      rotationEnd="45deg"
    />
  );
};

export default React.memo(NewFab);
