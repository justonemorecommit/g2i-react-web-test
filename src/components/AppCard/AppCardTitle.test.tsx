import { render } from '@testing-library/react';

import { AppCardTitle } from '.';

it('should render title with class', () => {
  const title = 'Example Title';

  const { queryByText, container } = render(<AppCardTitle title={title} />);

  expect(queryByText(title)).toBeInTheDocument();
  expect(container.firstChild).toHaveClass('app-card-title');
});
