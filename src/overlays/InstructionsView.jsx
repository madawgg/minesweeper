/* eslint react/prop-types: 0 */
import './instructionsView.scss';

function InstructionsView() {
  return (
    <section className="instructionsView">
      <p>
        -The game consists of uncovering all the squares without encountering a lion and placing meat in those where there are lions in the shortest time possible.
      </p>
      <p>
        -The number inside the cell indicates the number of lions around it. If there is no number, it means there are no lions around, so it will automatically open.
      </p>
      <p>
        -🥩 mode: If you suspect there is a lion in an unlocked cell, place a piece of meat in the cell to feed the lion. <br /> Mark where you think there are lions and prevent lion attack.
      </p>
      <p>
        -To remove meat from a cell, in 🥩 mode, click on the cell you want to remove 🥩.
      </p>

      <p>
        -🔍 mode: To uncover cells.
      </p>

      <p>
        -If you want to choose another level, simply click on the Level dropdown menu.
      </p>
      <h3>Good luck and have fun.</h3>
    </section >

  );
}
export default InstructionsView;