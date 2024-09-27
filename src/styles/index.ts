import { createGlobalStyle } from 'styled-components';
import { Theme } from '@aplinkosministerija/design-system';

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
  TRANSPARENT = 'transparent',
}

export const theme: Theme = {
  colors: {
    primary: '#73DC8C',
    secondary: '#121A55',
    tertiary: '#1B4C28',
    transparent: 'transparent',
    label: '#4B5565',
    danger: '#FE5B78',
    success: '#258800',
    powder: '#FFFFFFCC',
    purple: '#8a33fe',
    purpleBrighter: '#b020a2',
    yellow: '#ffb400',
    yellowDarker: '#ffd399',
    greyDarker: '#d4d5de',
    lightSteelBlue: '#cdd5df',
    buttons: {
      [ButtonVariants.PRIMARY]: {
        background: '#73DC8C',
        text: '#101010',
        border: '#73DC8C',
      },
      [ButtonVariants.SECONDARY]: {
        background: 'white',
        text: '#101010',
        border: 'white',
        hover: '#121A55',
      },
      [ButtonVariants.TERTIARY]: {
        background: '#14532D',
        text: 'white',
        border: '#14532D',
        hover: '#14532D',
      },
      [ButtonVariants.DANGER]: {
        background: '#FE5B78',
        text: 'white',
        border: '#FE5B78',
        hover: '#FE5B78E6',
      },
      [ButtonVariants.TRANSPARENT]: {
        background: 'transparent',
        text: '#101010',
        border: 'transparent',
      },
    },
    text: {
      primary: '#101010',
      secondary: '#525252',
      tertiary: '#4B5565',
      label: '#697586',
      error: '#FE5B78',
      labels: '#697586',
      input: '#231f20',
      accent: '#102EB1',
      powder: '#FFFFFFCC',
      retroBlack: '#101010',
      royalBlue: '#1121DA',
    },
    border: '#CDD5DF',
    background: '#f7f7f7',
    cardBackground: { primary: '#f7f7f7', success: '#eafbf6' },
    GREY: '#f7f7f7',
  },
  radius: {
    buttons: 100,
    fields: 0,
    multiSelectFieldTag: 0,
  },
  height: {
    fields: 0,
    buttons: 0,
  },
  fontSize: {
    fields: 0,
    fieldLabels: 0,
    buttons: 0,
  },
  fontWeight: {
    fields: 0,
    fieldLabels: 0,
    buttons: 0,
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
    color: ${theme.colors.text?.primary};
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
    color: ${theme.colors.text?.primary};
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
  tablet: `(max-width: 1280px)`,
  desktop: `(min-width: 869px)`,
};
