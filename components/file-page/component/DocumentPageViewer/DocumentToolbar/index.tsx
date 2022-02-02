import styles from './index.module.scss'
import cx from 'classnames'
import React from 'react'
import FullScreenSvg from 'components/svg/FullScreenSvg'
import Cross from 'components/svg/Cross'

interface Props {
  page: number,
  totalPages: number
  isFullScreen?: boolean
  onFullScreen?: () => void
  onChangePage: (page) => void
}

export default function DocumentToolbar(props: Props) {
  const {page, totalPages, onChangePage, onFullScreen, isFullScreen} = props;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <button  type={'button'} className={cx(styles.arrow, styles.next, {[styles.disabled]: page === 1})} disabled={page === 1}
                onClick={() => onChangePage(page - 1)}>‹
        </button>
        <div className={styles.pages}>{page} / {totalPages}</div>
        <button type={'button'} className={cx(styles.arrow, styles.next, {
          [styles.notLast]: onFullScreen,
          [styles.disabled]: page === totalPages})}
                disabled={page === totalPages} onClick={() => onChangePage(page + 1)}>›
        </button>
        {onFullScreen && <button type={'button'} className={styles.fullscreen} onClick={onFullScreen}>{isFullScreen ? <Cross/> : <FullScreenSvg/>}</button>}

      </div>
       </div>
  )
}

