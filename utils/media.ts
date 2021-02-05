export const getMediaPath = (file) => {
    if(!file){
        return null;
    }
    if(file.includes('https://')){
        return file;
    }
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://dev.sbercu.firelabs.ru'}/api/media/files${file.indexOf('/') === 0 ? file : `/${file}`}`
}

export const getMediaPathWithQuality = (file, quality) => {
    if(!file){
        return null;
    }
    return `${getMediaPath(file)}?quality=${quality}`;
}
