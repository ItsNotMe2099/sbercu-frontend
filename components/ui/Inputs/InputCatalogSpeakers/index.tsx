import {useDetectOutsideClick} from "components/dashboard/TagSelect/useDetectOutsideClick";
import Button from 'components/ui/Button'
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  fetchAutoCompleteSpeakersSearch,
  resetAutoCompleteCatalogSearch
} from "components/search/actions";
import {IRootState, ISpeaker} from "types";
import SearchSuggestionLoader from 'components/ContentLoaders/searchSuggestionLoader';
import SpeakerPhoto from 'components/speakers/SpeakerPhoto'
import Cross from 'components/svg/Cross'
import cx from 'classnames'
import request from 'utils/request'
import {useThrottleFn} from '@react-cmpt/use-throttle'

interface Props {
  placeholder?: string,
  onChange?: (value) => void
  onClick?: () => void
  searchValue?: string,
  hasAutocomplete?: boolean
  input?: any,
  meta?: any,
  label?: string,
  autoFocus?: boolean
}

export default function InputCatalogSpeakers(props: Props) {
  const { meta: { error, touched }, input } = props;
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("");
  const dropdownRefItem = useRef(null)
  const inputRef = useRef(null)
  const [noDataOpen, setNoDataOpen] = useState(true);
  const handleCloseDropdown = () => {
    if( inputRef.current?.value){
      input.onChange(inputRef.current?.value)
    }
    setNoDataOpen(false);
  }
  const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false, handleCloseDropdown);

  const router = useRouter();
  const [speakers, setSpeakers] = useState<ISpeaker[]>([])
  const [speakersLoading, setSpeakersLoading] = useState<boolean>(false)

  const loading = speakersLoading


  useEffect(() => {
    if(!input.value?.id){
      setValue(input.value);
    }
  }, [input.value])

  const handleSubmit = () => {
    if (value) {
      router.push(`/speakers/search?query=${value}`);
    }
    setIsActiveItem(false);
  }
  const handleLoadData = async (query) => {
    setSpeakersLoading(true);
    const res = await request({
      url: `/api/speaker/search?query=${query}`,
      method: 'GET'
    });
    setSpeakers(res.data?.data ?? [])
    setSpeakersLoading(false);
  }
  const { callback: onSearchChange, cancel: cancelSearch, callPending: saveViewHistoryPending } = useThrottleFn(handleLoadData, 700)


  const handleSearch = (e) => {
    const value = e.currentTarget.value
    setValue(value);
    if(!noDataOpen){
      setNoDataOpen(true);
    }
    if (value.length < 3) {
      cancelSearch()
      setSpeakersLoading(false);
      setIsActiveItem(false);
      return;
    } else {
      setIsActiveItem(true);
    }

    onSearchChange(value);
  }
  const handleSpeakerClick = (item) => {
    input.onChange(item);
    setIsActiveItem(false);
    setValue('');
  }
  const handleInputClick = (item) => {
    if (value?.length >= 3) {
      setIsActiveItem(true);
    }
  }
  const handleRemoveSpeaker = () => {
    input.onChange(null);
  }
  const handleKeyDown = (e) => {
    if(e.keyCode == 13) {
      input.onChange(value);
      setIsActiveItem(false);
      e.preventDefault();
      e.stopPropagation();
    }
  }
  const isSpeaker = !!input.value?.id;
  return (
    <div className={cx(styles.root, {[styles.open]: isOpen})} >
      {props.label && <div className={styles.label}>{props.label}</div>}

      <div className={isOpen ? styles.inputContainer__mobile : styles.inputContainer}>
        {!isSpeaker && <input
            ref={inputRef}
          name="query"
          type='text'
          value={value}
          autoComplete={'off'}
          onClick={handleInputClick}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder={props.placeholder}
        />}
        {isSpeaker && <div className={styles.speakerInput}>
            <SpeakerPhoto size={'exSmall'} photo={input.value.mainCover}/>
            <div className={styles.speakerInputName}>{input.value.name}</div>
          <div className={styles.speakerInputRemove} onClick={handleRemoveSpeaker}><Cross/></div>
          </div>}
        <div ref={dropdownRefItem} style={{display: isActiveItem ? 'block' : 'none'}}>
          {loading && value && <div className={styles.loaderWrapper}>Ищем добавленных спикеров...</div>}
          {value && !loading &&
          <>
            {speakers.length > 0  &&
              <div className={styles.suggestion}>
                <div className={styles.selectTip}>Выберите спикера из списка либо продолжите вводить вручную и нажмите enter</div>
                <div className={styles.innerWrapper}>

                  {speakers.length > 0 && <div className={styles.speakers}>
                    {speakers.map(speaker =>
                      <div className={styles.speaker} key={speaker.id} onClick={( () => handleSpeakerClick(speaker))}>
                        <div className={styles.avatar}>
                          <SpeakerPhoto size={'small'} photo={speaker.mainCover}/></div>
                        <div className={styles.info}>
                          <div className={styles.name}>{speaker.name}</div>
                        </div>
                      </div>
                    )}
                  </div>}


                </div>


              </div>}
            {noDataOpen && speakers.length === 0 && <div className={styles.noSuggestion}>
                Спикера с таким именем еще нет, будет добавлен текстом
            </div>}
          </>}
        </div>
      </div>
    </div>
  )
}
