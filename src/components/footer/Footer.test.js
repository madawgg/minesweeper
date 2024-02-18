import React from 'react';
import { render } from '@testing-library/react';
import { it } from '@jest/globals';
import Footer from './Footer.jsx';

it('renders footer component with correct text', () => {

  const component = render(<Footer />);
  component.getByText('Every decision could be the last. Will you survive ?');
  console.log(component);
});