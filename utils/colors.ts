import { Color } from '../constants/enums';

export const getBgColor = (isDarkMode: boolean) => (isDarkMode ? Color.GALLON_BLACK : Color.WHITE);
export const getBgContrast = (isDarkMode: boolean) => (isDarkMode ? Color.LIGHT_GRAY : Color.GALLON_BLACK);
export const getBlue = (isDarkMode: boolean) => (isDarkMode ? Color.DARK_BLUE : Color.LIGHT_BLUE);
export const getGreen = (isDarkMode: boolean) => (isDarkMode ? Color.DARK_GREEN : Color.LIGHT_GREEN);
export const getRed = (isDarkMode: boolean) => (isDarkMode ? Color.DARK_RED : Color.LIGHT_RED);
export const getRedContrast = (isDarkMode: boolean) => (isDarkMode ? Color.GALLON_BLACK : Color.WHITE);
