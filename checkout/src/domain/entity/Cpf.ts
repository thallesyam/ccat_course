export default class Cpf {
  constructor(
    readonly value: string
  ) {
    if(!this.cpfValidator(value)) throw new Error('Invalid Cpf')
  }

  getCpf() {
    return this.value
  }
  
  private cpfValidator (cpf: string) {
    if(!cpf) return false
    cpf = this.formatCpf(cpf)
    if(!this.isValidLength(cpf)) throw new Error('Invalid Cpf')
    if(this.hasAllDigitsEqual(cpf)) throw new Error('Invalid Cpf')
    const firstDigit = this.calculateDigit(cpf, 10);
    const secondDigit = this.calculateDigit(cpf, 11);
    const originalDigitsToValidate = this.extractDigit(cpf)  
    const validCpfDigits = `${firstDigit}${secondDigit}`
    return originalDigitsToValidate === validCpfDigits;
  }

  private formatCpf(cpf: string) {
    return cpf.replace(/\D/g, "")
  }

  private isValidLength(cpf: string) {
    return cpf.length === 11
  }

  private extractDigit(cpf: string) {
    return cpf.slice(9)
  }

  private hasAllDigitsEqual(cpf: string) {
    return cpf.split("").every(digit => digit === cpf[0])
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0
    for(const digit of cpf) {
      if(factor > 1) total += Number(digit) * factor--
    }
  
    const rest = total % 11
  
    return rest < 2 ? 0 : 11 - rest
  }
}