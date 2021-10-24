import { render } from '@testing-library/react';
import faker from 'faker';

import AppCard from '.';

it('should render children and has app-card class', () => {
  const className = 'example-class-name';
  const childrenTestId = Math.floor(Math.random());
  const children = <div data-testid={childrenTestId}></div>;

  const element = render(<AppCard className={className}>{children}</AppCard>);

  expect(element.container.firstChild).toHaveClass('app-card');
  expect(element.queryByTestId(childrenTestId)).toBeInTheDocument();
});
