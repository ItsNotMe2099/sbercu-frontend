import styles from './index.module.scss'

interface Props {

}

export default function NoFavorite(props: Props) {
  return (
      <div className={styles.noFiles}>
          <div className={styles.text}>
              <div className={styles.firstText}>Пока вы ничего не добавили в избраннное. </div>
              <div className={styles.secondText}>Нажмите на значок сердце чтобы добавить в избранное
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
