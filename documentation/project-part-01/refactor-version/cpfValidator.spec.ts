import { cpfValidator } from './cpf'

describe('CPF Validator', () => {
  it("should return false if function receive invalid parameter", () => {
    expect(() => cpfValidator('fake')).toThrow(new Error('Invalid Cpf'))
  })

  it("should return error on invalid format", () => {
    expect(() => cpfValidator('44444444444')).toThrow(new Error('Invalid Cpf'))
  })

  it("should return false if function receive invalid cpf", () => {
    const sut = cpfValidator('48950236812')
    expect(sut).toBeFalsy()
  })

  it("should return true if function receive valid cpf", () => {
    const sut = cpfValidator('48950236800')
    expect(sut).toBeTruthy()
  })

  it("should return true if function receive valid cpf", () => {
    const sut = cpfValidator('186.301.758-50')
    expect(sut).toBeTruthy()
  })

  it("should return true if function receive valid cpf", () => {
    const sut = cpfValidator('489.502-368 00')
    expect(sut).toBeTruthy()
  })
})