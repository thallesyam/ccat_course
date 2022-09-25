function isValidLength(length: number) {
  return length >= 11 && length <= 14
}

function isInvalidFormat(cpf: string[]) {
  return cpf.every(digit => digit === cpf[0])
}

function calcDigitOfCpf(divisionRest: number) {
  return divisionRest < 2 ? 0 : 11 - divisionRest;  
}

export function cpfValidator (cpf: string) {
  if(!cpf) throw new Error('Cpf not found')
  if(!isValidLength(cpf.length)) throw new Error('Invalid Cpf')

  const formatedCpf = cpf
  .replaceAll('.','')
  .replaceAll('-','')
  .replaceAll(" ","")

  if(isInvalidFormat(formatedCpf.split(""))) throw new Error('Invalid Cpf')

  try{  
      let cpfSumFirstCharacter = 0, cpfSumSecondCharacter = 0;  
      for (let digit = 1; digit < formatedCpf.length - 1; digit++) {  
          let singleCpfBaseDigit = Number(formatedCpf.substring(digit -1, digit));  							
          cpfSumFirstCharacter = cpfSumFirstCharacter + ( 11 - digit ) * singleCpfBaseDigit;  
          cpfSumSecondCharacter = cpfSumSecondCharacter + ( 12 - digit ) * singleCpfBaseDigit;  
      };  
      const firstDigit = calcDigitOfCpf(cpfSumFirstCharacter % 11);
      const secondDigitCalc = cpfSumSecondCharacter + 2 * firstDigit;  
      const secondDigit = calcDigitOfCpf(secondDigitCalc % 11)
      const originalDigitsToValidate = formatedCpf.substring(formatedCpf.length-2, formatedCpf.length);  
      const validCpfDigits = `${firstDigit}${secondDigit}`
      return originalDigitsToValidate === validCpfDigits;
  }catch (e){  
     throw new Error('Unexpected error during validation!')
  }  
}
