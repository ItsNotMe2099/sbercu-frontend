import styles from './index.module.scss'
import Link from 'next/link'
import React, {ReactElement} from "react";

interface Props {
  title?: string
  description?: string
    children?: ReactElement | ReactElement[]
}

export default function MaintenancePage(props: Props) {
  return (
    <div className={styles.root}>
        <div className={styles.head}>media.</div>

        <div className={styles.title}>Ведутся технические работы.</div>
      <div className={styles.description}>
          Это необходимо, чтобы Медиатека работала лучше.<br/>

          Зайдите на страницу чуть позже.
      </div>

    </div>
  )
}
