import CodeMirror from 'codemirror';
import { useCallback } from 'react';

import { IEditorModification } from '../../models';

export interface IUseHighlightCurrentLineParams {
  isActive?: boolean;
}

export function useHighlightCurrentLine(params?: IUseHighlightCurrentLineParams): IEditorModification {
  const handleOnEditorInit = useCallback((editor: CodeMirror.Editor) => {
    editor.on('cursorActivity', handleOnCursorActivity);
    handleOnCursorActivity(editor);
  }, []);

  return {
    isActive: params?.isActive ?? true,
    onEditorInit: handleOnEditorInit,
  };
}

const handleOnCursorActivity = (editor: CodeMirror.Editor) => {
  editor.getDoc().eachLine((line: any) => {
    editor.removeLineClass(line.lineNo(), 'wrap', 'activeline')
  });

  editor.addLineClass(editor.getCursor().line, 'wrap', 'activeline')
};

