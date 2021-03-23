import CodeMirror from 'codemirror';
import { useLayoutEffect } from 'react';

import 'codemirror/lib/codemirror.css';

import { EditorTheme } from '../models';

interface IUseThemeParams {
  editor: CodeMirror.Editor | null;
  theme: EditorTheme;
}

export function useTheme(params: IUseThemeParams) {
  useLayoutEffect(() => {
    if (params.editor) {
      changeTheme(params.editor, params.theme);
    }
  }, [params.editor, params.theme]);
}

function changeTheme(editor: CodeMirror.Editor, theme: EditorTheme): void {
  editor.setOption('theme', theme);

  if (theme !== 'default') {
    import(`codemirror/theme/${theme}.css`);
  }
}
