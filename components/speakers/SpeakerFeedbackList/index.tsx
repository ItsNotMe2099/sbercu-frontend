import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import {useRouter} from 'next/router'
import {IHeaderType, IRootState, ITagCategoryType, IUser} from 'types'
import {useCallback, useEffect, useState} from 'react'
import {confirmOpen, editFileOpen, modalClose} from 'components/Modal/actions'
import Layout from 'components/layout/Layout'
import Header from 'components/layout/Header'
import {TagSelect} from 'components/dashboard/TagSelect'
import DashboardLoader from 'components/ContentLoaders/dashboardLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import Footer from 'components/layout/Footer'

const queryString = require('query-string')

import {useDispatch, useSelector} from 'react-redux'
import {fetchSpeakerList, resetSpeakerList} from 'components/speakers/actions'
import SpeakerCard from 'components/speakers/SpeakerCard'
import {deleteFeedback, fetchFeedbackList, resetFeedbackList} from 'components/feedback/actions'
import FeedbackCard from 'components/speakers/SpeakerFeedbackList/component/FeedbackCard'
import Quantity from 'pages/dashboard/components'
import {format} from 'date-fns'
import Button from 'components/ui/Button'
interface Props{
  speakerId: null
  onEditClick?: (item) => void
  onCreateClick?: () => void
  user?: IUser
}
const SpeakerFeedbackList = (props: Props) => {
 const{speakerId, user, onCreateClick} = props
  const dispatch = useDispatch();
  const router = useRouter();
  const listLoading = useSelector((state: IRootState) => state.feedback.listLoading)
  const loading = listLoading;


  const list = useSelector((state: IRootState) => state.feedback.list)
  const listTotal = useSelector((state: IRootState) => state.feedback.total)


  const [page, setPage] = useState(1);


  const limit = 30;

  useEffect(() => {
    dispatch(resetFeedbackList());

    dispatch(fetchFeedbackList(speakerId, {limit}))
    return () => {
      dispatch(resetFeedbackList());
    }
  }, [])



  const handleDeleteClick = (item) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить отзыв?',
      description: `#${item.id} от ${format(new Date(item.createdAt), 'dd.MM.yyy HH:mm')}`,
      confirmColor: 'red',
      confirmText: 'Удалить',
      onConfirm: () => {
        dispatch(deleteFeedback(item.id));
      }
    }));
  }



  const handleScrollNext = () => {
    setPage(page + 1)
    dispatch(fetchSpeakerList({ page: page + 1, limit: limit }));
  }

  return (

      <div className={styles.root}>

        <div className={styles.titleContainer}>
          <div className={styles.title}>Отзывы</div>
          { listTotal > 0 && <Quantity
            quantity={listTotal}
          />}
        </div>
       {loading && listTotal === 0 && <DashboardLoader/>}
        {!loading && listTotal === 0 &&
        <div className={styles.empty}>       <Button green size="9px 16px" onClick={onCreateClick} >Оставить отзыв</Button></div>}
        {listTotal > 0 && <>

            <InfiniteScroll
                dataLength={list.length}
                next={handleScrollNext}
                loader={<div></div>}
                hasMore={ listTotal !== list.length}
                style={{overflow: "inherit"}}
                className={styles.scroll}
            >
                <div className={styles.list}>
                  {list.map(item => (<FeedbackCard item={item} onEditClick={props.onEditClick} onDeleteClick={handleDeleteClick} canEdit={user?.role === 'admin' }/>))}
                </div>
            </InfiniteScroll>
            <Button green size="9px 16px" onClick={onCreateClick}>Оставить отзыв</Button>

        </>}
      </div>);

}
export default SpeakerFeedbackList
