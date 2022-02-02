import styles from './index.module.scss'
import { SpinnerCircular } from 'spinners-react'
import { colors } from 'styles/variables'

interface Props {
  size?: number
  color?: string
  secondaryColor?: string
}

export default function Spinner(props: Props) {
  return (
    <div className={styles.root}>
      <SpinnerCircular
        size={props.size ?? 22}
        color={props.color ?? '#27AE60'}
        secondaryColor={props.secondaryColor ?? '#bdbdbd'}
        thickness={150}
      />
    </div>
  )
}

