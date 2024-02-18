import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import Header from './Header';

test('renders Header component', () => {
  render(<Header />);
  expect(screen.getByText('Hungry Lions')).toBeInTheDocument();
  expect(screen.getByText('Feed the lions or be the food')).toBeInTheDocument();
});