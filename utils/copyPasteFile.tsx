import {pluralize} from 'utils/formatters'

export const getPasteFileTitle = (copyItems) => {
  if(copyItems.length === 1){
    return `Вы уверены, что хотите переместить ${copyItems[0].entryType === 'file' ? 'файл' : 'папку'} ?`;
  }else{
    const folders = copyItems.filter(i => i.entryType === 'folder');
    const files = copyItems.filter(i => i.entryType === 'file');
    return `Вы уверены, что хотите переместить ${folders.length > 0 ? `${folders.length} ${pluralize(folders.length, 'папка', 'папки', 'папок')}` : ''} 
          ${files.length > 0 ? `${files.length} ${pluralize(files.length, 'файл', 'файла', 'файлов')}` : ''} ?`;

  }
}
export const getPasteFileDescription = (copyItems, currentCatalogItem) => {
  try {

    if (copyItems.length === 1) {
      return `${copyItems[0].entryType === 'file' ? 'Файл' : 'Папка'} «${copyItems[0].name}» будет ${copyItems[0].entryType === 'file' ? 'перемещен' : 'перемещена'} в ${currentCatalogItem.entryType === 'project' ? 'проект' : 'папку'} «${currentCatalogItem.name}»`
    } else {
      const hasFolders = copyItems.filter(i => i.entryType === 'folder').length > 0;
      const hasFiles = copyItems.filter(i => i.entryType === 'file').length > 0;
      let titlePrefix = '';
      if (hasFiles && hasFolders) {
        titlePrefix = 'Файлы и папки'
      } else if (hasFolders) {
        titlePrefix = 'Папки'
      } else if (hasFiles) {
        titlePrefix = 'Файлы'
      }
      return `${titlePrefix} будет ${copyItems[0].entryType === 'file' ? 'перемещен' : 'перемещена'} в ${currentCatalogItem.entryType === 'project' ? 'проект' : 'папку'} «${currentCatalogItem.name}»`

    }
  }catch (e){

  }
}