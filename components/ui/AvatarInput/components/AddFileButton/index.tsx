import Button from "components/ui/Button";
import React from 'react'
import styles from './index.module.scss'

interface Props {
  uploadBtn?: boolean
  uploadTitle?: string
}

const AddFileButton = (props: Props) => (
  <div className={styles.root}>
  {props.uploadBtn ?
<Button transparent textGreen brdrGreen size="9px 20px" type="button">{props.uploadTitle || `Загрузить обложку`}</Button>
  :
  <div className={styles.btn}>
    <Button transparent textGreen brdrGreen size="9px 20px" type="button">Заменить</Button>
  </div>
  }
  </div>
)

export default AddFileButton
