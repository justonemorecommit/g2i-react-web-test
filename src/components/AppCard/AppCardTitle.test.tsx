import { render } from '@testing-library/react';

import { AppCardTitle } from '.';

it('should render title with class', () => {
  const title = 'Example Title';

  const { queryByText } = render(<AppCardTitle title={title} />);

  expect(queryByText(title)).toBeInTheDocument();
});
