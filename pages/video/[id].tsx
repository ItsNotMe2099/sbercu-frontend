import { fetchCatalogItem, resetCatalogItem } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IRootState } from "types";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import BreadCrumbs from 'components/ui/Breadcrumbs';
import Tag from './component/tag';
import ButtonSelect from 'components/ui/ButtonSelect';
import Button from 'components/ui/Button';
import Info from './component/info';
import Player from 'components/video/Player';
import { useDispatch, useSelector } from 'react-redux'

import {format} from 'date-fns'
interface Props{

}



export default function Video(props: Props){
  const settings = ['Поделиться', 'Редактировать', 'Удалить']
  const download = ['480p (780МБ)', '720p (1260МБ)', '1080p (1860МБ)', '4K (2360МБ)']
  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const video = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
  const dispatch = useDispatch();

    const  router = useRouter()
    console.log("Query", router.query, video)
    useEffect(() => {
            console.log("reset")
        dispatch(resetCatalogItem());
        if(!router.query.id){
            return;
        }
        dispatch(fetchCatalogItem(router.query.id));
    }, [])
  return (
    <Layout>
    <Header/>
    {(!currentLoading  && video) &&  <div className={styles.root}>
      <div className={styles.title}>{video.name}</div>
      <BreadCrumbs items={[{name: 'Главная', link: '/'}, ...(video?.parents ? video?.parents : [])]}/>
        <div className={styles.content}>
        <div className={styles.videoWrapper}>
        <>
        <Player url={getMediaPath(video.media?.fileName)}/>
        <div className={styles.btns}>
          <div className={styles.select__down}><ButtonSelect size="9px 20px" minWidth="112px" options={download}>Скачать</ButtonSelect></div>
          <div className={styles.regularBtn}><Button size="9px 20px" transparent brdrDarkGrey textDarkGrey>Копировать ВШ ID</Button></div>
          <div className={styles.select}><ButtonSelect options={settings} size="9px 20px">Настройки</ButtonSelect></div>
        </div>
        </>

            {/*<div className={styles.loading}>
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
        */}
        <Info author={video.presenters} date={video.createdAt ? format(new Date(video.createdAt), 'dd.MM.yyy') : ''} language="Русский, Английский"/>
        </div>
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
    <div className={styles.tags__mobile}>
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
    </div>}
    <Footer/>

    </Layout>
  )
}

