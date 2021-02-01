import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import Button from 'components/ui/Button'
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAutoCompleteCatalogSearch, resetAutoCompleteCatalogSearch } from "components/search/actions";
import { IRootState } from "types";
import File from 'components/dashboard/File';
import Link from 'next/link';
import SearchSuggestionLoader from 'components/ContentLoaders/searchSuggestionLoader';



interface Props {
  placeholder?: string,
    onChange?: (value) => void
    onClick?: () => void
    searchValue?: string,
    hasAutocomplete?: boolean
}

export default function InputCatalogSearch(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("");
    const dropdownRefItem = useRef(null)
    const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);

    const router = useRouter();
    const dispatch = useDispatch()
    const projects = useSelector((state: IRootState) => state.search.autoCompleteProjects)
    const files = useSelector((state: IRootState) => state.search.autoCompleteFiles)
    const loading = useSelector((state: IRootState) => state.search.autoCompleteListLoading)
    useEffect(() => {
        if(props.searchValue && !value) {
            setValue(props.searchValue);
        }
    }, [props.searchValue])
    const handleSubmit = () => {
        if(value) {
            router.push(`/search?query=${value}`);
        }
    }
    const handleSearch = (e) => {
        const value = e.currentTarget.value
        setValue(value);
        if(value.length < 3){
            setIsActiveItem(false);
            dispatch(resetAutoCompleteCatalogSearch());
            return;
        }else{
            setIsActiveItem(true);
        }
        dispatch(fetchAutoCompleteCatalogSearch(value, {}))

    }
    const handleProjectClick = (item) => {
        router.push(`/catalog/${item.id}`);
    }

  return (
    <form className={isOpen ? styles.open : styles.form} action='/search' onSubmit={handleSubmit}>
      <div className={isOpen ? styles.inputContainer__mobile : styles.inputContainer}>
          <input
              name="query"
              type='text'
              value={value}
              autoComplete={'off'}
              onChange={handleSearch}
              placeholder={props.placeholder}
          />
          <div ref={dropdownRefItem} style={{display: isActiveItem ? 'block': 'none'}}>
          {loading && value && <div className={styles.loaderWrapper}><SearchSuggestionLoader/></div>}
          {value && !loading &&
            <>
          {projects.length || files.length ?
          <div className={styles.suggestion}>
            <div className={styles.innerWrapper}>
          <div className={styles.projects}>
            <div className={styles.title}>Проекты</div>
            {projects.map(project =>
              <div className={styles.project} key={project} onClick={() => handleProjectClick(project)}>{project.name}</div>
            )}
          </div>
          <div className={styles.files}>
            <div className={styles.title}>Файлы</div>
            <div className={styles.wrapper}>{files.map(file => (<File
                canEdit={false}
            item={file}
            />))}</div>
          </div>
          <div className={styles.btnWrapper}>
          <div className={styles.transparent}>
          <a onClick={handleSubmit} className={styles.show}>Показать все результаты</a>
          </div>
          </div>
          </div>
          </div>
          :
          <div className={styles.noSuggestion}>
            <img src="/img/icons/lamp.svg" alt=""/>
            <div className={styles.notFound}>По вашему запросу ничего не найдено</div>
            <div className={styles.try}>Попробуйте написать название материала<br/> по-другому или сократить запрос</div>
          </div>}</>}</div>
          <div onClick={props.onClick} className={styles.btn}><Button search type="button"></Button></div>
          <div onClick={props.onClick} className={styles.mobileBtns}>
          {isOpen ?
          <div className={styles.cross}><Button cross type="button" onClick={() => setIsOpen(false)}></Button></div>
          :
          <Button search type="button" onClick={() => setIsOpen(true)}></Button>}</div>
      </div>
    </form>
  )
}
