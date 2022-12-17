import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { expandFabs } from '../../redux/actions';
import { fabsExpandedSelector } from '../../redux/selectors';
const mapState = createStructuredSelector({
    fabsExpanded: fabsExpandedSelector,
});
const mapDispatch = (dispatch) => ({
    expandFabs: (fabsExpanded) => dispatch(expandFabs(fabsExpanded)),
});
export default connect(mapState, mapDispatch);
//# sourceMappingURL=connectNewFab.js.map