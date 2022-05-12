import FilePage from 'components/file-page'
import {getAuthServerSide} from 'utils/auth'
import request from 'utils/request'

const queryString = require('query-string')
export async function getServerSideProps(ctx) {

  const id = ctx.query.id;
  const res = await request({
    url: `/api/catalog/public/show/${id}?${queryString.stringify({showTags: '1', hash: ctx.query.hash})}`,
    method: 'GET'
  }, ctx);

  if(!res.data){
    return {
      notFound: true
    }
  }

  return {
    props: {initialVideo: res.data, host: ctx.req.headers['host'], public: true, publicHash: ctx.query.hash},
  }

}
export default FilePage


