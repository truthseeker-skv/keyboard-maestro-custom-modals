import CodeMirror from 'codemirror';

export interface IEditorModification {
  isActive?: boolean;
  onEditorInit?: (editor: CodeMirror.Editor) => void;
}

export type VimMode = 'normal'|'visual'|'insert'|'replace';

export type EditorTheme = '3024-day' | '3024-night' | 'abcdef' | 'ambiance-mobile' | 'ambiance' | 'ayu-dark'
  | 'ayu-mirage' | 'base16-dark' | 'base16-light' | 'bespin' | 'blackboard' | 'cobalt' | 'colorforth' | 'darcula'
  | 'dracula' | 'duotone-dark' | 'duotone-light' | 'eclipse' | 'elegant' | 'erlang-dark' | 'gruvbox-dark' | 'hopscotch'
  | 'icecoder' | 'idea' | 'isotope' | 'lesser-dark' | 'liquibyte' | 'lucario' | 'material-darker' | 'material-ocean'
  | 'material-palenight' | 'material' | 'mbo' | 'mdn-like' | 'midnight' | 'monokai' | 'moxer' | 'neat' | 'neo'
  | 'night' | 'nord' | 'oceanic-next' | 'panda-syntax' | 'paraiso-dark' | 'paraiso-light' | 'pastel-on-dark'
  | 'railscasts' | 'rubyblue' | 'seti' | 'shadowfox' | 'solarized' | 'ssms' | 'the-matrix' | 'tomorrow-night-bright'
  | 'tomorrow-night-eighties' | 'ttcn' | 'twilight' | 'vibrant-ink' | 'xq-dark' | 'xq-light' | 'yeti' | 'yonce'
  | 'zenburn' | 'default';
