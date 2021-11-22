const setCookie = require('set-cookie-parser');
export const parseSetCookies = (val: string) => {
  const combinedCookieHeader = val;
  const splitCookieHeaders = setCookie.splitCookiesString(combinedCookieHeader)
  return setCookie.parse(splitCookieHeaders);
}
