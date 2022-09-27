export class Cpf {

  constructor(
    readonly cpf: string
  ) {
    if(!this.cpf) throw new Error('Cpf not found')
    if(!this.isValidLength()) throw new Error('Invalid Cpf')

    this.cpf = this.formatCpf()
  }

  getCpf() {
    return this.cpf
  }

  cpfValidator () {
    if(this.isInvalidFormat()) throw new Error('Invalid Cpf')

    let cpfSumFirstCharacter = 0, cpfSumSecondCharacter = 0;  
    for (let digit = 1; digit < this.cpf.length - 1; digit++) {  
        let singleCpfBaseDigit = Number(this.cpf.substring(digit -1, digit));  							
        cpfSumFirstCharacter = cpfSumFirstCharacter + ( 11 - digit ) * singleCpfBaseDigit;  
        cpfSumSecondCharacter = cpfSumSecondCharacter + ( 12 - digit ) * singleCpfBaseDigit;  
    };  
    const firstDigit = this.calcDigitOfCpf(cpfSumFirstCharacter % 11);
    const secondDigitCalc = cpfSumSecondCharacter + 2 * firstDigit;  
    const secondDigit = this.calcDigitOfCpf(secondDigitCalc % 11)
    const originalDigitsToValidate = this.cpf.substring(this.cpf.length-2, this.cpf.length);  
    const validCpfDigits = `${firstDigit}${secondDigit}`
    return originalDigitsToValidate === validCpfDigits;
  }

  formatCpf() {
    const formatedCpf = this.cpf
    .replaceAll('.','')
    .replaceAll('-','')
    .replaceAll(" ","")

    return formatedCpf
  }

  isValidLength() {
    return this.cpf.length >= 11 && this.cpf.length <= 14
  }

  isInvalidFormat() {
    return this.formatCpf().split("").every(digit => digit === this.cpf[0])
  }

  calcDigitOfCpf(divisionRest: number) {
    return divisionRest < 2 ? 0 : 11 - divisionRest;  
  }

}