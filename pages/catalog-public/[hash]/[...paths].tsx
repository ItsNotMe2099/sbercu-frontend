import {getAuthServerSide} from "utils/auth";
import request from 'utils/request'
import CatalogPage from 'components/catalog-page'
export default CatalogPage


export async function getServerSideProps(ctx) {
 const paths = ctx.query.paths as string[] || []
  const id = paths[paths.length - 1]
  console.log("hash", ctx.query.hash);
  const res = await request({
    url: `/api/catalog/public/show/${id}?hash=${ctx.query.hash}`,
    method: 'GET'
  }, ctx);

  console.log("resData", res);
  if (!res.data) {
    return {
      notFound: true
    }
  }

  return {
    props: {initialVideo: res.data, public: true},
  }

}

