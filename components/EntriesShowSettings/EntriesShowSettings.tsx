import React from 'react';
import { View } from 'react-native';
import * as ReactRedux from 'react-redux';

import ToggleField from '../ToggleField';
import { Setting } from '../../constants/enums';
import * as actions from '../../redux/actions';
import * as selectors from '../../redux/selectors';
import * as uniStyles from '../../utils/styles';

const EntriesShowSettings: React.FC = () => {
  const dispatch = ReactRedux.useDispatch();
  const showGallons = ReactRedux.useSelector(selectors.showGallonsSelector);
  const showPrice = ReactRedux.useSelector(selectors.showPriceSelector);

  const handleSetShowGallons = React.useCallback(
    () => dispatch(actions.setShowGallons(!showGallons)),
    [dispatch, showGallons],
  );

  const handleSetShowPrice = React.useCallback(
    () => dispatch(actions.setShowPrice(!showPrice)),
    [dispatch, showPrice],
  );

  return (
    <>
      <View style={uniStyles.settingWrap}>
        <ToggleField
          initialValue={showGallons}
          label="Show Gallons"
          labelPosition={Setting.RIGHT}
          onToggle={handleSetShowGallons}
        />
      </View>
      <View style={uniStyles.settingWrap}>
        <ToggleField
          initialValue={showPrice}
          label="Show Price"
          labelPosition={Setting.RIGHT}
          onToggle={handleSetShowPrice}
        />
      </View>
    </>
  );
};

export default React.memo(EntriesShowSettings);