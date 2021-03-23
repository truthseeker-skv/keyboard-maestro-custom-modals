import styled, { css } from 'styled-components';

import { blinkingCursorAnimation } from './animations/blinkingCursor';
import { ThemeType } from './themes/default';

interface IContainerProps {
  theme: ThemeType;
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;

  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    ${({ theme }) => css`
      background-color: ${theme.lineSelection.bgColor};
      color: ${theme.lineSelection.color};
    `} 
  }

  & > div.CodeMirror {
    position: relative;
    height: 100%;
    max-height: 100%;
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 16px;

    & .activeline {
      position: relative;
      ${({ theme }) => css`
        background-color: ${theme.activeLine.bgColor};
      `}

      & .CodeMirror-linenumber {
        ${({ theme }) => css`
          background-color: ${theme.activeLineNumber.bgColor};
          color: ${theme.activeLineNumber.color} !important;
        `}
      }
    }

    & .cm-fat-cursor-mark,
    & .cm-animate-fat-cursor {
      animation: ${({ theme }) => css`
        ${blinkingCursorAnimation(theme.blinkingCursorAnimation)} 1.06s steps(1) infinite;
      `}
    }

    & .fake-caret::before {
      position: absolute;
      content: '';
      left: 4px;
      top: 1px;
      height: calc(100% - 3px);
      width: 4px;
      animation: ${({ theme }) => css`
        ${blinkingCursorAnimation(theme.blinkingCursorAnimation)} 1.06s steps(1) infinite;
      `}
    }
    
    & .CodeMirror-dialog-bottom {
      position: relative;
      z-index: 3;
      
      & input {
        width: calc(100% - 16px);
        outline: none;
        ${({ theme }) => css`
          background-color: ${theme.bottomDialogInput.bgColor};
          color: ${theme.bottomDialogInput.color};
        `}
      }
    }
  }

  //& .cm-header-1 {
  //  font-size: 22px !important;
  //}
  //
  //& .cm-header-2 {
  //  font-size: 20px !important;
  //}
  //
  //& .cm-header-3 {
  //  font-size: 18px !important;
  //}
  //
  //& .cm-tag {
  //  color: #52a4fb !important;
  //}
`;
