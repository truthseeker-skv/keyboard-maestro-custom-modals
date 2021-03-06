import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/AddCircleOutlineSharp';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Editor, presets } from '@truthseeker-skv/react-code-mirror/lib/Editor';

import { ModalContainer } from '../../_common/components/ModalContainer';
import { useMaterialAutocompleteWithCreatable } from '../../_common/hooks/useMaterialAutocompleteWithCreatable';
import { useKeyboardMaestroModal } from '../../_common/hooks/useKeyboardMaestroModal';
import { useMarkdownCardTemplate } from './hooks/useMarkdownCardTemplate';
import { useMarkdownModal } from './hooks/useMarkdownModal';

import '@truthseeker-skv/react-code-mirror/lib/Editor/code-mirror.css';

export const AnkiMarkdownModal = (): JSX.Element => {
  const kmModal = useKeyboardMaestroModal({
    title: 'New Anki card',
    winWidth: 800,
    winHeight: 600,
  });

  const mdModal = useMarkdownModal({ kmModal });

  const autocomplete = useMaterialAutocompleteWithCreatable({
    groupBy: (opt) => opt.split('::')[0],
    list: mdModal.decks.list,
    onChange: mdModal.decks.selectItem
  });

  const commonEditorModsPreset = presets.useCommonModsPreset({
    isVimMode: true,
    onEditorExit: mdModal.close,
  });

  const watchCardTemplateMod = useMarkdownCardTemplate();

  return (
    <ModalContainer isKmModalReady={kmModal.isModalReady}>
      <React.Fragment>
        <CssBaseline />
        <Box display="flex" flexDirection="column" height={1}>
          <Box display="flex" p={1} mx={1}>
            <Autocomplete
              id="anki-deck"
              options={autocomplete.options}
              groupBy={autocomplete.groupBy}
              fullWidth
              getOptionLabel={(opt) => opt.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Deck name"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={autocomplete.onChange}
              onInputChange={autocomplete.onInputChange}
            />
          </Box>
          <Box position="relative" display="flex" flexDirection="column" flexGrow={1} my={1} mx={2}>
            <Editor
              value={mdModal.content}
              mods={[
                ...commonEditorModsPreset,
                watchCardTemplateMod,
              ]}
              onChange={mdModal.setContent}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" py={2}>
            <Box flex={[1, 1]} ml={3}>
              <IconButton onClick={mdModal.addCardTemplate}>
                <AddIcon />
              </IconButton>
            </Box>
            <Box mr={2} display="flex" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                onClick={mdModal.close}
              >
                Cancel
              </Button>
            </Box>
            <Box mr={3} display="flex" alignItems="center">
              <Button
                variant="contained"
                size="small"
                disabled={!mdModal.decks.selected}
                onClick={mdModal.submit}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    </ModalContainer>
  );
}
