import styles from './index.module.scss'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import {format} from 'date-fns'
interface Props {
  label: string
  meta: any
  input: any
  type: string
}

export default function InputDate(props: Props) {
  const {input: {value, onChange}} = props
  const { error, touched } = props.meta ? props.meta : {error: null, touched: false}
  console.log('ValueNew', value)
  return (
    <div className={styles.root}>
  <label className={styles.label}>{props.label}</label>

      <DatePicker
        className={styles.datePicker}
        locale={'ru'}
        onChange={(value) => {
          if(!value){
            onChange(null)
            return
          }
          try {
            console.log('ValueTime', value.getFullYear())
            if (isNaN(value.getTime()) || value.getFullYear() < 1000) {
              return
            }
            console.log('ValueDate', value)
            console.log('HandleDateChange', format(value, 'y-MM-dd'))
            onChange(format(value, 'y-MM-dd'))
          }catch (e){

          }
        }}
        format={'dd.MM.y'}
        value={value ? new Date(value) : value}
      />
      <ErrorInput {...props} />
    </div>
  )
}
