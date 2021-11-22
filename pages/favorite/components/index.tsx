import styles from './index.module.scss'

interface Props{
  quantity: string
}

export default function Quantity(props: Props){
  return (
  <div className={styles.quantity}>{props.quantity}</div>
  )
}


