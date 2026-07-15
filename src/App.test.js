import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing hero', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /arquitectura de exterior/i })).toBeInTheDocument();
});

test('renders the premium editorial narrative', () => {
  render(<App />);
  expect(screen.getByText(/una presencia sobria/i)).toBeInTheDocument();
});

test('renders required contact form fields', () => {
  render(<App />);
  expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
});

test('shows product previews when hovering the Products header item', () => {
  render(<App />);
  fireEvent.mouseEnter(screen.getByRole('button', { name: /productos/i }));
  expect(screen.getByText(/pérgolas bioclimáticas/i)).toBeInTheDocument();
  expect(screen.getByText(/cortinas de cristal/i)).toBeInTheDocument();
});
