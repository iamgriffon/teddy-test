export function maskSalary(value: string) {
  let cleanedValue = value.replace(/[^0-9,]/g, '')
  const commaIndex = cleanedValue.indexOf(',')
  if (commaIndex !== -1) {
    let integerPart = cleanedValue.slice(0, commaIndex)
    if (integerPart === '') {
      integerPart = '0'
    }

    const decimalPart = cleanedValue
      .slice(commaIndex + 1)
      .replace(/,/g, '')
      .slice(0, 2)
    cleanedValue = integerPart + ',' + decimalPart
  }

  return 'R$ ' + cleanedValue
}
