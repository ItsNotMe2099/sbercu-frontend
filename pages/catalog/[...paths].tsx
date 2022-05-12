import {getAuthServerSide} from "utils/auth";
import request from 'utils/request'
import CatalogPage from 'components/catalog-page'
export default CatalogPage

export async function getServerSideProps(ctx) {
  const authRes = (await getAuthServerSide({redirect: true})(ctx)) as any
  if (!authRes?.props?.user) {
    return authRes;
  }
  const authProps = authRes.props;
  const paths = ctx.query.paths as string[] || []
  const id = paths[paths.length - 1]
  const res = await request({
    url: `/api/catalog/show/${id}`,
    method: 'GET'
  }, ctx);

  if (!res.data) {
    return {
      notFound: true
    }
  }

  return {
    props: {initialVideo: res.data, host: ctx.req.get('host'), ...authProps},
  }

}

