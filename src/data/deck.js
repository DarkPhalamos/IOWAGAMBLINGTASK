export const decks = {
  A: {
    reward: 100,
    penalty: () => (Math.random() < 0.5 ? -250 : 0),
  },
  B: {
    reward: 100,
    penalty: () => (Math.random() < 0.1 ? -1250 : 0),
  },
  C: {
    reward: 50,
    penalty: () => (Math.random() < 0.5 ? -25 : 0),
  },
  D: {
    reward: 50,
    penalty: () => (Math.random() < 0.1 ? -250 : 0),
  },
};
