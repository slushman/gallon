import React from 'react';
import PropTypes from 'prop-types';

import Fab from '../Fab';

const NewFab = ({ expandFabs, fabsExpanded }) => {
  const handlePress = React.useCallback(
    () => expandFabs(!fabsExpanded),
    [expandFabs, fabsExpanded],
  );

  return (
    <Fab
      iconName="plus"
      onPress={handlePress}
      rotate={fabsExpanded}
      rotationEnd="45deg"
    />
  );
};

NewFab.propTypes = {
  expandFabs: PropTypes.func.isRequired,
  fabsExpanded: PropTypes.bool.isRequired,
};

export default React.memo(NewFab);
