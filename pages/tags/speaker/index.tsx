import {ITagCategoryType} from "types";
import TagPage from 'components/tags/TagPage'
import {getAuthServerSide} from 'utils/auth'

const Tags = (props) => {
  return <TagPage {...props} categoryType={ITagCategoryType.Speaker}/>
}

export async function getServerSideProps(ctx) {
  const authRes = (await getAuthServerSide({redirect: true})(ctx)) as any
  if (!authRes?.props?.user) {
    return authRes;
  }

  if(authRes?.props?.user?.role !== 'admin'){
    return {
      notFound: true
    }
  }

  return {
    props: {...authRes?.props},
  }

}
export default Tags
