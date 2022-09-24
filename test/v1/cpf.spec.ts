import { validate } from "../../src/v1/cpf"

describe('CPF Validator', () => {
  it("should return false if function receive null parameter", () => {
    const sut = validate(null)
    expect(sut).toBeFalsy()
  })

  it("should return false if function receive undefined parameter", () => {
    const sut = validate(undefined)
    expect(sut).toBeFalsy()
  })
  
  it("should return false if function receive invalid parameter", () => {
    const sut = validate('fake')
    expect(sut).toBeFalsy()
  })

  it("should return false if function receive invalid cpf", () => {
    const sut = validate('48950236812')
    expect(sut).toBeFalsy()
  })

  it("should return error on invalid format", () => {
    const sut = validate(48950236800)
    expect(sut).toBeFalsy()
  })

  it("should return error on invalid format", () => {
    const sut = validate('44444444444')
    expect(sut).toBeFalsy()
  })

  it("should return true if function receive valid cpf", () => {
    const sut = validate('48950236800')
    expect(sut).toBeTruthy()
  })


})