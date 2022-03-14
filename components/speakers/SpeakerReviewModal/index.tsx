import Modal from 'components/ui/Modal'
import { useDispatch, useSelector } from 'react-redux'
import {ISpeakerFeedback} from 'types'
import SpeakerReviewForm from 'components/speakers/SpeakerReviewModal/Form'
import {createFeedback, updateFeedback, updateFeedbackRequest} from 'components/feedback/actions'


interface Props {
  feedback?: ISpeakerFeedback,
  speakerId: null
  isOpen: boolean,
  onRequestClose:() => void
}

export default function SpeakerReviewModal(props: Props){
  const {feedback, speakerId} = props;
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    if(feedback){
      dispatch(updateFeedback(feedback.id, {...data }))
    }else{
      dispatch(createFeedback({...data, toSpeakerId: speakerId, target: 'speaker' }))
    }

  }

  return (
    <Modal {...props} title={feedback ? 'Изменить отзыв' : 'Новый отзыв'}>
        <SpeakerReviewForm onSubmit={handleSubmit} initialValues={{...props.feedback}}/>
    </Modal>
  )
}
