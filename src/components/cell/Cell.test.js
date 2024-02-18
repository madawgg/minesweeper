import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, expect, jest } from '@jest/globals';
import Cell from './Cell'; // Ajusta la ruta de importación según la ubicación de tu componente

// Prueba para renderizar el componente Cell correctamente
test('renders Cell component', () => {
  const cell = {
    row: 1,
    column: 1,
    defused: false,
    exploded: false,
    flagged: false,
    lost: false,
    getSurroundingMinesCount: jest.fn().mockReturnValue(5)
  };

  const { getByTestId } = render(<Cell cell={cell} />);
  const cellElement = getByTestId('cell');

  expect(cellElement).toBeInTheDocument();
});


test('calls onClick function when cell is clicked', () => {
  const onClick = jest.fn();
  const cell = {
    row: 1,
    column: 1,
    defused: false,
    exploded: false,
    flagged: false,
    lost: false,
    getSurroundingMinesCount: jest.fn().mockReturnValue(0)
  };

  const { getByTestId } = render(<Cell cell={cell} onClick={onClick} />);
  const cellElement = getByTestId('cell');

  fireEvent.click(cellElement);

  expect(onClick).toHaveBeenCalled();
});


test('calls onContextMenu function when cell is right-clicked', () => {
  const onContextMenu = jest.fn();
  const cell = {
    row: 1,
    column: 1,
    defused: false,
    exploded: false,
    flagged: false,
    lost: false,
    getSurroundingMinesCount: jest.fn().mockReturnValue(0) // Mockear esta función según sea necesario
  };

  const { getByTestId } = render(<Cell cell={cell} onContextMenu={onContextMenu} />);
  const cellElement = getByTestId('cell');

  fireEvent.contextMenu(cellElement);

  expect(onContextMenu).toHaveBeenCalled();
});