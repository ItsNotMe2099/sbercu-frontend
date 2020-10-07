export function required(value: string | number) {
  return value || typeof value === 'number' ? undefined : 'Required field'
}

export function email(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
}

export function passwordsMatch(value: string, allValues: any) {
  return value !== allValues.password ? 'Passwords don\'t match' : undefined
}
