import {ICatalogEntry} from 'types'

export const isVideoConverting = (item: ICatalogEntry) => item.media?.type === 'video' && (!item.media || !item.media?.videoConverted || item.media?.videoCutting);
