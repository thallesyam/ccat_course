import Coupon from "../src/domain/entity/Coupon"
import Dimension from "../src/domain/entity/Dimension"
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

test('Deve criar um pedido com 3 itens com cupom de desconto sem expiração', () => {
  const order = new Order('198.454.187-08')
  order.addItem(new Item(1, 1000, 'Guitarra'), 1)
  order.addItem(new Item(2, 5000, 'Amplificador'), 1)
  order.addItem(new Item(3, 30, 'Cabo'), 3)
  order.addCoupon(new Coupon("VALE20", 20))
  expect(order.getTotal()).toBe(4872)
})

test('Deve criar um pedido com 3 itens com cupom de desconto válido', () => {
  const order = new Order('198.454.187-08', new Date('2021-03-01T10:00:00'))
  order.addItem(new Item(1, 1000, 'Guitarra'), 1)
  order.addItem(new Item(2, 5000, 'Amplificador'), 1)
  order.addItem(new Item(3, 30, 'Cabo'), 3)
  order.addCoupon(new Coupon("VALE20", 20, new Date('2022-03-01T10:00:00')))
  expect(order.getTotal()).toBe(4872)
})

test('Deve criar um pedido com 3 itens com cupom de desconto expirado', () => {
  const order = new Order('198.454.187-08', new Date('2022-03-01T10:00:00'))
  order.addItem(new Item(1, 1000, 'Guitarra'), 1)
  order.addItem(new Item(2, 5000, 'Amplificador'), 1)
  order.addItem(new Item(3, 30, 'Cabo'), 3)
  order.addCoupon(new Coupon("VALE20", 20, new Date('2021-03-01T10:00:00')))
  expect(order.getTotal()).toBe(6090)
})

test('Não deve criar um pedido com quantidade negativa', () => {
  const order = new Order('317.153.361-86')
  expect(() => order.addItem(new Item(1, 1000, 'Guitarra'), -1)).toThrow(new Error('Invalid quantity'))
})

test('Não deve criar item duplicado', () => {
  const order = new Order('317.153.361-86')
  order.addItem(new Item(1, 1000, 'Guitarra'), 1)
  expect(() => order.addItem(new Item(1, 1000, 'Guitarra'), 1)).toThrow(new Error('Duplicated item'))
})

test('Deve criar um pedido com fete', () => {
  const order = new Order('198.454.187-08')
  order.addItem(new Item(1, 1000, 'Guitarra', new Dimension(100, 30, 10, 3)), 1)
  expect(order.getTotal()).toBe(1030)
})
