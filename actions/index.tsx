import { RESET, SEND, SUBMIT, SAVE } from "const";

export const clickOnSubmit = (payload) => ({
  type: SUBMIT,
  payload
})

export const clickOnSend = (payload) => ({
  type: SEND,
  payload
})

export const clickOnSave = (payload) => ({
  type: SAVE,
  payload
})

export const resetState = () => ({
  type: RESET
})
