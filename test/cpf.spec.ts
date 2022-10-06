import Cpf from "../src/domain/entity/Cpf"

describe('CPF Validator', () => {
  const validsCpfs = [
    '48950236800',
    '198.454.187-08',
    '147.085.437-60'
  ]

  it.each(validsCpfs)("Deve validar o cpf ", (cpf) => {
    const sut = new Cpf(cpf)
    expect(sut).toBeDefined()
  })

  it("Deve tentar validar o cpf com mais de 14 caracteres", () => {
    expect(() => new Cpf('147.085.437-600')).toThrow(new Error('Invalid Cpf'))
  })

  const cpfWithSameDigits = [
    '111.111.111-11',
    '222.222.222-22',
    '333.333.333-33',
  ]

  it.each(cpfWithSameDigits)("Deve tentar validar o cpf com caracteres iguais", (cpf) => {
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid Cpf'))
  })

  it("Deve validar o cpf com letras", () => {
    expect(() => new Cpf('fake')).toThrow(new Error('Invalid Cpf'))
  })
})