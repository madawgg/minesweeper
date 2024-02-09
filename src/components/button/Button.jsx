/* eslint react/prop-types: 0 */


function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}
export default Button;