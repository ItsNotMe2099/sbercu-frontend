import { RESET, SUBMIT } from "const";

export const clickOnSubmit = (payload) => ({
  type: SUBMIT,
  payload
})

export const resetState = () => ({
  type: RESET
})
