import Button from "components/ui/Button";
import React from 'react'
import styles from './index.module.scss'

interface Props {
  uploadBtn?: boolean
}

const AddImageButton = (props: Props) => (
  <div className={styles.root}>
  {props.uploadBtn &&
  <Button transparent textGreen brdrGreen size="9px 20px" type="button">Загрузить обложку</Button>
  }
  </div>
)

export default AddImageButton
