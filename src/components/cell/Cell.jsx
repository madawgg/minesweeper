/* eslint react/prop-types: 0 */
import '../../Domain/BoardCell.js';
import '../../Domain/Board.js';
import './cell.scss';


const Cell = ({ cell, onClick, onContextMenu }) => {
  const cellKey = `${cell.row}-${cell.column}`;
  const cellContent = (cell) => {
    if (cell.defused) {
      return cell.getSurroundingMinesCount() > 0 ? cell.getSurroundingMinesCount() : null;
    } else if (cell.exploded) {
      return '🦁';
    } else if (cell.flagged) {
      return '🥩';
    } else {
      return null;
    }
  };
  
  const getNumberColor = (number) => {
    switch (number) {
      case 1:
        return 'green';
      case 2:
        return 'blue';
      case 3:
        return 'red';
      case 4:
        return 'purple';
      default:
        return 'black';
    }
  };

  const numberColor = cell.getSurroundingMinesCount() > 0 ? getNumberColor(cell.getSurroundingMinesCount()) : null;

  return (
    <div
      key={`${cellKey}`}
      className={`cell ${cell.flagged ? 'flagged' : ''} ${cell.defused ? 'defused' : ''} ${cell.exploded ? 'mine' : ''} ${cell.lost ? 'lost' : ''}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{ color: numberColor }}
    >
      {cellContent(cell)}
    </div>
  );
};



export default Cell;