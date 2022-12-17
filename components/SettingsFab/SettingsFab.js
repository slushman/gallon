import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Fab from '../Fab';
import { Route } from '../../constants/enums';
const SettingsFab = ({ expandFabs }) => {
    const { navigate } = useNavigation();
    const handlePress = React.useCallback(() => {
        expandFabs();
        navigate(Route.SETTINGS);
    }, [expandFabs, navigate]);
    return (<Fab iconName="cog" iconSize={36} onPress={handlePress}/>);
};
export default React.memo(SettingsFab);
//# sourceMappingURL=SettingsFab.js.map