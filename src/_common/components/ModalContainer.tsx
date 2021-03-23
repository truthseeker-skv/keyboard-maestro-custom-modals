import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export interface IModalContainerProps {
  isKmModalReady: boolean;
  children?: React.ReactChild;
}

export const ModalContainer = ({ children, isKmModalReady }: IModalContainerProps) => {
  if (!isKmModalReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyles />
        {children}
      </Wrapper>
    </ThemeProvider>
  );
};

export const Wrapper = styled.div`
  height: 100%;
  color: #ffffff;
`;

const GlobalStyles = createGlobalStyle`
  html,
  body,
  #app-root {
    position: relative;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #262626;
    font-family: Roboto, sans-serif;
  }

  * {
    font-family: Roboto, sans-serif;
  }
`;
