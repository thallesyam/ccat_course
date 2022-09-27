import { Product } from "../src/Product"

describe('Product', () => {
  it('should create a new product with correct params', () => {
    const product = { description: 'fake-desc', price: 10, quantity: 1 }
    const sut = new Product(product)

    expect(sut.getProduct()).toEqual(product)
  })

  it('should throw error if incorrect price', () => {
    expect(() => new Product( { description: 'fake-desc', price: -1, quantity: 1 })).toThrow(new Error('Invalid price'))
  })

  it('should throw error if incorrect quantity', () => {
    expect(() => new Product( { description: 'fake-desc', price: 10, quantity: -1 })).toThrow(new Error('Invalid quantity'))
  })

  it('should throw error if incorrect quantity', () => {
    expect(() => new Product({} as any)).toThrow(new Error('Invalid Format'))
  })
})