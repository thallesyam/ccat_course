import { Checkout } from "../src/Checkout"
import { Cpf } from "../src/Cpf"
import { Product } from "../src/Product"

describe('Checkout', () => {
  it('should add item to list', () => {
    const cpf = new Cpf('48950236800')
    const sut = new Checkout(cpf.cpfValidator())
    sut.addItemToCart(new Product({ description: 'fake-smartphone', price: 101, quantity: 1 }))
    sut.addItemToCart(new Product({ description: 'fake-smarttv', price: 109, quantity: 1 }))
    sut.addItemToCart(new Product({ description: 'fake-freezer', price: 102, quantity: 1 }))
    expect(sut.checkoutItems).toHaveLength(3)
  })  

  it('should throw error if cpf is not valid', () => {
    const cpf = false

    expect(() => new Checkout(cpf)).toThrow(new Error('Invalid cpf'))
  }) 

  it('should return correctly total value', () => {
    const cpf = new Cpf('48950236800')
    const sut = new Checkout(cpf.cpfValidator())
    sut.addItemToCart(new Product({ description: 'fake-smartphone', price: 101, quantity: 2 }))
    sut.addItemToCart(new Product({ description: 'fake-smarttv', price: 109, quantity: 1 }))
    sut.addItemToCart(new Product({ description: 'fake-freezer', price: 102, quantity: 1 }))
    expect(sut.checkoutTotalPrice()).toEqual(413)
  })

  it('should return correctly total value', () => {
    const cpf = new Cpf('48950236800')
    const sut = new Checkout(cpf.cpfValidator())
    sut.addItemToCart(new Product({ description: 'fake-smartphone', price: 101, quantity: 2 }))
    sut.addItemToCart(new Product({ description: 'fake-smarttv', price: 109, quantity: 1 }))
    sut.addItemToCart(new Product({ description: 'fake-freezer', price: 102, quantity: 1 }))
    expect(sut.applyDiscount(10)).toEqual(371.7)
  })

})