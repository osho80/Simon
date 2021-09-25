import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear; 
  }
  h1, h2 {
    color: ${({ theme }) => theme.titleColor};
  }
  input {
    background-color: ${({ theme }) => theme.inputBcg};
    color: ${({ theme }) => theme.text};
    border: 2px solid black;
  }
  `;
