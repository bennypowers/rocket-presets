export const addSlideDecksToExclude =
  ({ exclude = undefined, ...options } = {}) => ({
    ...options,
    exclude: [
      ...Array.isArray(exclude) ? exclude : [exclude].filter(Boolean),
      '**/slide-decks/**/*',
      '**/slide-decks/*',
    ],
  });
