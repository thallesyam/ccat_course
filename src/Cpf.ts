export class Cpf {

  constructor(
    readonly cpf: string
  ) {
    if(!this.cpf) throw new Error('Cpf not found')
    this.cpf = this.formatCpf()
    if(!this.isValidLength()) throw new Error('Invalid Cpf')
  }

  getCpf() {
    return this.cpf
  }

  formatCpf() {
    return this.cpf.replace(/\D/g, "")
  }

  cpfValidator () {
    if(this.hasAllDigitsEqual()) throw new Error('Invalid Cpf')
    const firstDigit = this.calculateDigit(10);
    const secondDigit = this.calculateDigit(11);
    const originalDigitsToValidate = this.extractDigit()  
    const validCpfDigits = `${firstDigit}${secondDigit}`
    return originalDigitsToValidate === validCpfDigits;
  }

  extractDigit() {
    return this.cpf.slice(9)
  }
  
  isValidLength() {
    return this.cpf.length === 11
  }

  hasAllDigitsEqual() {
    return this.cpf.split("").every(digit => digit === this.cpf[0])
  }

  calculateDigit(factor: number) {
    let total = 0
    for(const digit of this.cpf) {
      if(factor > 1) total += Number(digit) * factor--
    }
  
    const rest = total % 11
  
    return rest < 2 ? 0 : 11 - rest
  }
}