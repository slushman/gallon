import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fabsExpandedSelector, handPreferenceSelector } from '../../redux/selectors';

const mapState = createStructuredSelector({
  fabsExpanded: fabsExpandedSelector,
  handPref: handPreferenceSelector,
});

export default connect(mapState);
