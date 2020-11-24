import Button from 'components/ui/Button'
import styles from './index.module.scss'


interface Props {
  placeholder?: string
}

export default function InputSearch(props: Props) {

  return (
    <form className={styles.form} action='/search'>
      <div className={styles.inputContainer}>
          <input
              name="query"
              type='text'
              placeholder={props.placeholder}
          />
          <Button search></Button>
      </div>
    </form>
  )
}
