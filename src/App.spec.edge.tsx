import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import dotenv from 'dotenv';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

dotenv.config();

test('Task view edge to edge tests', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  await waitFor(() => {
    expect(screen.getByText('Getting Things Done')).toBeInTheDocument();
  });
});
