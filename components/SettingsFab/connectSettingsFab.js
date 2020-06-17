import { connect } from 'react-redux';

import { expandFabs } from '../../redux/actions';

const mapDispatch = (dispatch) => ({
  expandFabs: () => dispatch(expandFabs(false)),
});

export default connect(null, mapDispatch);
