import CodeMirror from 'codemirror';
import { useCallback } from 'react';

import { IEditorModification } from '../../models';

interface IUseEscapeKeyDownParams {
  isActive?: boolean;
  onExit: () => void;
}

export function useExitShortcut(params: IUseEscapeKeyDownParams): IEditorModification {
  const handleOnEditorInit = useCallback((editor: CodeMirror.Editor) => {
    editor.on('keydown', handleOnKeyDown);
  }, []);

  const handleOnKeyDown = (editor: CodeMirror.Editor, e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'Escape') {
      params.onExit();
    }
  };

  return {
    isActive: params?.isActive ?? true,
    onEditorInit: handleOnEditorInit,
  };
}

