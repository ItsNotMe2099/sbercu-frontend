import styles from './index.module.scss'
import Header from "components/layout/Header";
import { IRootState } from 'types';
import { useSelector } from 'react-redux'
import BreadCrumbs from 'components/ui/Breadcrumbs';
import TagCategory from 'components/tags/TagCategory';
import VideoComponent from 'components/video/videoComponent';
import Tag from './component/tag';

interface Props{

}



export default function Video(props: Props){
  const parents = useSelector((state: IRootState) => state.catalog.parents)

  return (
    <body className={styles.white}>
    <Header/>
    <div className={styles.root}>
      <div className={styles.title}>Системное мышление. Введение</div>
      <BreadCrumbs items={[{name: 'Главная', link: '/'}, ...parents]}/>
      <div className={styles.content}>
        <VideoComponent/>
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
    </div>
    </body>
  )
}

