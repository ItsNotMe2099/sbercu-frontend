import parsePhoneNumber, {isPossiblePhoneNumber} from 'libphonenumber-js'
export function required(value: string | number) {
  const val = value && typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value;
  return val || typeof val === 'number' ? undefined : 'Обязательное поле'
}
export function tagRequired(value: any) {
  return !value || value?.length ===0 ? 'Выберите хотя бы один тег' : undefined
}
export function speakerServicesRequired(value: any) {
  const filter = value ? value.filter(i => !!i.name) : []
  return filter?.length === 0 ? 'Добавьте услугу' : undefined
}

export function email(value: string) {
  return value?.trim() && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value)
    ? 'Неверный формат email'
    : undefined
}

export function passwordsMatch(value: string, allValues: any) {
  return value !== allValues.new_password ? 'Пароли не совпадают' : undefined
}

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minL = minLength(8)
export function phone(value: string) {
  return value?.trim() && value !== '+7' && !isPossiblePhoneNumber(`${value?.includes('+') ? value : `+${value}`}`) ? 'Неверный формат телефона' : undefined;
}


export function speakerPriceFieldRequired(value: string, allValues: any) {
  return !value && allValues.price && allValues.price  > 0 ? 'Обязательное поле' : undefined
}
export function speakerContactsRequiredEmail(value: string, data: any) {
  if(email(value)){
    return email(value);
  }
  if (!data.speakerContactPhone && !data.speakerContactEmail && !data.agentContactPhone && !data.agentContactEmail) {
    return 'Заполните один из контактов спикера';
  }
}
export function speakerContactsRequiredPhone(value: string, data: any) {
  if(phone(value)){
    return phone(value);
  }
  if (!data.speakerContactPhone && !data.speakerContactEmail && !data.agentContactPhone && !data.agentContactEmail) {
    return 'Заполните один из контактов спикера';
  }
}