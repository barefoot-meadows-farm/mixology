/**
 * Mixology app color scheme based on deep purples and rich burgundies
 */

// Primary color palette
const primaryColor = '#5B4B8A'; // Deep purple
const secondaryColor = '#8D384D'; // Rich burgundy
const tertiaryColor = '#E9E3FF'; // Light lavender
const quaternaryColor = '#FEE1E8'; // Soft pink

export const Colors = {
  light: {
    text: '#1E1E1E',
    subtext: '#5E5E5E',
    background: '#FFFFFF',
    cardBackground: '#F9F9F9',
    tint: primaryColor,
    primary: primaryColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    quaternary: quaternaryColor,
    icon: primaryColor,
    tabIconDefault: '#687076',
    tabIconSelected: primaryColor,
    buttonText: '#FFFFFF',
    border: '#E1E1E1',
    tag: {
      background: tertiaryColor,
      text: primaryColor
    }
  },
  dark: {
    text: '#ECEDEE',
    subtext: '#A7A7A7',
    background: '#1E1E1E',
    cardBackground: '#2D2D2D',
    tint: tertiaryColor,
    primary: primaryColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    quaternary: quaternaryColor,
    icon: tertiaryColor,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tertiaryColor,
    buttonText: '#FFFFFF',
    border: '#3D3D3D',
    tag: {
      background: '#3D3D3D',
      text: tertiaryColor
    }
  },
};