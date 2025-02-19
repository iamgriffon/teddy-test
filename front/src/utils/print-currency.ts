export const printCurrency = (value: number = 0): string => {
  const amountInReais = value / 100
  return amountInReais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
