import {ITagCategoryType} from "types";
import TagPage from 'components/tags/TagPage'
import {getAuthServerSide} from 'utils/auth'

const Tags = (props) => {
  return <TagPage {...props} categoryType={ITagCategoryType.Project}/>
}
export default Tags
export const getServerSideProps = getAuthServerSide({redirect: true});
