import Layout from "components/layout/Layout";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {ICatalogEntry, IHeaderType, IRootState, ISpeaker} from "types";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import BreadCrumbs from 'components/ui/Breadcrumbs';
import Tag from 'components/video-page/component/tag';
import {useDispatch, useSelector} from 'react-redux'
import {NextSeo} from 'next-seo'
import {IUser} from "types";
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
import {catalogCopy, deleteCatalog} from 'components/catalog/actions'
import {fetchFeedbackList} from 'components/feedback/actions'
import SpeakerFeedbackList from 'components/speakers/SpeakerFeedbackList'
import SpeakerPhoto from 'components/speakers/SpeakerPhoto'

const queryString = require('query-string')

interface Props {
  initialSpeaker: ISpeaker,
  user: IUser
}


const SpeakerPage = (props: Props) => {

  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const speaker = useSelector((state: IRootState) => state.speakers.currentSpeakerItem)
  const modalKey = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const [currentEditFeedback, setCurrentEditFeedback] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter()
  console.log("Auth", props)

  const canEdit = props.user.role === 'admin';
  const settings = [
    {value: 'edit', label: 'Редактировать'},
    {value: 'delete', label: 'Удалить'}
  ];

  useEffect(() => {
    dispatch(resetSpeakerItem());
    if (!router.query.id) {
      return;
    }
    if (props.initialSpeaker) {
      dispatch(setSpeakerItem(props.initialSpeaker));
    } else {
      dispatch(fetchSpeakerItemRequest(router.query.id, {showTags: '1'}));
    }


  }, [router.query.id])

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
  return (
    <Layout>
      {speaker && <NextSeo title={speaker.name}/>}
      <Header {...props} type={IHeaderType.Speaker}/>
      {(!currentLoading && speaker) && <div className={styles.root}>
          <div className={styles.title}>{speaker.name}</div>
          <BreadCrumbs items={[{name: 'Главная', link: '/'}, {name: 'Спикеры', link: '/speakers'}]}/>
          <div className={styles.content}>
              <div className={styles.left}>

                <div className={styles.gallery}>
                    <div className={styles.mainPhoto}><SpeakerPhoto size={'large'} photo={speaker.mainCover}/></div>
                </div>
                  <div className={styles.name}>{speaker.name}</div>
                  <div className={styles.nameEng}>{speaker.nameEng}</div>
                  <div className={styles.description}>{speaker.description}</div>
                  <div className={styles.bio}>{speaker.bio}</div>

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
                  <div className={styles.rating}>{speaker.rating || 0}
                      <div className={styles.star}><StarFilled/></div>
                  </div>

                  <Button className={styles.newFeedbackBtn} brdrLightGrey textLightGrey size="9px 16px"
                          onClick={handleCreateFeedbackClick}>Оставить отзыв</Button>
                  <div className={styles.info}>
                    {renderInfoItem('Юридическое лицо (в 1С)', speaker.legalEntity)}
                    {renderInfoItem('Стоимость', speaker.price)}
                    {renderInfoItem('Язык выступления', speaker.languages)}
                    {renderInfoItem('Контакты спикера', speaker.speakerContacts)}
                    {renderInfoItem('Контакты агента', speaker.agentContacts)}
                  </div>
              </div>
          </div>
        {speaker && <SpeakerFeedbackList user={props.user} speakerId={speaker?.id} onEditClick={handleEditFeedbackClick}
                                         onCreateClick={handleCreateFeedbackClick}/>}
      </div>}

      {modalKey === 'createSpeakerFeedback' && <SpeakerReviewModal isOpen={modalKey === 'createSpeakerFeedback'}
                                                                   onRequestClose={() => dispatch(modalClose())}
                                                                   feedback={currentEditFeedback}
                                                                   speakerId={speaker.id}/>}

    </Layout>
  )
}

export default SpeakerPage
