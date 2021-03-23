import invariant from 'invariant';
import { useCallback, useState } from 'react';

import { IKeyboardMaestroModal } from '../../../_common/hooks/useKeyboardMaestroModal';
import useAnkiDecks from '../../_common/hooks/useDecks';

export interface ICardSides {
  front: string;
  back: string;
}

export interface IUseAnkiNoteModal {
  kmModal: IKeyboardMaestroModal;
}

export function useMarkdownModal({ kmModal }: IUseAnkiNoteModal) {
  const [content, setContent] = useState(getCardTemplate());
  const ankiDecks = useAnkiDecks();

  const handleSubmit = useCallback(() => {
    invariant(ankiDecks.selected, 'Deck must be specified!');

    const dataToSend = {
      deck: ankiDecks.selected!,
      cards: getCardsFromContent(content),
    };

    kmModal.setSubmitData(dataToSend);
    kmModal.submit();
  }, [kmModal, ankiDecks]);

  const handleAddCardTemplate = useCallback(() => {
    setContent(`${content.trim()}\r\n\r\n${getCardTemplate()}`);
  }, [setContent, content]);

  return {
    decks: ankiDecks,
    content,
    error: ankiDecks.error,
    setContent,
    addCardTemplate: handleAddCardTemplate,
    close: kmModal.close,
    submit: handleSubmit,
  };
}

function getCardTemplate(): string {
  return '' +
`




`;
}

function getCardsFromContent(content: string): Array<ICardSides> {
  const cards = content.split(/'____+/);
  const cardToFields = cards
    .filter(c => !!c.trim())
    .map((card) => {
      return card
        .split(/\[\[Front]]|\[\[Back]]/sigm)
        .slice(-2)
        .map((it) => it.trim());
    });

  return cardToFields
    .reduce((acc: Array<ICardSides>, item) => {
      return acc.concat({
        front: item[0] && `\r\n${item[0]}` || '',
        back: item[1] && `\r\n${item[1]}` || '',
      });
    }, []);
}
