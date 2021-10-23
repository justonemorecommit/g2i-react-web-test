import { Card, CardProps } from 'reactstrap'

import './AppCard.styles.scss'

type Props = CardProps

function AppCard(props: Props) {
  return (
    <Card {...props} className={`app-card ${props.className}`}>
      {props.children}
    </Card>
  )
}

export default AppCard
