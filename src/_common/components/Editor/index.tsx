import React from 'react';

// TODO: create wrapper for handling editor mode
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/jsx/jsx';

import { useEditor } from './hooks/useEditor';
import { IEditorModification, EditorTheme } from './models';
import { getStyles } from './themes/_getStyles';
import { Container } from './StyledContainer';

export interface IEditorProps {
  value: string;
  theme: EditorTheme;
  mods?: Array<IEditorModification>;
  onChange: (value: string) => void;
}

export const Editor = (props: IEditorProps) => {
  const { editorRef } = useEditor(props);

  return (
    <Container
      ref={editorRef}
      theme={getStyles(props.theme)}
    />
  );
};
