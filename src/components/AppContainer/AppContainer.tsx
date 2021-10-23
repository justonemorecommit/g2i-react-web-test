import { Container, ContainerProps } from 'reactstrap';

import './AppContainer.styles.scss';

type Props = ContainerProps;

function AppContainer(props: Props) {
  const { fluid, ...rest } = props;
  return (
    <Container
      {...rest}
      className={fluid ? 'app-container-fluid' : 'app-container'}
    />
  );
}

export default AppContainer;
