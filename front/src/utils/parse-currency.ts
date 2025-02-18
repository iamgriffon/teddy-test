export const parseCurrency = (value: string): number => {
  const parts = value.replace('R$', '').split(',')
  const integerPart = (parts[0] || '0').replace(/\./g, '')
  const decimalPart = (parts[1] || '').padEnd(2, '0').slice(0, 2)
  console.log({
    input: value,
    integerPart,
    decimalPart,
    output: parseInt(integerPart + decimalPart, 10)
  })
  return parseInt(integerPart + decimalPart, 10)
}
