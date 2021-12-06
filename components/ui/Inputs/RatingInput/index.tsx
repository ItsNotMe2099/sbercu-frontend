import styles from './index.module.scss'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import {StarFilled, StarOutline} from 'components/svg/Star'
import cx from 'classnames'

interface Props {
  input: any
  meta?: any,
}

export default function RatingInput(props: Props) {
  const { value, onChange } = props.input;
  const { error, touched } = props.meta
  const arr = Array(10).fill(0);
       return (
    <div className={cx(styles.root,{[styles.error]: error && touched})}>
    <div className={styles.stars}>
      {arr.map((i, index) =>   <div onClick={() => onChange(index + 1)} className={styles.star}>{value >= (index + 1) ? <StarFilled/> : <StarOutline/>}</div>)}
    </div>
      <ErrorInput {...props}/>
      </div>
  );
}
