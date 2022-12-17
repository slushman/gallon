import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Fab from '../Fab';
import { Route } from '../../constants/enums';
const NewServiceFab = ({ expandFabs, fabsExpanded }) => {
    const { navigate } = useNavigation();
    const handlePress = React.useCallback(() => {
        expandFabs(false);
        navigate(Route.SERVICE_FORM);
    }, [expandFabs, navigate]);
    return (<Fab iconName="tools" iconSize={30} onPress={handlePress} visible={fabsExpanded}/>);
};
export default React.memo(NewServiceFab);
//# sourceMappingURL=NewServiceFab.js.map