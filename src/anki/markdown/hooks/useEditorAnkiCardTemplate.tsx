import CodeMirror, { LineHandle } from 'codemirror';
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

import { IEditorModification } from '../../../_common/components/Editor/models';

interface IUseEditorAnkiCardTemplateParams {
}

export function useEditorAnkiCardTemplate(params?: IUseEditorAnkiCardTemplateParams): IEditorModification {
  const handleOnEditorInit = useCallback((editor: CodeMirror.Editor) => {
    editor.on('change', debounce(findTemplates));
  }, []);

  return {
    onEditorInit: handleOnEditorInit,
  };
}

function findTemplates(editor: CodeMirror.Editor) {
  editor.eachLine((line) => {
    if (line.text === '[[Q]]') {
      createTitleWidget(editor, '', line);
    }
    if (line.text === '[[A]]') {
      createTitleWidget(editor, '', line);
    }
  });
}

const Title = styled.div`
  position: relative;
  width: 100%;
  border-top: 1px solid red;
  z-index: 3;
`;

function createTitleWidget(editor: CodeMirror.Editor, title: string, line: LineHandle) {
  const lineIdx = editor.getDoc().getLineNumber(line) ?? 0;

  const lineElem: HTMLPreElement | null = document.querySelector(
    `.CodeMirror-code > div:nth-child(${lineIdx + 1})`
  );

  if (!lineElem) {
    return;
  }

  line.text = '';
  ReactDOM.render(<Title />, lineElem);

  // editor.setCursor(lineIdx + 1);

  editor.addLineWidget(line, lineElem, {
    above: true,
    coverGutter: true,
  });
}
