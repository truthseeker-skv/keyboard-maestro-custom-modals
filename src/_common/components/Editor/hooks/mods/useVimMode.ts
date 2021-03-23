import CodeMirror from 'codemirror';
import { useCallback } from 'react';

import 'codemirror/keymap/vim';

import { IEditorModification } from '../../models';

export interface IUseVimModeParams {
  isActive?: boolean;
}

export function useVimMode(params?: IUseVimModeParams): IEditorModification {
  const handleOnEditorInit = useCallback((editor: CodeMirror.Editor) => {
    editor.setOption('keyMap', 'vim');
  }, []);

  return {
    isActive: params?.isActive ?? true,
    onEditorInit: handleOnEditorInit,
  };
}
