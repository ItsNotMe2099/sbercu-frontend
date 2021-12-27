
const pluralizeNative = require('numeralize-ru').pluralize;
export const pluralize = (number, word1, word2, word3) => {
    return pluralizeNative(number, word1, word2, word3);
}
export const capitalizeFirstLetter = (string) => {
    if(!string){
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export const formatJobDuration = (duration: string) => {
    return duration ? duration.replace(/\..*/,'') : duration;
}

export const formatSeconds = (seconds, showMs = false) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    const mss = date.getUTCMilliseconds();

    if (hh) {
        return `${hh}:${pad(mm)}:${ss}${showMs ? `.${mss}` : ''}`
    }
    return `${mm}:${ss}${showMs ? `.${mss}` : ''}`
}

export const pad = (string) => {
    return ('0' + string).slice(-2)
}

const sufixes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'EB', 'ZB', 'YB'];
export const formatSize = (bytes) => {
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return !bytes && '0 байт' || (bytes / Math.pow(1024, i)).toFixed(2) + " " + sufixes[i];
};

export const formatJobStatusName = (status) => {
    switch (status) {
        case 'pending':
            return 'В очереди';
        case  'started':
            return 'В процессе';
        case  'finished':
            return 'Выполнено';
        case  'canceled':
            return 'Отменено';
        case  'error':
            return 'Ошибка';
    }
}