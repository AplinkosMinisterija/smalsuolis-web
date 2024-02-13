import { createGlobalStyle } from 'styled-components';

interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  transparent: string;
  label: string;
  error: string;
  success: string;
  hover: {
    primary: string;
    secondary: string;
    tertiary: string;
    transparent: string;
    danger: string;
    success: string;
    [key: string]: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    labels: string;
    accent: string;
    error: string;
    input: string;
    [key: string]: string;
  };
  border: string;
  background: string;
}
interface Theme<T> {
  colors: T & ThemeColors;
}

export const theme: Theme<{
  powder: string;
  purple: string;
  purpleBrighter: string;
  yellow: string;
  yellowDarker: string;
  greyDarker: string;
  lightSteelBlue: string;
  cardBackground: { primary: string; success: string };
  largeButton: {
    FLORAL_WHITE: string;
    GHOST_WHITE: string;
    AZURE: string;
    HONEY_DEW: string;
    ALICE_BLUE: string;
    GREY: string;
  };
}> = {
  colors: {
    primary: '#73DC8C',
    secondary: '#121A55',
    tertiary: '#101010',
    transparent: 'transparent',
    label: '#4B5565',
    error: '#FE5B78',
    success: '#258800',
    powder: '#FFFFFFCC',
    purple: '#8a33fe',
    purpleBrighter: '#b020a2',
    yellow: '#ffb400',
    yellowDarker: '#ffd399',
    greyDarker: '#d4d5de',
    lightSteelBlue: '#cdd5df',
    hover: {
      primary: '#73DC8C',
      secondary: '#121A55',
      tertiary: '#F7F7F7',
      transparent: 'transparent',
      danger: '#FE5B78E6',
      success: '#4FB922B3',
    },
    text: {
      primary: '#101010',
      secondary: '#525252',
      tertiary: '#4B5565',
      labels: '#697586',
      accent: '#102EB1',
      error: '#FE5B78',
      input: '#231f20',
      powder: '#FFFFFFCC',
      retroBlack: '#101010',
      royalBlue: '#1121DA',
    },
    border: '#CDD5DF',
    background: '#f7f7f7',
    cardBackground: { primary: '#f7f7f7', success: '#eafbf6' },
    largeButton: {
      FLORAL_WHITE: '#FFF5E8',
      GHOST_WHITE: '#EBEDFD', //'#F0F0FF'
      AZURE: '#EAFBF6',
      HONEY_DEW: '#E3F5E1',
      ALICE_BLUE: '#E6F4FF',
      GREY: '#f7f7f7',
    },
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  html {
    font-size: 62.5%;
    width: 100vw;
    color: ${theme.colors.text.primary};
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${theme.colors.background};
    font-size: 1.6rem;
    overflow: hidden;
    justify-content: center;
  }
  h1 {
    font-size: 3.2rem;
    color: ${theme.colors.text.primary};
  }
  a {
    text-decoration: none;
    color: inherit;
    :hover {
      color: inherit;
    }
  }
  button {
    outline: none;
    text-decoration: none;
    display: block;
    border: none;
    background-color: transparent;
  }

  textarea {
    font-size: 1.6rem;
  }
  
`;

export const device = {
  mobileS: `(max-width: 320px)`,
  mobileM: `(max-width: 425px)`,
  mobileL: `(max-width: 868px)`,
  desktop: `(min-width: 869px)`,
};
