import { useState } from 'react';
import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinner, checkEndGame } from './utils/winnerGame.js';
import { WinnerModal } from './components/winnerModal.jsx';
import { BoardModel } from './components/Board.jsx';
import { saveGame, resetGameStorage } from './utils/storage/index.js';
import confetti from 'canvas-confetti';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  // null es que no hay un ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

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
    saveGame({ board: newBoard, turn: newTurn });
    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className='board'>
      <h1>Tres en linea</h1>
      <button className='' onClick={resetGame}>
        Resetear juego
      </button>
      <section className='game'>
        <BoardModel board={board} uptdateBoard={uptdateBoard} />
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
