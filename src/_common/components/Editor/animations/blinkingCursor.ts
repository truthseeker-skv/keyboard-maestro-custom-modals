import { keyframes } from 'styled-components';

interface IBlinkingCursorParams {
  bgColor: string;
  color: string;
}

export const blinkingCursorAnimation = (params: IBlinkingCursorParams) => keyframes`
  from, to {
    background-color: ${params.bgColor};
    color: ${params.color};
  }
  50% {
    background-color: transparent;
    color: ${params.bgColor};
  }
`;
