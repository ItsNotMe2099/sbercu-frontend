export const getMediaPath = (file) => {
    if(!file){
        return null;
    }
    if(file.includes('https://')){
        return file;
    }
    return `${process.env.NEXT_PUBLIC_API_URL || ''}/api/media/files${file.indexOf('/') === 0 ? file : `/${file}`}`
}

export const getMediaPathWithQuality = (file, quality) => {
    if(!file){
        return null;
    }
    return `${getMediaPath(file)}?quality=${quality}`;
}
export const getFileExtension = source => {
    return source?.split('.')?.pop()?.toLowerCase() || '';
}
export const isAudio = source => {
    return ['mp3', 'ogg', 'wav'].includes(getFileExtension(source));
}
export const isVideo = source => {
    return ['mp4', 'avi'].includes(getFileExtension(source));
}
export const isImage = source => {
    return ['png', 'jpg', 'jpeg', 'gif'].includes(getFileExtension(source));
}
export const isDocument = source => {
    return ['ppt', 'pptx', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'rtf', 'tif', 'bmp'].includes(getFileExtension(source));
}
