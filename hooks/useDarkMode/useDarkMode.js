import { useColorScheme } from 'react-native-appearance';
export const useDarkmode = () => {
    const scheme = useColorScheme();
    return scheme === 'dark';
};
//# sourceMappingURL=useDarkMode.js.map