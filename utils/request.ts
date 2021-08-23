import { IRequestData, IResponse } from 'types'

function request(requestData: IRequestData): Promise<IResponse> {
  const { url, method, data, token, host } = requestData
  const defaultHost = `${process.env.NEXT_PUBLIC_API_URL || 'https://dev.sbercu.firelabs.ru'}`
console.log(`Bearer ${token}`, process.env, process.env.NEXT_PUBLIC_API_URL  )
  const ts = new Date();
  return (
    fetch(`${host || defaultHost}${url}${url.includes('?') ? `&t=${ts}` : `?t=${ts}`}`, {
      method: method || 'GET',
      cache:'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
      },
      body: data ? JSON.stringify(data) : null,
    })
      .then(res => {
        const contentType = res.headers.get('content-type')
        const isJson = contentType && contentType.indexOf('application/json') !== -1

        if (res.status !== 200 && res.status !== 201) {
          console.log('Response status:', res.status)
          return (isJson ? res.json() : res.text()).then((resData: any) => {
            throw {status: res.status, data: resData}
          })
        }

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
      })
  )
}

export default request
