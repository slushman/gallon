import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fabsExpandedSelector } from '../../redux/selectors';

const mapState = createStructuredSelector({
  fabsExpanded: fabsExpandedSelector,
});

export default connect(mapState);
