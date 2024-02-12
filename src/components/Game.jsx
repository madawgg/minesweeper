import { useState, useEffect } from 'react';
import Board from '../Domain/Board.js';
import ApiClient from '../Services/ApiClient.js';
import BoardComponent from './board/Board.jsx';
import FinalView from '../views/FinalView.jsx';
import Button from './button/Button.jsx';
import horizontal from '../../media/img/girarHorizontal.gif';
import './game.scss';

const Game = () => {
  const [board, setBoard] = useState(null);
  const [level, setLevel] = useState(0);
  const [gameStatus, setGameStatus] = useState('waiting...');
  const [time, setTime] = useState(0);
  const [isFlagMode, setIsFlagMode] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [mode, setMode] = useState('🔍');
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    }
  }, [isLandscape])
  useEffect(() => {

    const apiClient = new ApiClient('https://quiet-kangaroo-2938f6.netlify.app/');
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

    setGameStatus('exploring...');

    if (board) {
      try {
        if (isFlagMode) {
          board.flag(row, column);
          if (board.getWinStatus()) {
            setGameStatus('win');
          }
        } else {
          if (!board.isFlagged(row, column)) {
            board.defuse(row, column);

            if (!board.canBeDefused(row, column)) {
              setGameStatus('lose');
            }
            if (board.getWinStatus()) {
              setGameStatus('win');
            }
          }
        }


        setBoard({ ...board });

      } catch (error) {
        console.error(error.message);
        setBoard({ ...board, lost: true });
      }
    }
  }
  // useEffect(() => {
  //   console.log(gameStatus)
  // }, [gameStatus]);
  useEffect(() => {
    if (gameStatus === 'exploring...') {
      const interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (gameStatus === 'waiting') {
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
    setGameStatus('waiting');
    setMode('🔍');
  }

  return (

    <main >
      {!isLandscape &&
        <div className="rotate-device">
          <h1> Please, rotate your <br /> device to play the game</h1>
          <img src={horizontal} alt="rotate device icon" width="250px" />
        </div>
      }
      {isLandscape &&
        <>
          <div className='container'>
            <section className='infoBox'>

              <label
                htmlFor="levelSelect"
                className='timer'> Time <br /> <span>{time}</span>
              </label>

              <article className='gameLevel'>

                <label
                  htmlFor="levelSelect"
                  className='info'
                > Level
                </label>

                <select
                  id="levelSelect"
                  onChange={(e) => setLevel(e.target.value)}
                  value={level}

                >
                  <option value='0' >Easy</option>
                  <option value='1' >Medium</option>
                  <option value='2' >Hard</option>
                </select>

              </article>
              <Button
                className='gameButton resetButton'
                onClick={resetGame}
                text={'New Board'}
              />
              <br />
              <p>Current Mode: <span className='currentMode'>{mode}</span></p>
              <Button
                className='gameButton changeButton'
                onClick={changeMode}
                text={isFlagMode ? 'Change to 🔍 ' : 'Change to 🥩'}
              />

            </section>
            <section className='inGameInfo'>
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
          {gameStatus === 'lose' &&
            <FinalView
              onClick={resetGame}
              gameStatus={gameStatus} />}
          {gameStatus === 'win' &&
            <FinalView
              onClick={resetGame}
              gameStatus={gameStatus} />}
        </>}
    </main>

  );
};

export default Game;