import { ReactNode } from 'react'

import './Layout.styles.scss'

interface Props {
  children: ReactNode
}

function Layout(props: Props) {
  return (
    <div className="d-flex pt-5 d-flex justify-content-center">
      {props.children}
    </div>
  )
}

export default Layout
