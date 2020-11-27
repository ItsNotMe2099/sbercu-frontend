import { fetchCatalogList, fetchCatalogParents, setCurrentCatalogId } from "components/catalog/actions";
import { createFolderOpen } from "components/Modal/actions";
import BreadCrumbs from "components/ui/Breadcrumbs";
import Button from "components/ui/Button";
import { useEffect } from "react";
import { IRootState } from "types";
import { logout, withAuthSync } from "utils/auth";
import { pluralize } from "utils/formatters";
import styles from './index.module.scss'
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'

const Catalog = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const items = useSelector((state: IRootState) => state.catalog.list)
  const totalItems = useSelector((state: IRootState) => state.catalog.listTotal)
  const basePath = useSelector((state: IRootState) => state.catalog.basePath)
  const parents = useSelector((state: IRootState) => state.catalog.parents)
  const paths = router.query.paths as string[] || []
  console.log("Paths",  router.query.paths ,basePath)
  useEffect(() => {
    const id = paths[paths.length - 1]
    console.log("PathId", id)
    dispatch(fetchCatalogList(id))
    dispatch(fetchCatalogParents(id))
    dispatch(setCurrentCatalogId(parseInt(id, 10)))
  }, [router.query.paths])


  return (
    <body className={styles.white}>
    <Header>
      <div className={styles.create}><Button folder transparent textDarkGrey btnDarkGrey type="button" onClick={() => dispatch(createFolderOpen())}>Создать папку</Button></div>
      <div className={styles.download}><Button size='8px 16px' green visiblePlus btnWhite type="button"><span>Загрузить файл</span></Button></div>
    </Header>
    <div className={styles.root}>
      <div className={styles.head}>
      <div className={styles.title}>{parents[parents.length - 1]?.name}</div>
        <div className={styles.image}><a><img src="img/icons/dots.svg" alt=''/></a></div>
      </div>
      <BreadCrumbs items={[{name: 'Главная', link: '/'}, ...parents]}/>
      {items.length > 0 &&  <div className={styles.duration}>{totalItems} {pluralize(totalItems, 'материал', 'материала', 'материалов')}</div>}
      {items.length !== 0 ?
      <div className={styles.files}>
        {items.map(item => (<File
            basePath={basePath}
          item={item}
        />))}
      </div>
      :
      <a className={styles.noFiles}>
        <div className={styles.text}>
          <div className={styles.firstText}>В эту папку пока никто ничего не загрузил. Подождем...</div>
          <div className={styles.secondText}>В папках можно хранить любое фото, видео, аудио или текстовые материалы</div>
          <div className={styles.iconText}><img src="/img/icons/files.svg" alt=''/><span>Перенесите сюда файл или нажмите для выбора файла на компьютере</span></div>
        </div>
        <div className={styles.images}>
          <img className={styles.clock} src="/img/icons/clock.svg" alt=''/>
          <img className={styles.human} src="/img/icons/human.svg" alt=''/>
          <img className={styles.plant} src="/img/icons/plant.svg" alt=''/>
        </div>
      </a>
      }
    </div>
    </body>
  )
}


export default withAuthSync(Catalog)
