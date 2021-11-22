import styles from './index.module.scss'

interface Props {

}

export default function NoDeleted(props: Props) {
  return (
      <div className={styles.noFiles}>
          <div className={styles.text}>
              <div className={styles.firstText}>Пока вы ничего не удалили. </div>
              <div className={styles.secondText}>Любой удаленный файл будет попадать в корзину
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
