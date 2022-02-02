import Layout from "components/layout/Layout";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {ICatalogEntry, IHeaderType, IRootState, ISpeaker, SpeakerPriceCurrencyList, SpeakerPriceTypeList} from "types";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import BreadCrumbs from 'components/ui/Breadcrumbs';
import Tag from 'components/video-page/component/tag';
import {useDispatch, useSelector} from 'react-redux'
import {NextSeo} from 'next-seo'
import {IUser} from "types";
import Linkify from 'react-linkify';
import {
  deleteSpeaker,
  fetchSpeakerItemRequest,
  fetchSpeakerList,
  resetSpeakerItem,
  setSpeakerItem
} from 'components/speakers/actions'
import CreateFolder from 'pages/catalog/components/CreateFolder'
import {
  confirmOpen,
  createSpeakerFeedbackOpen, editFileOpen,
  filePosterUploadModalOpen,
  modalClose,
  uploadFilesModalOpen
} from 'components/Modal/actions'
import SpeakerReviewModal from 'components/speakers/SpeakerReviewModal'
import {StarFilled} from 'components/svg/Star'
import Button from 'components/ui/Button'
import ButtonSelect from 'components/ui/ButtonSelect'
import {
  catalogCopy,
  deleteCatalog,
  fetchCatalogFiles,
  fetchMyUploadedFiles,
  resetCatalogList
} from 'components/catalog/actions'
import {fetchFeedbackList} from 'components/feedback/actions'
import SpeakerFeedbackList from 'components/speakers/SpeakerFeedbackList'
import SpeakerPhoto from 'components/speakers/SpeakerPhoto'
import Footer from 'components/layout/Footer'
import {capitalizeFirstLetter, formatPhone} from 'utils/formatters'
import cx from 'classnames'
import {LanguagesList} from 'utils/languages'
import {getMediaPath} from 'utils/media'

import Lightbox from "react-awesome-lightbox";
import Quantity from 'pages/dashboard/components'
import InfiniteScroll from 'react-infinite-scroll-component'
import File from 'components/dashboard/File'

const queryString = require('query-string')

interface Props {
  initialSpeaker: ISpeaker,
  user: IUser
}


