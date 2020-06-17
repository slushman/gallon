import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setHandPreference } from '../../redux/actions';
import { handPreferenceSelector } from '../../redux/selectors';

const mapState = createStructuredSelector({
  handPreference: handPreferenceSelector,
});

const mapDispatch = (dispatch) => ({
  setHandPreference: (handPref) => dispatch(setHandPreference(handPref)),
});

export default connect(mapState, mapDispatch);
