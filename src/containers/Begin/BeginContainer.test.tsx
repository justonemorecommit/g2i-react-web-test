import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createLocation, createMemoryHistory } from 'history';
import { RouteComponentProps } from 'react-router';

import { Begin } from './BeginContainer';

const mockRouteProps = (): RouteComponentProps => {
  return {
    history: createMemoryHistory(),
    location: createLocation('/'),
    match: {
      params: {},
      isExact: false,
      url: 'https://localhost',
      path: '/',
    },
  };
};

it('should render contents', () => {
  render(<Begin {...mockRouteProps()} />);

  expect(
    screen.getByText('You will be presented with 10 True or False questions.')
  ).toBeInTheDocument();

  expect(
    screen.getByText('Welcome to the Trivia Challenge!')
  ).toBeInTheDocument();

  expect(screen.getByText('BEGIN')).toBeInTheDocument();
});

it('should go to questions page when user clicked BEGIN button', () => {
  const routerProps = mockRouteProps();

  const { queryByText } = render(<Begin {...routerProps} />);
  const beginButton = queryByText('BEGIN');
  beginButton && userEvent.click(beginButton);

  expect(routerProps.history.location.pathname).toBe('/questions/1');
});
