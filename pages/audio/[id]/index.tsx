import VideoPage from 'components/video-page'
import {getAuthServerSide} from 'utils/auth'
export const getServerSideProps = getAuthServerSide({redirect: true});
export default VideoPage


