import './AppCardTitle.styles.scss'

interface Props {
  title: string | null
}

function AppCardTitle(props: Props) {
  const { title } = props

  return <h1 className="app-card-title">{title}</h1>
}

export default AppCardTitle
