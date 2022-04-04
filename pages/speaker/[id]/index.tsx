import SpeakerPage from 'components/speakers/SpeakerPage'
import request from 'utils/request'
import {getAuthServerSide} from 'utils/auth'
import {getVideoViewHistory} from 'utils/requests'

const queryString = require('query-string')


export async function getServerSideProps(ctx) {
  const authRes = (await getAuthServerSide({redirect: true})(ctx)) as any
  if (!authRes?.props?.user) {
    return authRes;
  }
  const authProps = authRes.props;
  const id = ctx.query.id;

    const res = await request({
      url: `/api/speaker/${id}?${queryString.stringify({showTags: '1'})}`,
      method: 'GET'
    }, ctx);

    if(!res.data || authRes?.props?.user === 'guest'){
      return {
        notFound: true
      }
    }

    return {
      props: {initialVideo: res.data, ...authProps},
    }

}

export default SpeakerPage

