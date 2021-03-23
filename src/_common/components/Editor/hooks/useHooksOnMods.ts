import CodeMirror from 'codemirror';

import { IEditorModification } from '../models';

export function useHooksOnMods(mods: Array<IEditorModification>): Required<IEditorModification> {
  const activeMods = mods.filter((mod) => mod.isActive ?? true);

  const handleOnEditorInit = (editor: CodeMirror.Editor) => {
    activeMods.forEach((mod) => {
      if (mod.onEditorInit) {
        mod.onEditorInit(editor);
      }
    });
  };

  return {
    isActive: true,
    onEditorInit: handleOnEditorInit,
  };
}

