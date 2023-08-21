import { createGlobalStyle } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
export interface Theme {
  colors: {
    primary: string;
    disable: string;
    secondary: string;
    tertiary: string;
    transparent: string;
    danger: string;
    success: string;
    login: string;
    hover: {
      primary: string;
      secondary: string;
      tertiary: string;
      danger: string;
      success: string;
      transparent: string;
      login: string;
    };
    tertiaryMedium: string;
    tertiaryLight: string;
    input: string;
    border: string;
    label: string;
    error: string;
    light: string;
    white: string;
    darkerWhite: string;
    pending: string;
    grey: string;
  };
}

export const theme: Theme = {
  colors: {
    disable: "#CDD5DF",
    primary: "#0A196F",
    secondary: "#13C9E7",
    tertiary: "#7A7E9F",
    transparent: "transparent",
    danger: "#FE5B78",
    success: "#4FB922",
    login: "#FFFFFFA3",
    hover: {
      primary: "#0A196F",
      secondary: "#13C9E78F",
      tertiary: "#7A7E9F",
      danger: "#FE5B78E6",
      success: "#4FB922B3",
      login: "#FFFFFFA3",
      transparent: "transparent"
    },
    tertiaryMedium: "#C6C8D6",
    tertiaryLight: "#F3F3F7",
    input: "#F3F3F7",
    border: "#121A553D",
    label: "#0B1F51",
    error: "#FE5B78",
    light: "#f3f3f7",
    white: "#ffffff",
    darkerWhite: "#A4A7BD",
    pending: "#fea700",
    grey: "#B3B5C4"
  }
};

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
  html { 
    font-size: 62.5%; 
    width: 100vw;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f8fafc;
    font-size: 1.6rem;
    overflow:hidden;
    min-height:100vh;
  } 
  h1 {
    font-size: 3.2rem;
    color: "#121A55";
  }
  a {
    text-decoration: none;
    :hover{
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
  #__next {
    height: 100%;
  }
  textarea {
    font-size: 1.6rem;
  }



.leaflet-div-icon {
    background: transparent;
    border: none;
  }


.leaflet-control-layers-toggle  {
    display: none;
}

.leaflet-routing-alternatives-container {
    display: none;
}

.leaflet-control{
  display: none !important;   
}



`;

export const device = {
  mobileS: `(max-width: 320px)`,
  mobileM: `(max-width: 425px)`,
  mobileL: `(max-width: 868px)`
};
