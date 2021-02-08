import styles from './index.module.scss'

interface Props{
    isCutting: boolean
}


export default function VideoConverting(props: Props){
  return (
      <div className={styles.root}>
          <div className={styles.wait}>

                  <div className={styles.waitImage}>
                      <img className={styles.clock} src='/img/videos/clock.svg' alt=''/>
                      <img src='/img/videos/human.svg' alt=''/>
                  </div>
                  <div className={styles.bottom}>Видео {props.isCutting ? 'обрезается' : 'конвертируется'},<br/> пожалуйста подождите</div>
              </div>
      </div>
  )
}
