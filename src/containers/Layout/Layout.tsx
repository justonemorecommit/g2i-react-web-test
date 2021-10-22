import { ReactNode } from 'react'
import 'reactstrap'

interface Props {
  children: ReactNode
}

function Layout(props: Props) {
  return <div>{props.children}</div>
}

export default Layout
