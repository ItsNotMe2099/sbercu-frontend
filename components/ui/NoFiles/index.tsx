import styles from './index.module.scss'

interface Props {

}

export default function NoFiles(props: Props) {
  return (
      <div className={styles.noFiles}>
          <div className={styles.text}>
              <div className={styles.firstText}>По вашему запросу ничего не найдено.</div>
              <div className={styles.secondText}>Попробуйте написать название материала по-другому или
                  сократить запрос
              </div>
          </div>
          <div className={styles.images}>
              <img className={styles.lamp} src="/img/icons/lamp.svg" alt=''/>
          </div>
      </div>
  )
}

NoFiles.defaultProps = {

}
