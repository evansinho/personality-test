import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders landing screen', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to the Personality Test/i)).toBeInTheDocument();
});

test('renders dynamic questions and calculates result', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Start Personality Test/i));

  expect(await screen.findByText(/Do you enjoy social gatherings?/i)).toBeInTheDocument();

  // Answer all questions
  const yesButton = (text) => screen.getByText(text, { selector: 'button' });
  fireEvent.click(yesButton(/Yes/i)); // Question 1
  fireEvent.click(yesButton(/No/i));  // Question 2
  fireEvent.click(yesButton(/No/i));  // Question 3
  fireEvent.click(yesButton(/Yes/i)); // Question 4
  fireEvent.click(yesButton(/Yes/i)); // Question 5

  // Check the result - match the entire paragraph
  expect(await screen.findByText(/Your personality type is:/i)).toBeInTheDocument();
  expect(await screen.findByText(/Extrovert/i)).toBeInTheDocument();
});
