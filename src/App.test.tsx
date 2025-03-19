import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('App Component', () => {
  test('renders Dashboard at root route "/"', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(container.querySelector('.dashboard')).toBeInTheDocument();
  });

  test('renders NotFound for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/some/unknown/path']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
