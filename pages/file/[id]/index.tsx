import FilePage from 'components/file-page'
import {getAuthServerSide} from 'utils/auth'
import request from 'utils/request'

const queryString = require('query-string')
export async function getServerSideProps(ctx) {
  const authRes = (await getAuthServerSide({redirect: true})(ctx)) as any
  if (!authRes?.props?.user) {
    return authRes;
  }
  const authProps = authRes.props;
  const id = ctx.query.id;

  const res = await request({
    url: `/api/catalog/show/${id}?${queryString.stringify({showTags: '1'})}`,
    method: 'GET'
  }, ctx);

  if(!res.data){
    return {
      notFound: true
    }
  }

  return {
    props: {initialVideo: res.data, host: ctx.req.headers['host'], ...authProps},
  }

}
export default FilePage


