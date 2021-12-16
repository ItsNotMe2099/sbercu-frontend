import styles from './index.module.scss'

interface Props {

}

export default function NoDeleted(props: Props) {
  return (
      <div className={styles.noFiles}>
          <div className={styles.text}>
              <div className={styles.firstText}>Корзина пуста</div>
              <div className={styles.secondText}>Здесь вы можете восстановить удаленные файлы
              </div>
          </div>
          <div className={styles.images}>
              <img className={styles.lamp} src="/img/icons/lamp.svg" alt=''/>
          </div>
      </div>
  )
}

NoDeleted.defaultProps = {

}
