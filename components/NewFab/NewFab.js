import React from 'react';
import Fab from '../Fab';
const NewFab = ({ expandFabs, fabsExpanded }) => {
    const handlePress = React.useCallback(() => expandFabs(!fabsExpanded), [expandFabs, fabsExpanded]);
    return (<Fab iconName="plus" iconSize={42} onPress={handlePress} rotate={fabsExpanded} rotationEnd="45deg"/>);
};
export default React.memo(NewFab);
//# sourceMappingURL=NewFab.js.map