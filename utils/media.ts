export const getMediaPath = (file, publicHash = null) => {
    if(!file){
        return null;
    }
    if(file.includes('https://')){
        return file;
    }
    return `${process.env.NEXT_PUBLIC_API_URL || ''}/api/media/${publicHash ? 'files-public' : 'files'}${file.indexOf('/') === 0 ? file : `/${file}`}${publicHash ? `?hash=${publicHash}` : ''}`
}

export const getMediaPathWithQuality = (file, quality, publicHash = null) => {
    if(!file){
        return null;
    }
    return `${getMediaPath(file, publicHash)}${publicHash ? '&' : '?'}quality=${quality}`;
}
export const cleanMediaExtFileName = source => {
    if(isVideo(source) || isDocument(source) || isImage(source) || isDocument(source)){
        return source?.replace(source.substr(source.lastIndexOf('.')), '')
    }else{
        return source;
    }
}
export const getFileExtension = source => {
    return source?.split('.')?.pop()?.toLowerCase() || '';
}
export const isAudio = source => {
    return ['mp3', 'ogg', 'wav'].includes(getFileExtension(source));
}
export const isVideo = source => {
    return ['mp4', 'avi', 'mov'].includes(getFileExtension(source));
}
export const isImage = source => {
    return ['png', 'jpg', 'jpeg', 'gif'].includes(getFileExtension(source));
}
export const isDocument = source => {
    return ['ppt', 'pptx', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'rtf', 'tif'].includes(getFileExtension(source));
}
