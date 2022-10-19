import Coupon from "../src/domain/entity/Coupon";

test('Deve criar um cupom de desconto sem expiração', () => {
  const coupon = new Coupon('VALE20', 20)
  const discount = coupon.calculateDiscount(1000)
  expect(discount).toBe(200)
})

test('Deve criar um cupom de desconto não expirado', () => {
  const coupon = new Coupon('VALE20', 20, new Date('2022-03-01T10:00:00'))
  const discount = coupon.calculateDiscount(1000, new Date('2021-03-01T10:00:00'))
  expect(discount).toBe(200)
})

test('Deve tentar criar um cupom de desconto', () => {
  const coupon = new Coupon('VALE20', 20, new Date('2021-03-01T10:00:00'))
  const discount = coupon.calculateDiscount(1000, new Date('2022-03-01T10:00:00'))
  expect(discount).toBe(0)
})