const SpeakerPage = (props: Props) => {

  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const speaker = useSelector((state: IRootState) => state.speakers.currentSpeakerItem)
  const modalKey = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const files = useSelector((state: IRootState) => state.catalog.list)
  const filesTotal = useSelector((state: IRootState) => state.catalog.listTotal)
  const filesLoading = useSelector((state: IRootState) => state.catalog.listLoading)
  const [showFiles, setShowAllFiles] = useState(false)
  const [pageFiles, setPageFiles] = useState(1);

  const [currentEditFeedback, setCurrentEditFeedback] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter()
  console.log("Auth", props)

  const limitFiles = 30;
  const canEdit = props.user.role === 'admin' || (speaker?.userId && speaker?.userId === props.user?.id);
  const settings = [
    {value: 'edit', label: 'Редактировать'},
    {value: 'delete', label: 'Удалить'}
  ];
  const speakerId = router.query.id;

  useEffect(() => {
    dispatch(resetCatalogList());
    dispatch(resetSpeakerItem());
    if (!router.query.id) {
      return;
    }
    dispatch(fetchCatalogFiles(speakerId, {page: 1, limit: limitFiles}));

    dispatch(fetchSpeakerItemRequest(router.query.id, {showTags: '1'}));

    return () => {
      dispatch(resetCatalogList());
    }

  }, [router.query.id])

  const handleShowFiles = () => {
    if (showFiles) {
      setShowAllFiles(false)
    } else {
      setShowAllFiles(true)
      if (pageFiles === 1) {
        setPageFiles(pageFiles + 1)
        dispatch(fetchCatalogFiles(speaker.id, {page: pageFiles + 1, limit: limitFiles}));
      }
    }

  }
  const handleScrollNextFiles = () => {
    setPageFiles(pageFiles + 1)
    dispatch(fetchCatalogFiles(speaker.id, {page: pageFiles + 1, limit: limitFiles}));
  }

  const getTagCategories = () => {
    const categoriesMap = {};
    const categories = []
    console.log("SPEAKER?.tags", speaker?.tags)
    for (const tag of speaker?.tags) {
      if (!tag.tagCategory) {
        continue;
      }
      if (!categoriesMap[tag.tagCategoryId]) {
        categoriesMap[tag.tagCategoryId] = {category: tag.tagCategory, tags: [tag]}
        categories.push(categoriesMap[tag.tagCategoryId]);
      } else {
        categoriesMap[tag.tagCategoryId].tags.push(tag);
      }
    }
    console.log("categories", categories)
    return categories;
  }

  const handleTagClick = (tag) => {
    console.log("TagClick", tag);
    router.push(`/speakers/?${queryString.stringify({tags: JSON.stringify([tag.id])})}`)
  }

  const renderInfoItem = (label: string, value: any) => {
    if (!value) {
      return null;
    }
    return <div className={styles.infoItem}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  }

  const renderInfoContactItem = (label: string, phone: string, email: string) => {

    return <div className={styles.infoItem}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {phone && <a className={styles.contact} href={`tel:${phone}`}>{formatPhone(`+${phone}`)}</a>}
        {email &&
        <a className={cx(styles.contact, {[styles.space]: phone && email})} href={`mailto:${email}`}>{email}</a>}
      </div>
    </div>
  }
  const handleCreateFeedbackClick = () => {
    setCurrentEditFeedback(null);
    dispatch(createSpeakerFeedbackOpen());
  }
  const handleSettingsClick = (item) => {
    switch (item.value) {
      case 'edit':
        router.push(`/speakers/edit/${speaker.id}`)
        break;
      case 'delete':
        dispatch(confirmOpen({
          title: 'Вы уверены, что хотите удалить спикера?',
          description: item.name,
          confirmColor: 'red',
          confirmText: 'Удалить',
          onConfirm: () => {
            dispatch(deleteSpeaker(speaker?.id));
          }
        }));
        break;
    }
  }
  const handleEditFeedbackClick = (item) => {
    setCurrentEditFeedback(item);
    dispatch(createSpeakerFeedbackOpen());
  }
  const handleMainPhotoClick = () => {
    setShowGallery(!showGallery);
    setGalleryIndex(0)
  }
  const handleGalleryItemClick = (index) => {
    console.log("SetGallery", showGallery)
    setShowGallery(!showGallery);
    setGalleryIndex(speaker.mainCover ? index + 1 : index)
  }

  const renderPriceText = () => {
    if (!speaker.price) {
      return '';
    }
    const priceType = SpeakerPriceTypeList?.find(i => i.value === speaker.priceType)?.label || '';
    const currency = SpeakerPriceCurrencyList?.find(i => i.value === speaker.currency)?.label || '';

    return `${speaker.price}${currency ? ` ${currency}` : ''}${priceType ? `, ${priceType}` : ''}`
  }

  const linkifyComponent = (decoratedHref, decoratedText, key) => (
    <a target="blank" href={decoratedHref} key={key}>
      {decoratedText}
    </a>
  )
  return (
    <Layout>
      {speaker && <NextSeo title={speaker.name}/>}
      <Header {...props} type={IHeaderType.Speaker}/>
      {(!currentLoading && speaker) && <div className={styles.root}>

          <BreadCrumbs items={[{name: 'Главная', link: '/'}, {name: 'Спикеры', link: '/speakers'}]}/>
          <div className={styles.content}>
              <div className={styles.left}>

                  <div className={styles.gallery}>
                      <div className={styles.mainPhoto}><SpeakerPhoto size={'large'} photo={speaker.mainCover}
                                                                      onClick={speaker.mainCover && handleMainPhotoClick}/>
                      </div>
                      <div className={styles.photoList}>
                        {(speaker.cover.length > 5
                            ? speaker.cover.slice(0, 5)
                            : speaker.cover
                        ).map((i, index) => <div className={styles.photoItem}
                                                 onClick={() => handleGalleryItemClick(index)}><img
                          src={getMediaPath(i)}/></div>)}
                        {speaker.cover.length > 5 && (
                          <div className={styles.photoItem} onClick={() => handleGalleryItemClick(5)}><img
                            src={getMediaPath(speaker.cover[6])}/>
                            <div className={styles.overlay}/>
                            <div className={styles.number}>
                              +{speaker.cover.length - speaker.cover.slice(0, 5).length}
                            </div>

                          </div>

                        )}
                      </div>
                  </div>
                  <div className={styles.name}>{speaker.name}</div>
                  <div className={styles.nameEng}>{speaker.nameEng}</div>
                {speaker.shortDescription && <div className={styles.shortDescription}><Linkify
                    componentDecorator={linkifyComponent}>{speaker.shortDescription}</Linkify></div>}
                {speaker.description &&
                <div className={styles.description}>
                    <Linkify
                        componentDecorator={linkifyComponent}>{speaker.description}</Linkify></div>}
                {speaker.awards && <div className={styles.awards}><Linkify
                    componentDecorator={linkifyComponent}>{speaker.awards}</Linkify></div>}
                {speaker.bio && <div className={styles.bio}><Linkify
                    componentDecorator={linkifyComponent}>{speaker.bio}</Linkify></div>}
                {speaker.publications && <div className={styles.publications}><Linkify
                    componentDecorator={linkifyComponent}>{speaker.publications}</Linkify></div>}

              </div>
              <div className={styles.tags}>
                {getTagCategories().map(category => <Tag
                  onClick={handleTagClick}
                  category={category.category.name}
                  tags={category.tags}
                />)}
                {canEdit &&
                <div className={styles.actions}><ButtonSelect onChange={handleSettingsClick} options={settings}
                                                              size="9px 20px">Настройки</ButtonSelect></div>}
                  <div className={styles.rating}>{speaker.rating?.toFixed(1) || 0}
                      <div className={styles.star}><StarFilled/></div>
                  </div>

                  <Button className={styles.newFeedbackBtn} brdrDarkGrey textDarkGrey size="9px 16px"
                          onClick={handleCreateFeedbackClick}>Оставить отзыв</Button>
                  <div className={styles.info}>
                    {renderInfoItem('Юридическое лицо (в 1С)', speaker.legalEntity)}
                    {renderInfoItem('Стоимость', renderPriceText())}
                    {renderInfoItem('Язык выступления', speaker.languages?.map(i => capitalizeFirstLetter(LanguagesList[i])).join(', '))}
                    {(speaker.speakerContactPhone || speaker.speakerContactEmail) && renderInfoContactItem('Контакты спикера', speaker.speakerContactPhone, speaker.speakerContactEmail)}
                    {(speaker.agentContactPhone || speaker.agentContactEmail) && renderInfoContactItem('Контакты агента', speaker.agentContactPhone, speaker.agentContactEmail)}
                  </div>
              </div>
          </div>

        {filesTotal > 0 && <>
            <div className={styles.titleContainer}>
                <div className={styles.title}>Связанные файлы</div>
                <Quantity
                    quantity={filesTotal}
                />
            </div>
            <div className={styles.files}>
                <InfiniteScroll
                    dataLength={files.length}
                    next={handleScrollNextFiles}
                    loader={<div></div>}
                    style={{overflow: "inherit"}}
                    hasMore={showFiles && filesTotal !== files.length}
                    className={styles.scroll}
                >
                  {(showFiles ? files : files.slice(0, 5)).map(item => (<File
                    showFavorite={true}
                    canEdit={false}
                    basePath={''}
                    item={item}
                  />))}
                </InfiniteScroll>
            </div>
          {filesTotal > 5 && <div className={styles.moreFiles}>
              <a onClick={handleShowFiles}>
                  <img className={showFiles ? styles.hide : null} src="img/icons/arrowDown.svg"
                       alt=''/>{showFiles ? <span>Скрыть</span> : <span>Показать еще</span>}
              </a>
          </div>}
        </>}

        {speaker && <SpeakerFeedbackList user={props.user} speakerId={speaker?.id} onEditClick={handleEditFeedbackClick}
                                         onCreateClick={handleCreateFeedbackClick}/>}
      </div>}

      {modalKey === 'createSpeakerFeedback' && <SpeakerReviewModal isOpen={modalKey === 'createSpeakerFeedback'}
                                                                   onRequestClose={() => dispatch(modalClose())}
                                                                   feedback={currentEditFeedback}
                                                                   speakerId={speaker.id}/>}
      <Footer/>

      {showGallery && <Lightbox
          images={[...(speaker.mainCover ? [getMediaPath(speaker.mainCover)] : []), ...speaker.cover.map(file => getMediaPath(file))]}
          startIndex={galleryIndex}
          onClose={() => setShowGallery(false)}/>}


    </Layout>
  )
}

export default SpeakerPage
