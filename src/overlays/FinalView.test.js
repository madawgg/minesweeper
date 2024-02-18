import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinalView from './FinalView';
import { test, expect, jest } from '@jest/globals';


const mockOnClick = jest.fn();


test('renders FinalView component with lose gameStatus', () => {
  const { getByText } = render(<FinalView onClick={mockOnClick} gameStatus="lose" />);


  const titleElement = getByText("You Lose");
  expect(titleElement).toBeInTheDocument();

  const messageElement = getByText("You are lion food");
  expect(messageElement).toBeInTheDocument();

  const playAgainButton = getByText("Play Again");
  expect(playAgainButton).toBeInTheDocument();
});

// Prueba para renderizar el componente FinalView correctamente con estado win
test('renders FinalView component with win gameStatus', () => {
  const { getByText } = render(<FinalView onClick={mockOnClick} gameStatus="win" />);

  // Verifica que el componente se renderiza correctamente con el estado win
  const titleElement = getByText("You Win");
  expect(titleElement).toBeInTheDocument();

  const messageElement = getByText("You are a lion tamer");
  expect(messageElement).toBeInTheDocument();

  const playAgainButton = getByText("Play Again");
  expect(playAgainButton).toBeInTheDocument();
});

// Prueba para verificar que onClick se llama correctamente cuando se hace clic en el botón
test('calls onClick function when Play Again button is clicked', () => {
  const { getByText } = render(<FinalView onClick={mockOnClick} gameStatus="lose" />);

  const playAgainButton = getByText("Play Again");
  fireEvent.click(playAgainButton);

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});