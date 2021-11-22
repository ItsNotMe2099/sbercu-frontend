import styles from './index.module.scss'

import FavoriteButton from 'components/ui/FavoriteButton'
import {ICatalogEntry} from 'types'

import { useDispatch, useSelector } from 'react-redux'
import {catalogAddToFavorite, catalogRemoveFromFavorite} from 'components/catalog/actions'

interface Props {
  item?: ICatalogEntry
  selected?: boolean
  style: 'project' | 'catalog' | 'video'
  onClick?: () => void
}

export default function FavoriteCatalogButton({selected, style, item}: Props) {
  const dispatch = useDispatch()
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("handleClick", item);
      if(item.inFavorites){
        dispatch(catalogRemoveFromFavorite(item.id, item.entryType));

      }else{
        dispatch(catalogAddToFavorite(item.id));

      }
  }
  return (
   <FavoriteButton style={style} selected={item.inFavorites} onClick={handleClick}/>
  )
}


