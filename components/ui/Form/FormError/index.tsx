import styles from './index.module.scss'

interface Props {
  error: string[] | string | null
}
export default function FormError({error}: Props) {
  if(!error){
    return  (<></>)
  }
  return (
    <div className={styles.root}>
      {Array.isArray(error) ? error.map(error => <div className={styles.errorListItem}>{error}</div>) : error}
    </div>
  )
}
