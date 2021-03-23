import invariant from 'invariant';
import { useCallback, useState } from 'react';

import { IKeyboardMaestroModal } from '../../../_common/hooks/useKeyboardMaestroModal';
import useAnkiDecks from '../../_common/hooks/useDecks';

export interface IUseAnkiNoteModal {
  kmModal: IKeyboardMaestroModal;
}

export function useEngWordsModal({ kmModal }: IUseAnkiNoteModal) {
  const [content, setContent] = useState('');
  const ankiDecks = useAnkiDecks();

  const handleSubmit = useCallback(() => {
    invariant(ankiDecks.selected, 'Exporter and deck must be specified!');

    const dataToSend = {
      deck: ankiDecks.selected!,
      words: Array.from(content.matchAll(/([^\r\n]+)/gm)).map(item => item[0]),
    };

    kmModal.setSubmitData(dataToSend);
    kmModal.submit();
  }, [ankiDecks]);

  return {
    decks: ankiDecks,
    content,
    error: ankiDecks.error,
    setContent,
    close: kmModal.close,
    submit: handleSubmit,
  };
}
