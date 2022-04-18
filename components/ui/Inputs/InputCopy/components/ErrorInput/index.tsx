import styles from './index.module.scss'

interface Props {
  meta?: {
    error: any,
    touched: boolean,
  }
}

export default function ErrorInput(props: Props) {
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}
  if(touched && error) {
    return (<div className={styles.root}>{error}</div>)
  }else{
    return (<></>)
  }
}
