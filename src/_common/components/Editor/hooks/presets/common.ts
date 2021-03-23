import { useExitShortcut } from '../mods/useExitShortcut';
import { useFakeVimCursor } from '../mods/useFakeVimCursor';
import { useHighlightCurrentLine } from '../mods/useHighlightCurrentLine';
import { useLineNumbers } from '../mods/useLineNumbers';
import { useVimMode } from '../mods/useVimMode';

interface IUseCommonModsPresetParams {
  isVimMode: boolean;
  onEditorExit: () => void;
}

export function useCommonModsPreset({
  isVimMode,
  onEditorExit,
}: IUseCommonModsPresetParams) {
  return [
    useHighlightCurrentLine(),
    useExitShortcut({
      onExit: onEditorExit,
    }),
    useVimMode({
      isActive: isVimMode,
    }),
    useFakeVimCursor({
      isActive: isVimMode,
    }),
    useLineNumbers({
      isRelativeLines: isVimMode,
    }),
  ];
}

