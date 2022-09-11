import React from 'react';
import { render, screen } from '@testing-library/react';
import Autocomplete from '../Autocomplete';

test('renders app', () => {
  render(<Autocomplete />);
  const linkElement = screen.getByText(/Autocomplete/i);
  expect(linkElement).toBeInTheDocument();
});
