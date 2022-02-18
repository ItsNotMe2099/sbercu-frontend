import request from 'utils/request'

export default function (){
  return null;
}


export async function getServerSideProps(ctx) {
  const paths = ctx.query.paths as string[] || []
  const id = paths[paths.length - 1]
  console.log("hash", ctx.query.hash);
  const res = await request({
    url: `/api/catalog/public/byHash/${ctx.query.hash}`,
    method: 'GET'
  }, ctx);

  console.log("resData", res);
  if (!res.data) {
    return {
      notFound: true
    }
  }else{
    return {
      redirect: {
        destination: `/catalog-public/${ctx.query.hash}/${res.data.id}`,
        permanent: false,
      },
      props: {},
    }
  }


}

