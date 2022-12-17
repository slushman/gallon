import React from 'react';
import * as R from 'ramda';
import dayjs from 'dayjs';
import * as ReactRedux from 'react-redux';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../ListItem';
import Swipeable from '../Swipeable';
import * as colors from '../../utils/colors';
import { Color, Route, ServiceType } from '../../constants/enums';
import * as maps from '../../constants/maps';
import * as selectors from '../../redux/selectors';
import { useDarkmode } from '../../hooks/useDarkMode';
import { getMPG } from '../../utils/mpg';
import { noop } from '../../utils';
dayjs.extend(LocalizedFormat);
const EntryItem = ({ date, gallons, id, odometer, previousOdometer, services, total, type, vehicle, }) => {
    const { navigate } = useNavigation();
    const isDarkMode = useDarkmode();
    const green = colors.getGreen(isDarkMode);
    const red = colors.getRed(isDarkMode);
    const i18nDate = dayjs(date).format('LLL');
    const showGallons = ReactRedux.useSelector(selectors.showGallonsSelector);
    const showPrice = ReactRedux.useSelector(selectors.showPriceSelector);
    const entry = React.useMemo(() => ({
        date,
        gallons,
        id,
        odometer,
        previousOdometer,
        services,
        total,
        type,
        vehicle,
    }), [
        date,
        gallons,
        id,
        odometer,
        previousOdometer,
        services,
        total,
        type,
        vehicle,
    ]);
    const entryMPG = React.useMemo(() => {
        if (type === ServiceType.SERVICE)
            return null;
        return `${getMPG(gallons, odometer, previousOdometer).toFixed(1)} mpg`;
    }, [gallons, odometer, previousOdometer, type]);
    const subtitleContent = React.useMemo(() => {
        let content = [];
        if (type === ServiceType.FILLUP) {
            if (showGallons) {
                content.push(`${gallons} gallons`);
            }
            if (showPrice) {
                content.push(`$${total}`);
            }
        }
        if (type === ServiceType.SERVICE) {
            content = services;
        }
        return R.join(', ', content);
    }, [gallons, services, showGallons, showPrice, total, type]);
    const goToEdit = React.useCallback(() => {
        const route = type === ServiceType.FILLUP
            ? Route.FILLUP_FORM
            : Route.SERVICE_FORM;
        const params = type === ServiceType.FILLUP
            ? entry
            : { screen: route,
                params: entry };
        navigate(route, params);
    }, [entry, navigate, type]);
    const handleEntryPress = React.useCallback(() => {
        const route = type === ServiceType.FILLUP
            ? Route.FILLUP_DETAILS
            : Route.SERVICE_DETAILS;
        navigate(route, Object.assign({}, entry));
    }, [entry, navigate, type]);
    const rightActions = React.useMemo(() => {
        return [
            {
                bgColor: green,
                label: 'Edit',
                onPress: goToEdit,
                textColor: Color.GALLON_BLACK,
            },
            {
                bgColor: red,
                label: 'Delete',
                onPress: noop,
            },
        ];
    }, [goToEdit, green, red]);
    return (<Swipeable item={entry} rightActions={rightActions}>
      <ListItem leftContent={i18nDate} leftIcon={maps.iconMap[type]} onPress={handleEntryPress} pressData={entry} rightContent={entryMPG} subtitle={subtitleContent}/>
    </Swipeable>);
};
export default React.memo(EntryItem);
//# sourceMappingURL=EntryItem.js.map