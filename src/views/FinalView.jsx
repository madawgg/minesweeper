/* eslint react/prop-types: 0 */
import './finalView.scss';
import Button from '../components/button/Button';

const FinalView = ({ onClick, gameStatus }) => {
  return (
    <div className={`${gameStatus}ViewContainer`}>
      <div className={`${gameStatus}ViewContent`}>
        <h1>{`You ${gameStatus}`}</h1>

        {gameStatus === 'lose' && <h2>Now, you are lions food</h2>}
        {gameStatus === 'win' && <h2>You are a lion tamer</h2>}

        <Button
          onClick={onClick}
          text='Play Again'
        />
      </div>
    </div>
  );
};

export default FinalView;