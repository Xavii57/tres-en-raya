import { WINNER_COMBOS } from "../constants.js";

export const checkWinner = (boardToCheck) => {
    // revisar todas la combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && // o => x u o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]; // x u o
      }
    }
    // si no hay ganador
    return null;
  };