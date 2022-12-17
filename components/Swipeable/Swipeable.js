import React from 'react';
import { I18nManager, View } from 'react-native';
import RNSwipeable from 'react-native-gesture-handler/Swipeable';
import { actionButtonWidth } from '../../constants/sizes';
import { noop } from '../../utils';
import SwipeableButton from '../SwipeableButton';
const Swipeable = ({ children, item, leftActions = [], onSwipeLeft = noop, onSwipeRight = noop, rightActions = [], }) => {
    const swipeableRef = React.useRef(null);
    const buttonRowStyle = React.useCallback((count) => ({
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        width: count * actionButtonWidth,
    }), []);
    const closeSwipeable = React.useCallback(() => {
        if (swipeableRef.current) {
            swipeableRef.current.close();
        }
    }, [swipeableRef]);
    const renderActionButton = React.useCallback((buttonProps, index) => {
        return (<SwipeableButton buttonProps={buttonProps} item={item} key={index} onClose={closeSwipeable}/>);
    }, [closeSwipeable, item]);
    const renderLeftActions = React.useCallback(() => {
        const rowStyles = buttonRowStyle(leftActions.length);
        return (<View style={rowStyles}>
          {leftActions.forEach(renderActionButton)}
        </View>);
    }, [buttonRowStyle, leftActions, renderActionButton]);
    const renderRightActions = React.useCallback(() => {
        const rowStyles = buttonRowStyle(rightActions.length);
        return (<View style={rowStyles}>
          {rightActions.map(renderActionButton)}
        </View>);
    }, [buttonRowStyle, renderActionButton, rightActions]);
    return (<RNSwipeable onSwipeableLeftOpen={onSwipeLeft(item)} onSwipeableRightOpen={onSwipeRight(item)} ref={swipeableRef} renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
      {children}
    </RNSwipeable>);
};
export default React.memo(Swipeable);
//# sourceMappingURL=Swipeable.js.map