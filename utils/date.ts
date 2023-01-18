export function isToday(_date: Date | string | undefined) {
  if (!_date) {
    return false
  }

  const today = new Date()
  const date = typeof _date === 'object' ? _date : new Date(_date)

  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  )
}
