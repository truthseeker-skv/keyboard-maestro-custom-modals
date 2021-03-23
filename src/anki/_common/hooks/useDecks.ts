import { useState } from 'react';
import useAsync from 'react-use/lib/useAsync';

import { send } from '../services';

const DECKS_TO_EXCLUDE = ['Default'];

export default function useDecks() {
  const [selected, setSelected] = useState<string | null>(null);
  const state = useAsync(async () => send<null, Record<string, number>>('deckNamesAndIds'));

  return {
    list: state.value
      ? Object
        .keys(state.value)
        .filter((it) => !DECKS_TO_EXCLUDE.includes(it))
      : [],
    error: state.error,
    selected,
    selectItem: setSelected,
  };
}

export type AnkiDecks = ReturnType<typeof useDecks>;
