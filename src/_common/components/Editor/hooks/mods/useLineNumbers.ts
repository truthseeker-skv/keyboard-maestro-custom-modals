import CodeMirror from 'codemirror';
import { useCallback } from 'react';

import { IEditorModification } from '../../models';

export interface IUseLineNumbersParams {
  isActive?: boolean;
  isRelativeLines?: boolean;
}

export function useLineNumbers(params?: IUseLineNumbersParams): IEditorModification {
  const handleOnEditorInit = useCallback((editor: CodeMirror.Editor) => {
    editor.setOption('lineNumbers', true);

    if (params?.isRelativeLines) {
      editor.on('cursorActivity', showRelativeLines);
      showRelativeLines(editor);
    }
  }, []);

  return {
    isActive: params?.isActive ?? true,
    onEditorInit: handleOnEditorInit,
  };
}

function showRelativeLines(editor: CodeMirror.Editor) {
  const lineNum = editor.getCursor().line + 1;
  editor.state.curLineNum = lineNum;

  editor.setOption('lineNumberFormatter', (ln: number) =>
    (ln === lineNum)
      ? lineNum.toString()
      : Math.abs(lineNum - ln).toString());
}

