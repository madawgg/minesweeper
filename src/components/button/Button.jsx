/* eslint react/prop-types: 0 */
import React from 'react';
import './button.scss';


function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}
export default Button;