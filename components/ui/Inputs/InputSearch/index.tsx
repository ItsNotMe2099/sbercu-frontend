import Button from 'components/ui/Button'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAutoCompleteCatalogSearch } from "components/search/actions";
import { IRootState } from "types";
import File from 'components/dashboard/File';



interface Props {
  placeholder?: string,
    onChange?: (value) => void
    onClick?: () => void
    searchValue?: string
}

export default function InputSearch(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([])
    const [filteredFiles, setFilteredFiles] = useState([])
    const [showSuggestions, setIsShow] = useState(false)
    const router = useRouter();
    const dispatch = useDispatch()
    const projects = useSelector((state: IRootState) => state.catalog.projects)
    const files = useSelector((state: IRootState) => state.catalog.myUploadedFilesList)
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
        //dispatch(fetchAutoCompleteCatalogSearch(value, {}))
        const userInput = e.currentTarget.value
        const filteredProjects = projects.filter(project => project.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
        const filteredFiles = files.filter(file => file.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
        setValue(e.currentTarget.value);
        setFilteredProjects(filteredProjects)
        setFilteredFiles(filteredFiles)
        setIsShow(true)
    }
    const handleClick = (e) => {
      setValue(e.currentTarget.innerText);
      setFilteredProjects([])
      setFilteredFiles([])
      setIsShow(false)
    }
  return (
    <form className={isOpen ? styles.open : styles.form} action='/search' onSubmit={handleSubmit}>
      <div className={isOpen ? styles.inputContainer__mobile : styles.inputContainer}>
          <input
              name="query"
              type='text'
              value={value}
              onChange={handleSearch}
              placeholder={props.placeholder}
          />
          {showSuggestions && value &&
          <>
          {filteredProjects.length || filteredFiles.length ?
          <div className={styles.suggestion}>
          <div className={styles.projects}>
            <div className={styles.title}>Проекты</div>
            {filteredProjects.map((project) => 
              <div className={styles.project} key={project} onClick={handleClick}>{project.name}</div>
            )}
          </div>
          <div className={styles.files}>
            <div className={styles.title}>Файлы</div>
            <div className={styles.wrapper}>{filteredFiles.map(file => (<File
            item={file}
            onClick={handleClick}
            />))}</div>
          </div>
          </div> 
          : 
          <div className={styles.noSuggestion}>
            <img src="/img/icons/lamp.svg" alt=""/>
            <div className={styles.notFound}>По вашему запросу ничего не найдено</div>
            <div className={styles.try}>Попробуйте написать название материала<br/> по-другому или сократить запрос</div>
          </div>}</>}
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
