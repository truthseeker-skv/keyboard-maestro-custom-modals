#!/usr/bin/env node

const getStdin = require('get-stdin');

const { exportMarkdown } = require('@skv/spaced-repetition/lib');

(async () => {
  const params = JSON.parse(await getStdin() || '"null"');

  const isParamsValid = !!params.deck && !!params.cards?.length;

  if (!isParamsValid) {
    throw new Error(`Failed to export markdown. Invalid params: ${params}`);
  }

  for (const card of params.cards) {
    await exportMarkdown({
      deck: params.deck,
      front: card.front,
      back: card.back,
    });
  }
})()

// if (params?.exporter === 'English Words') {
//   if (!params.deck || !params.words?.length) {
//     throw new Error(`Failed to export engWords. Invalid params: ${params}`);
//   }
//
//   return await exportEngWords(params.deck, params.words);
// }
