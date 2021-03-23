import CodeMirror from 'codemirror';
import { useRef, useCallback } from 'react';

import { VimMode, IEditorModification } from '../../models';

export interface IUseFakeVimCursorParams {
  isActive?: boolean;
}

export function useFakeVimCursor(params?: IUseFakeVimCursorParams): IEditorModification {
  const vimMode = useRef<VimMode>('normal');

  const handleOnEditorInit = useCallback((editor: CodeMirror.Editor) => {
    CodeMirror.on(editor, 'vim-mode-change', handleChangeVimMode(editor));
    editor.on('cursorActivity', handleOnCursorActivity);

    handleChangeFakeCursor(editor)(vimMode.current);
  }, []);

  const handleChangeVimMode = (editor: CodeMirror.Editor) => ({ mode }: Record<string, VimMode>) => {
    vimMode.current = mode;
    handleChangeFakeCursor(editor!)(vimMode.current);
  };

  const handleOnCursorActivity = (editor: CodeMirror.Editor) => {
    handleChangeFakeCursor(editor)(vimMode.current);
  };

  return {
    isActive: params?.isActive ?? true,
    onEditorInit: handleOnEditorInit,
  };
}

const handleChangeFakeCursor = (editor: CodeMirror.Editor) => (mode: VimMode) => {
  editor.getDoc().eachLine((line: any) => {
    editor.removeLineClass(line.lineNo(), 'wrap', 'fake-caret')
  });

  const lineIdx = editor.getCursor().line;

  const isLineEmpty = !editor.getLine(lineIdx);
  const isNormalMode = mode === 'normal';

  if (isLineEmpty && isNormalMode) {
    editor.addLineClass(lineIdx, 'wrap', 'fake-caret')
  }
}
