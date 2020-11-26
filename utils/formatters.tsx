const pluralizeNative = require('numeralize-ru').pluralize;
export const pluralize = (number, word1, word2, word3) => {
    return pluralizeNative(number, word1, word2, word3);
}
