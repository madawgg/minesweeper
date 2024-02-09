/* eslint react/prop-types: 0 */

import './board.scss';
import Cell from '../cell/Cell.jsx';

const Board = ({ board, onCellClick }) => {

  return (
    <div className="board">
      {board.columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className='column'
        > {
            column.map((cell) => (
              <Cell
                key={`${cell.row}-${cell.column}`}
                cell={cell}
                onClick={() => onCellClick(cell.row, cell.column)}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default Board;