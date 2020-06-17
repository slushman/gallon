import React from 'react';

import Button from '../../components/Button';
import Wrapper from '../../components/Wrapper';
import * as routes from '../../constants/routes';

const NewEntry = ({ navigation: { navigate } }) => {
  const goToNewFillup = React.useCallback(
    () => navigate(routes.NEW_FILLUP),
    [],
  );

  const goToNewService = React.useCallback(
    () => navigate(routes.NEW_SERVICE),
    [],
  );

  return (
    <Wrapper centerContent>
      <Button label="New Fill-up" onPress={goToNewFillup} />
      <Button label="New Service" onPress={goToNewService} />
    </Wrapper>
  );
};

export default React.memo(NewEntry);
