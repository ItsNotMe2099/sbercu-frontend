import styles from './index.module.scss'

interface Props {

}

export default function NoFavorite(props: Props) {
  return (
      <div className={styles.noFiles}>
          <div className={styles.text}>
              <div className={styles.firstText}>В Избранном пока ничего нет</div>
              <div className={styles.secondText}>Добавляйте в Избранное с помощью ❤️️
              </div>
          </div>
          <div className={styles.images}>
              <img className={styles.lamp} src="/img/icons/lamp.svg" alt=''/>
          </div>
      </div>
  )
}

NoFavorite.defaultProps = {

}
