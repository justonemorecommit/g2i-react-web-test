import { render } from '@testing-library/react';
import faker from 'faker';

import Layout from '.';

it('should render children', () => {
  const anyContentText = faker.lorem.sentence();

  const renderResult = render(
    <Layout>
      <p>{anyContentText}</p>
    </Layout>
  );

  expect(renderResult.queryByText(anyContentText)).toBeInTheDocument();
});
