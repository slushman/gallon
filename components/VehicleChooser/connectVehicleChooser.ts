import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { vehicleListSelector } from '../../redux/selectors';

const mapState = createStructuredSelector({
  options: vehicleListSelector,
});

export default connect(mapState);
