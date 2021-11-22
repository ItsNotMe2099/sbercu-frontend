import VideoPage from 'components/video-page'
import request from 'utils/request'
import {getAuthServerSide} from 'utils/auth'
import {getVideoViewHistory} from 'utils/requests'
const queryString = require('query-string')



export async function getServerSideProps(ctx) {
  const authRes = (await getAuthServerSide({redirect: true})(ctx)) as any
  if(!authRes?.props){
    return;
  }
   const authProps = authRes.props;
  const id = ctx.query.id;
  const res = await request({url: `/api/catalog/show/${id}?${queryString.stringify({showTags: '1'})}`, method: 'GET'}, ctx);
  if (!res) {
    return {
      notFound: true,
    }
  }
  return {
    props: { initialVideo: res.data, ...authProps },
  }
}
export default VideoPage

