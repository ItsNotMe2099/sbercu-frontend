import { call, put, select } from 'redux-saga/effects'

import request from './request'
import { IRequestData, IResponse } from 'types'
import cookie from "js-cookie";
function* requestGen(options: IRequestData | string): Generator<any, IResponse> {
  const token = cookie.get('token') as string
  const optionsObj = typeof options === 'string' ? { url: options } : options
  const res: any = yield call(request, { ...optionsObj, token })

  if (res.err && res.err.Code === 'TOKEN_EXPIRED') {
  //  yield put(logout())
  }

  return res
}

export default requestGen
