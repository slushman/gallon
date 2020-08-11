export const gallonBlack = 'rgba(28, 28, 30, 1)';
export const transparent = 'rgba(255, 255, 255, 0)';
export const white = 'rgba(255, 255, 255, 1)';

export const lightGray = 'rgba(242, 242, 247, 1)';
export const perfectGray = 'rgba(117, 117, 117, 1)';
export const darkGray = 'rgba(72, 72, 74, 1)';

export const getBlue = (isDarkMode) => (isDarkMode ? 'rgba(10, 132, 255, 1)' : 'rgba(0, 109, 247, 1)');
export const getGreen = (isDarkMode) => (isDarkMode ? 'rgba(48, 209, 88, 1)' : 'rgba(52, 199, 89, 1)');
export const getRed = (isDarkMode) => (isDarkMode ? 'rgba(255, 69, 58, 1)' : 'rgba(215, 0, 21, 1)');
export const getBgColor = (isDarkMode) => (isDarkMode ? gallonBlack : white);
export const getBgContrast = (isDarkMode) => (isDarkMode ? lightGray : gallonBlack);
export const getRedContrast = (isDarkMode) => (isDarkMode ? gallonBlack : white);
