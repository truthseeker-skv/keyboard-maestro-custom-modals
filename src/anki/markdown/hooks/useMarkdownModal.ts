import invariant from 'invariant';
import { useCallback, useState } from 'react';

import { IKeyboardMaestroModal } from '../../../_common/hooks/useKeyboardMaestroModal';
import useAnkiDecks from '../../_common/hooks/useDecks';
import { FRONT_SIDE_LABEL, BACK_SIDE_LABEL } from '../consts';

export interface ICardSides {
  front: string;
  back: string;
}

export interface IUseMarkdownModal {
  kmModal: IKeyboardMaestroModal;
}

export function useMarkdownModal({ kmModal }: IUseMarkdownModal) {
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
`${FRONT_SIDE_LABEL}


${BACK_SIDE_LABEL}


––––––––––––––––––––––––––––––––––––––––––––––––––––

`;
}

function getCardsFromContent(content: string): Array<ICardSides> {
  const cards = content.split(/–––+/);
  const cardToFields = cards
    .filter(c => !!c.trim())
    .map((card) => {
      return card
        .split(new RegExp(`${FRONT_SIDE_LABEL}|${BACK_SIDE_LABEL}`, 'sigm'))
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
