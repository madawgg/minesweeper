import { useState, useEffect } from 'react';
import Board from '../Domain/Board.js';
import ApiClient from '../Services/ApiClient.js';
import BoardComponent from './board/Board.jsx';

import './game.scss';

const Game = () => {
  const [board, setBoard] = useState(null);
  const [level, setLevel] = useState(0);
  const [gameStatus, setGameStatus] = useState('Waiting...');
  const [time, setTime] = useState(0);
  const [isFlagMode, setIsFlagMode] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [mode, setMode] = useState('🔍');

  useEffect(() => {

    const apiClient = new ApiClient('http://localhost:9988/');
    apiClient.getLevel(level)
      .then((data) => {
        const { columns, rows, mines } = data;
        const newBoard = new Board(columns, rows, mines, level);
        setBoard(newBoard);
        setTime(0);
      })
      .catch((error) => {
        console.error('Error fetching game data:', error);
      });
  }, [level, updateCounter]);

  const handleCellClick = (row, column) => {

    setGameStatus('Jugando');

    if (board) {
      try {
        if (isFlagMode) {
          board.flag(row, column);
          if (board.getWinStatus()) {
            setGameStatus('Ganaste');
          }
        } else {
          board.defuse(row, column);

          if (!board.canBeDefused(row, column)) {
            setGameStatus('Perdiste');
          }
          if (board.getWinStatus()) {
            setGameStatus('Ganaste');
          }
        }

        setBoard({ ...board });

      } catch (error) {
        console.error(error.message);
        setBoard({ ...board, lost: true });
      }
    }
  }
  useEffect(() => {
    if (gameStatus === 'Jugando') {
      const interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (gameStatus === 'Waiting') {
      setTime(0);
    }
  }, [time, gameStatus]);

  const changeMode = () => {
    setIsFlagMode(!isFlagMode);
    setMode(isFlagMode ? '🔍' : '🥩');
  };


  const resetGame = () => {
    setIsFlagMode(false);
    setUpdateCounter(prev => prev + 1);
    setTime(0);
    setGameStatus('Waiting');
    setMode('🔍');
  }

  return (
    <main >
      <div className='container'>
        <section className='infoBox'>

          <label
            htmlFor="levelSelect"
            className='info'> Tiempo: {time}
          </label>

          <p>Current Mode: {mode} </p>

          <button
            className='gameButton changeButton'
            onClick={changeMode}
          >
            {isFlagMode ? 'Change to 🔍 ' : 'Change to 🥩'}
          </button>

          <article className='gameLevel'>
            <label
              htmlFor="levelSelect"
              className='info'
            > Nivel:
            </label>

            <select
              id="levelSelect"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value='0'>Fácil</option>
              <option value='1'>Medio</option>
              <option value='2'>Difícil</option>
            </select>

          </article>

          <button
            className='gameButton resetButton'
            onClick={resetGame}
          >
            Reset Board
          </button>
        </section>
        <section className='inGameInfo'>
          <div className='info gameStatus'>
            Game Status: {gameStatus}
          </div>
        </section>
      </div>
      {board && (
        <>
          <div className='lionsRemaining'>
            Lions Without Food: {board.getRemainingMinesCount()}
          </div>
          <BoardComponent
            board={board}
            onCellClick={handleCellClick} />
        </>
      )}
    </main>
  );
};

export default Game;