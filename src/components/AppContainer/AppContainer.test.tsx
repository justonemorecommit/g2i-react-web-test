import { render } from '@testing-library/react';

import AppContainer from '.';

it('should work for fluid option', () => {
  const { container } = render(<AppContainer fluid />);

  expect(container.firstChild).toHaveClass('app-container-fluid container');
});

it('should work for non fluid option', () => {
  const { container } = render(<AppContainer />);

  expect(container.firstChild).toHaveClass('app-container container');
});
