import { IRequestData, IResponse } from 'types'

function request(requestData: IRequestData): Promise<IResponse> {
  const { url, method, data, token, host } = requestData
  const defaultHost = `${process.env.REACT_APP_API_URL || 'https://dev.sbercu.firelabs.ru'}`
console.log(`Bearer ${token}` )
  return (
    fetch(`${host || defaultHost}${url}`, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
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
