import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #f1f4f9;
    font-family: Frutiger, Arial,  sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    height: 100%
  }

  #root {
    -webkit-transform: translate3d(0, 0, 0);
  }

  input {
    font-family: Frutiger, Arial,  sans-serif;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield; /* Firefox */
  }

  button {
    font-family: Frutiger, Arial,  sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
  
  div {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
