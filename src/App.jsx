import { useState } from "react";
import { Square } from "./components/Square.jsx";
import confetti from "canvas-confetti";

const TURNS = {
  X: "x",
  O: "o",
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  // null es que no hay un ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay más espacios vacíos
    // en el tablero
    return newBoard.every((square) => square !== null)
  } 

  const uptdateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tres en linea</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} uptdateBoard={uptdateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganó: "}</h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
