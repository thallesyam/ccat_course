import Coupon from "../src/domain/entity/Coupon"
import Item from "../src/domain/entity/Item"
import Order from "../src/domain/entity/Order"


test('Não deve criar um pedido com CPF inválido', () => {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid Cpf'))
})

test('Deve criar um pedido semitens', () => {
  const order = new Order('198.454.187-08')
  expect(order.getTotal()).toBe(0)
})

test('Deve criar um pedido com 3 itens', () => {
  const order = new Order('198.454.187-08')
  order.addItem(new Item(1, 1000, 'Guitarra'), 1)
  order.addItem(new Item(2, 5000, 'Amplificador'), 1)
  order.addItem(new Item(3, 30, 'Cabo'), 3)
  expect(order.getTotal()).toBe(6090)
})

test('Deve criar um pedido com 3 itens com cupom de desconto', () => {
  const order = new Order('198.454.187-08')
  order.addItem(new Item(1, 1000, 'Guitarra'), 1)
  order.addItem(new Item(2, 5000, 'Amplificador'), 1)
  order.addItem(new Item(3, 30, 'Cabo'), 3)
  order.addCoupon(new Coupon("VALE20", 20))
  expect(order.getTotal()).toBe(4872)
})