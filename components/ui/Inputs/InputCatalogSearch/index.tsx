import {useDetectOutsideClick} from "components/dashboard/TagSelect/useDetectOutsideClick";
import Button from 'components/ui/Button'
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  fetchAutoCompleteCatalogFilesSearch,
  fetchAutoCompleteCatalogFoldersSearch,
  fetchAutoCompleteCatalogProjectsSearch,
  fetchAutoCompleteSpeakersSearch,
  resetAutoCompleteCatalogSearch,
} from "components/search/actions";
import {IRootState} from "types";
import File from 'components/dashboard/File';
import Link from 'next/link';
import SearchSuggestionLoader from 'components/ContentLoaders/searchSuggestionLoader';
import SpeakerPhoto from 'components/speakers/SpeakerPhoto'


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
  const speakers = useSelector((state: IRootState) => state.search.autoCompleteSpeakers)
  const speakersLoading = useSelector((state: IRootState) => state.search.autocompleteSpeakersLoading)

  const projects = useSelector((state: IRootState) => state.search.autoCompleteProjects)
  const files = useSelector((state: IRootState) => state.search.autoCompleteFiles)
  const filesLoading = useSelector((state: IRootState) => state.search.autocompleteFilesLoading)
  const projectsLoading = useSelector((state: IRootState) => state.search.autocompleteProjectsLoading)
  const folders = useSelector((state: IRootState) => state.search.autoCompleteFolders)
  const foldersLoading = useSelector((state: IRootState) => state.search.autocompleteFoldersLoading)
  console.log("SearchFolders", folders);
  const loading = filesLoading || projectsLoading || foldersLoading || speakersLoading;

  useEffect(() => {
    if (props.searchValue && !value) {
      setValue(props.searchValue);
    }
  }, [props.searchValue])
  const handleSubmit = () => {
    if (value) {
      router.push(`/search?query=${value}`);
    }
    setIsActiveItem(false);
  }
  const handleSearch = (e) => {
    const value = e.currentTarget.value
    setValue(value);
    if (value.length < 3) {
      setIsActiveItem(false);
      dispatch(resetAutoCompleteCatalogSearch());
      return;
    } else {
      setIsActiveItem(true);
    }
    dispatch(fetchAutoCompleteCatalogFilesSearch(value, {}))
    dispatch(fetchAutoCompleteCatalogProjectsSearch(value, {}))
    dispatch(fetchAutoCompleteCatalogFoldersSearch(value, {}))
    dispatch(fetchAutoCompleteSpeakersSearch(value, {}))
  }
  const handleProjectClick = (item) => {
    router.push(`/catalog/${item.id}`);
    setIsActiveItem(false);
  }
  const handleFileClick = (item) => {
    setIsActiveItem(false);
  }
  const handleInputClick = (item) => {
    if (value.length >= 3) {
      setIsActiveItem(true);
    }
  }

  return (
    <form className={isOpen ? styles.open : styles.form} action='/search' onSubmit={handleSubmit}>
      <div className={isOpen ? styles.inputContainer__mobile : styles.inputContainer}>
        <input
          name="query"
          type='text'
          value={value}
          autoComplete={'off'}
          onClick={handleInputClick}
          onChange={handleSearch}
          placeholder={props.placeholder}
        />
        <div ref={dropdownRefItem} style={{display: isActiveItem ? 'block' : 'none'}}>
          {loading && value && <div className={styles.loaderWrapper}><SearchSuggestionLoader/></div>}
          {value && !loading &&
          <>
            {projects.length || files.length || folders.length || speakers.length ?
              <div className={styles.suggestion}>
                <div className={styles.innerWrapper}>

                  {projects.length > 0 && <div className={styles.projects}>
                      <div className={styles.title}>Проекты</div>
                    {projects.map(project =>
                      <div className={styles.project} key={project}
                           onClick={() => handleProjectClick(project)}>{project.name}</div>
                    )}
                  </div>}

                  {speakers.length > 0 && <div className={styles.speakers}>
                      <div className={styles.title}>Спикеры</div>
                    {speakers.map(speaker =>
                      <div className={styles.speaker} key={speaker.id}>
                        <div className={styles.avatar}>
                          <SpeakerPhoto size={'small'} photo={speaker.mainCover}/></div>
                        <div className={styles.info}>
                          <div className={styles.name}>{speaker.name}</div>
                          <div className={styles.description}>{speaker.description}</div>
                        </div>
                      </div>
                    )}
                  </div>}

                  {folders.length > 0 && <div className={styles.folders}>
                      <div className={styles.title}>Папки</div>
                      <div className={styles.wrapper}>{folders.map(file => (<File
                        onClick={handleFileClick}
                        canEdit={false}
                        additionalInfo={false}
                        showFavorite={false}
                        item={file}
                      />))}</div>
                  </div>}
                  {folders.length > 0 && <div className={styles.folders}>
                      <div className={styles.title}>Папки</div>
                      <div className={styles.wrapper}>{folders.map(file => (<File
                        onClick={handleFileClick}
                        canEdit={false}
                        additionalInfo={false}
                        showFavorite={false}
                        item={file}
                      />))}</div>
                  </div>}

                  {files.length > 0 && <div className={styles.files}>
                      <div className={styles.title}>Файлы</div>
                      <div className={styles.wrapper}>{files.map(file => (<File
                        onClick={handleFileClick}
                        canEdit={false}
                        additionalInfo={false}
                        item={file}
                      />))}</div>
                  </div>}
                </div>

                <div className={styles.btnWrapper}>
                  <div className={styles.transparent}>
                    <a onClick={handleSubmit} className={styles.show}>Показать все результаты</a>
                  </div>
                </div>

              </div>
              :
              <div className={styles.noSuggestion}>
                <img src="/img/icons/lamp.svg" alt=""/>
                <div className={styles.notFound}>По вашему запросу ничего не найдено</div>
                <div className={styles.try}>Попробуйте написать название материала<br/> по-другому или сократить запрос
                </div>
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
