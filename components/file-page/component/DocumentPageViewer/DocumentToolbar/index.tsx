import styles from './index.module.scss'
import cx from 'classnames'

interface Props {
  page: number,
  totalPages: number
  onChangePage: (page) => void
}

export default function DocumentToolbar(props: Props) {
  const {page, totalPages, onChangePage} = props;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <button className={cx(styles.arrow, styles.next, {[styles.disabled]: page === 1})} disabled={page === 1}
                onClick={() => onChangePage(page - 1)}>‹
        </button>
        <div className={styles.pages}>{page} / {totalPages}</div>
        <button className={cx(styles.arrow, styles.next, {[styles.disabled]: page === totalPages})}
                disabled={page === totalPages} onClick={() => onChangePage(page + 1)}>›
        </button>
      </div>
    </div>
  )
}

