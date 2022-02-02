import parsePhoneNumber, {isPossiblePhoneNumber} from 'libphonenumber-js'
export function required(value: string | number) {
  const val = value && typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value;
  return val || typeof val === 'number' ? undefined : 'Обязательное поле'
}

export function email(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неверный формат email'
    : undefined
}

export function passwordsMatch(value: string, allValues: any) {
  console.log("passwordsMatch", value, allValues)
  return value !== allValues.new_password ? 'Пароли не совпадают' : undefined
}

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minL = minLength(8)
export function phone(value: string) {
  console.log("ValidPhone", value)
  return value && !isPossiblePhoneNumber(`${value?.includes('+') ? value : `+${value}`}`) ? 'Неверный формат телефона' : undefined;
}


export function speakerPriceFieldRequired(value: string, allValues: any) {
  console.log("passwordsMatch", value, allValues)
  return !value && allValues.price && allValues.price  > 0 ? 'Обязательное поле' : undefined
}