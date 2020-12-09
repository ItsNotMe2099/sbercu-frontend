import styles from './index.module.scss'
import Header from "components/layout/Header";
import { IRootState } from 'types';
import { useSelector } from 'react-redux'
import BreadCrumbs from 'components/ui/Breadcrumbs';
import TagCategory from 'components/tags/TagCategory';
import VideoComponent from 'components/video/videoComponent';
import Tag from './component/tag';
import ButtonSelect from 'components/ui/ButtonSelect';
import Button from 'components/ui/Button';
import Info from './component/info';

interface Props{

}



export default function Video(props: Props){
  const settings = ['Поделиться', 'Редактировать', 'Запретить скачивание', 'Не показывать в каталоге', 'Переместить', 'Удалить']
  const download = ['480p (780МБ)', '720p (1260МБ)', '1080p (1860МБ)', '4K (2360МБ)']
  const isVideo = true

  return (
    <body className={styles.white}>
    <Header/>
    <div className={styles.root}>
      <div className={styles.title}>Системное мышление. Введение</div>
      <BreadCrumbs items={[{name: 'Главная', link: '/'}, ]}/>
      <div className={styles.content}>
        {isVideo ?
        <VideoComponent/>
        :
        <div className={styles.loading}>
          <div className={styles.wait}>
            <div className={styles.inner}>
              <div className={styles.top}>
                <img className={styles.clock} src='img/videos/clock.svg' alt=''/>
                <img src='img/videos/human.svg' alt=''/>
              </div>
              <div className={styles.bottom}>Видео конвертируется,<br/> пожалуйста подождите</div>
            </div>
          </div>
        </div>
        }
        <div className={styles.tags}>
          <Tag
          category="Подразделение" 
          tag="Академия лидерства и дизайн-мышления"
          />  
          <Tag
          category="Раздел" 
          tag="Мягкие навыки"
          />
          <Tag
          category="Тема" 
          tag="Прочее"
          />
          <Tag
          category="Форма обучения" 
          tag="Электронная"
          />
          <Tag
          category="Обязательность" 
          tag="По выбору"
          />
          <Tag
          category="Компетенции" 
          tag="Клиентоцентричность"
          />
          <Tag
          category="Уровни менеджмента" 
          tag="Специалисты"
          />     
        </div>
    </div>
    {isVideo ?
    <div className={styles.btns}>
      <div className={styles.select}><ButtonSelect size="9px 20px" minWidth="112px" options={download}>Скачать</ButtonSelect></div>
      <Button size="9px 20px" transparent brdrDarkGrey textDarkGrey>Копировать ВШ ID</Button>
      <div className={styles.select}><ButtonSelect options={settings} size="9px 20px">Настройки</ButtonSelect></div>
    </div>
    :
    null
    }
    <Info author="Vasya" date="09.11.2019" language="Русский, Английский"/>
    </div>
    </body>
  )
}

