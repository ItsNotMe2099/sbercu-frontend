const pluralizeNative = require('numeralize-ru').pluralize;
export const pluralize = (number, word1, word2, word3) => {
    return pluralizeNative(number, word1, word2, word3);
}


export const formatSeconds = (seconds) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}

export const pad = (string) => {
    return ('0' + string).slice(-2)
}
