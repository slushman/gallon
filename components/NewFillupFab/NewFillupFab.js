import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Fab from '../Fab';
import { Route } from '../../constants/enums';
const NewFillupFab = ({ expandFabs, fabsExpanded }) => {
    const { navigate } = useNavigation();
    const handlePress = React.useCallback(() => {
        expandFabs();
        navigate(Route.FILLUP_FORM);
    }, [expandFabs, navigate]);
    return (<Fab iconName="fuel" iconSize={30} onPress={handlePress} visible={fabsExpanded}/>);
};
export default React.memo(NewFillupFab);
//# sourceMappingURL=NewFillupFab.js.map