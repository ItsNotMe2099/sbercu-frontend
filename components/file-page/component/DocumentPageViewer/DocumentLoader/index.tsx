import styles from './index.module.scss'
import cx from 'classnames'
import Spinner from 'components/ui/Spinner'

interface Props {

}

export default function DocumentLoader(props: Props) {

  return (
    <div className={styles.root}>
       <Spinner  size={32}/>
       <div className={styles.title}>Документ загружается</div>
    </div>
  )
}

