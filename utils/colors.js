import { Color } from '../constants/enums';
export const getBgColor = (isDarkMode) => (isDarkMode ? Color.GALLON_BLACK : Color.WHITE);
export const getBgContrast = (isDarkMode) => (isDarkMode ? Color.LIGHT_GRAY : Color.GALLON_BLACK);
export const getBlue = (isDarkMode) => (isDarkMode ? Color.DARK_BLUE : Color.LIGHT_BLUE);
export const getGreen = (isDarkMode) => (isDarkMode ? Color.DARK_GREEN : Color.LIGHT_GREEN);
export const getRed = (isDarkMode) => (isDarkMode ? Color.DARK_RED : Color.LIGHT_RED);
export const getRedContrast = (isDarkMode) => (isDarkMode ? Color.GALLON_BLACK : Color.WHITE);
//# sourceMappingURL=colors.js.map