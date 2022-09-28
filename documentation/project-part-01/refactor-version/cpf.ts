function isValidLength(length: number) {
  return length === 11
}

function hasAllDigitsEqual(cpf: string[]) {
  return cpf.every(digit => digit === cpf[0])
}

function formatCpf(cpf: string) {
  return cpf.replace(/\D/g, "")
}

function extractDigit(cpf: string) {
  return cpf.slice(9)
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0
  for(const digit of cpf) {
    if(factor > 1) total += Number(digit) * factor--
  }
  const rest = total % 11
  return rest < 2 ? 0 : 11 - rest
}

export function cpfValidator (cpf: string) {
  if(!cpf) throw new Error('Cpf not found')
  const formatedCpf = formatCpf(cpf)
  if(!isValidLength(formatedCpf.length)) throw new Error('Invalid Cpf')
  if(hasAllDigitsEqual(formatedCpf.split(""))) throw new Error('Invalid Cpf')
  const firstDigit = calculateDigit(formatedCpf, 10);
  const secondDigit = calculateDigit(formatedCpf, 11);
  const originalDigitsToValidate = extractDigit(formatedCpf)  
  const validCpfDigits = `${firstDigit}${secondDigit}`
  return originalDigitsToValidate === validCpfDigits;
}
