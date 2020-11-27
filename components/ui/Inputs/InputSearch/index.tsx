import Button from 'components/ui/Button'
import styles from './index.module.scss'


interface Props {
  placeholder?: string,
    onChange?: (value) => void
}

export default function InputSearch(props: Props) {

  return (
    <form className={styles.form} action='/search'>
      <div className={styles.inputContainer}>
          <input
              name="query"
              type='text'
              onChange={(e) => {
                  if(props.onChange){
                      props.onChange(e.currentTarget.value)
                  }
              }}
              placeholder={props.placeholder}
          />
          <Button search type="button"></Button>
      </div>
    </form>
  )
}
