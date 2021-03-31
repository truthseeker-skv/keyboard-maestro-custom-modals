import CodeMirror from 'codemirror';
import { useCallback } from 'react';
import curry from 'lodash/curry'

import { IEditorModification } from '@truthseeker-skv/react-code-mirror/lib/Editor/models';

import { FRONT_SIDE_LABEL, BACK_SIDE_LABEL } from '../consts';

const titleTemplates = [{
  name: 'front',
  template: new RegExp(`${escapeTemplate(FRONT_SIDE_LABEL)}`),
}, {
  name: 'back',
  template: new RegExp(`^${escapeTemplate(BACK_SIDE_LABEL)}$`),
}];

export function useMarkdownCardTemplate(): IEditorModification {
  const handleOnEditorInit = useCallback((editor: CodeMirror.Editor) => {
    editor.on('cursorActivity', curry(findTemplates)(titleTemplates));
    findTemplates(titleTemplates, editor);
  }, []);

  return {
    onEditorInit: handleOnEditorInit,
  };
}

function findTemplates(templates: typeof titleTemplates, editor: CodeMirror.Editor) {
  editor.eachLine((line) => {
    templates.forEach((item) => {
      if (line.text.match(item.template)) {
        editor.addLineClass(line, 'wrap', 'anki-card-side-title');
      }
    })
  });
}

function escapeTemplate(tmlp: string): string {
  return tmlp.replaceAll('[', '\\[').replaceAll(']', '\]');
}
