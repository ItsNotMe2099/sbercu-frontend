import React from 'react'
import AuthForm from './AuthForm'
import styles from './index.module.scss'

interface Props {}

export default function AuthSection(props: Props) {
    return (
      <div className={styles.container}>
          <div className={styles.head_green}>media.</div>
          <div className={styles.enter}>Войдите, чтобы продолжить</div>
          <div className={styles.head}><span>ВШ ID</span> или <span>Почта</span></div>
          <AuthForm />
      </div>
    )
  }
