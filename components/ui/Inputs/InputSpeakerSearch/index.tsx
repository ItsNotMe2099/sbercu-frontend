import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import Button from 'components/ui/Button'
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAutoCompleteSpeakersSearch,
  resetAutoCompleteCatalogSearch
} from "components/search/actions";
import { IRootState } from "types";
import SearchSuggestionLoader from 'components/ContentLoaders/searchSuggestionLoader';



interface Props {
  placeholder?: string,
    onChange?: (value) => void
    onClick?: () => void
    searchValue?: string,
    hasAutocomplete?: boolean
}

export default function InputSpeakerSearch(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("");
    const dropdownRefItem = useRef(null)
    const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);

    const router = useRouter();
    const dispatch = useDispatch()
    const speakers = useSelector((state: IRootState) => state.search.autoCompleteSpeakers)
    const speakersLoading = useSelector((state: IRootState) => state.search.autocompleteSpeakersLoading)

    const loading = speakersLoading

    useEffect(() => {
        if(props.searchValue && !value) {
            setValue(props.searchValue);
        }
    }, [props.searchValue])
    const handleSubmit = () => {
        if(value) {
            router.push(`/speakers/search?query=${value}`);
        }
        setIsActiveItem(false);
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
        dispatch(fetchAutoCompleteSpeakersSearch(value, {}))
    }
  const handleSpeakerClick = (item) => {
    router.push(`/speaker/${item.id}`);
    setIsActiveItem(false);
  }
    const handleInputClick = (item) => {
        if(value.length >= 3) {
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
          <div ref={dropdownRefItem} style={{display: isActiveItem ? 'block': 'none'}}>
          {loading && value && <div className={styles.loaderWrapper}><SearchSuggestionLoader/></div>}
          {value && !loading &&
            <>
          {speakers.length  ?
          <div className={styles.suggestion}>
            <div className={styles.innerWrapper}>

              {speakers.length > 0 && <div className={styles.speakers}>
            {speakers.map(speaker =>
              <div className={styles.speaker} key={speaker.id}>
                <div className={styles.avatar}>{speaker.cover ?   <img
                  src={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/media/files/${speaker.cover}`}
                  alt=''/> : <div className={styles.stub}/>}</div>
                <div className={styles.info}>
                  <div className={styles.name}>{speaker.name}</div>
                  <div className={styles.description}>{speaker.description}</div>
                </div></div>
            )}
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
            <div className={styles.try}>Попробуйте написать <br/> по-другому или сократить запрос</div>
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
