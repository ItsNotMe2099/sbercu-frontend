export function required(value: string | number) {
  return value || typeof value === 'number' ? undefined : 'Обязательное поле'
}

export function email(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
}

export function passwordsMatch(value: string, allValues: any) {
  console.log("passwordsMatch", value, allValues)
  return value !== allValues.new_password ? 'Пароли не совпадают' : undefined
}

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minL = minLength(8)
