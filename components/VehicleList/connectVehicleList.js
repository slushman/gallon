import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { vehicleListSelector } from '../../redux/selectors';
const mapState = createStructuredSelector({
    vehicleList: vehicleListSelector,
});
export default connect(mapState);
//# sourceMappingURL=connectVehicleList.js.map