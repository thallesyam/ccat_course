import { Cpf } from "../src/Cpf"

describe('CPF', () => {
  it("should be return correctly cpf", () => {
    const cpf = '48950236812'
    const sut = new Cpf(cpf)
    expect(sut.getCpf()).toEqual(cpf)
  })

  it("should return error", () => {
    expect(() => new Cpf('')).toThrow(new Error('Cpf not found'))
  })

  it("should be return cpf in correctly format", () => {
    const cpf = '489-502 368.12'
    const sut = new Cpf(cpf)
    expect(sut.formatCpf()).toEqual('48950236812')
  })

  it("should be return true if cpf length is correctly", () => {
    const cpf = '48950236800'
    const sut = new Cpf(cpf)
    expect(sut.isValidLength()).toBeTruthy()
  })

  it("should be return error if cpf length is wrong", () => {
    expect(() => new Cpf('fake')).toThrow(new Error('Invalid Cpf'))
  })

  it("should be return true if cpf contains invalid format", () => {
    const sut = new Cpf('44444444444')
    expect(sut.isInvalidFormat()).toBeTruthy()
  })

  it("should be return false if cpf contains invalid format", () => {
    const sut = new Cpf('48950236800')
    expect(sut.isInvalidFormat()).toBeFalsy()
  })

  it("should be error on invalid format", () => {
    const sut = new Cpf('44444444444')
    expect(() => sut.cpfValidator()).toThrow(new Error('Invalid Cpf'))
  })

  it("should be return correctly digit", () => {
    const sut = new Cpf('48950236800')
    expect(sut.calcDigitOfCpf(1)).toEqual(0)
    expect(sut.calcDigitOfCpf(10)).toEqual(1)
  })

  it("should be false if receive invalid cpf", () => {
    const sut = new Cpf('48950236812')
    expect(sut.cpfValidator()).toBeFalsy()
  })

  it("should be true if receive valid cpf", () => {
    const sut = new Cpf('186.301.758-50')
    expect(sut.cpfValidator()).toBeTruthy()
  })

  it("should be true if receive valid cpf but incorrectly format", () => {
    const sut = new Cpf('489.502-368 00')
    expect(sut.cpfValidator()).toBeTruthy()
  })
})