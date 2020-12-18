export const getMediaPath = (file) => {
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://dev.sbercu.firelabs.ru'}/api/media/files/${file}`
}
