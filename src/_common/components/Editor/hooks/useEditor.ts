import CodeMirror from 'codemirror';
import React, { useCallback, useLayoutEffect, useEffect } from 'react';

import { IEditorProps } from '..';
import { useHooksOnMods } from './useHooksOnMods';
import { useTheme } from './useTheme';

export function useEditor(props: IEditorProps) {
  const ref = React.useRef(null);
  const editor = React.useRef<CodeMirror.Editor | null>(null);

  useTheme({
    editor: editor.current,
    theme: props.theme
  });

  const modsHooks = useHooksOnMods(props.mods || []);

  const handleOnEditorChange = useCallback((editor: CodeMirror.Editor) => {
    props.onChange(editor.getValue());
  }, [props.onChange]);

  useLayoutEffect(() => {
    editor.current = CodeMirror(ref.current!, {
      value: props.value,
      mode: 'gfm',
      inputStyle: 'contenteditable',
      theme: props.theme,
      tabSize: 4,
    });

    editor.current.on('change', handleOnEditorChange);

    // TODO: create hook for case of editor destruction
    modsHooks.onEditorInit(editor.current);

    editor.current.refresh();
    editor.current.focus();
  }, []);

  useEffect(() => {
    if (editor.current?.getValue() !== props.value) {
      editor.current?.setValue(props.value);
    }
  }, [props]);

  return {
    editorRef: ref,
  };
}
