import {IRequestData, IResponse} from 'types'
import Cookies from 'js-cookie'
import nextCookie from 'next-cookies'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import {parseSetCookies} from 'utils/cookies'
function request(requestData: IRequestData, ctx: any = null): Promise<IResponse> {
  const {url, method, data, host, timeout} = requestData
  const defaultHost = `${process.env.NEXT_PUBLIC_API_URL || ''}`
  let token = requestData.token
  if (!token) {
    token = ctx ? nextCookie(ctx).token : Cookies.get('token')
  }
  const session = ctx ? nextCookie(ctx).btv_session : Cookies.get('media_sberbank_school_session')

  const ts = (new Date()).getTime();
  const controller = typeof window !== 'undefined' ? new AbortController() : null;
  const promise =  (
    fetch(`${host || defaultHost}${url}${url.includes('?') ? `&t=${ts}` : `?t=${ts}`}`, {
      signal: controller?.signal,
      method: method || 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        cookie: `media_sberbank_school_session=${session}`,
        credentials: 'same-origin',
      },
      body: data ? JSON.stringify(data) : null,
    })
      .then(res => {
        const contentType = res.headers.get('content-type')
        const isJson = contentType && contentType.indexOf('application/json') !== -1

        if (res.status !== 200 && res.status !== 201) {
          return (isJson ? res.json() : res.text()).then((resData: any) => {
            throw {status: res.status, data: resData}
          })
        }
        const cookies = parseSetCookies(res.headers.get('Set-Cookie'))
       cookies.forEach((c) =>
          setCookie(ctx, c.name, c.value, {
            path: c.path,
            secure: c.secure,
            httpOnly: c.httpOnly,
            expires: c.expires,
          })
        )

        return isJson ? res.json() : res.text()
      })
      .then(res => {
        return {
          data: res,
          err: null,
        }
      })
      .catch(err => {
        return {
          data: null,
          status: err.status,
          err: err.data,
        }
      }));
  if(timeout && controller) {
    const timer = setTimeout(() => controller.abort(), timeout);
    return promise.finally(() => clearTimeout(timer));
  }
  return promise;
}

export default request
