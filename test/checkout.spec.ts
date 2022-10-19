import Checkout from "../src/application/Checkout"
import GetOrdersByCpf from "../src/application/GetOrdersByCpf"
import Coupon from "../src/domain/entity/Coupon"
import Dimension from "../src/domain/entity/Dimension"
import Item from "../src/domain/entity/Item"
import CouponRepositoryMemory from "../src/infra/repository/CouponRepositoryMemory"
import ItemRepositoryMemory from "../src/infra/repository/ItemRepositoryMemory"
import OrderRepositoryMemory from "../src/infra/repository/OrderRepositoryMemory"

test('Deve fazer o pedido', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  const input = {
    cpf: '489.502.368-00',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ]
  }
  await checkout.execute(input)
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute('489.502.368-00')
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(7020)
})

test('Deve fazer o pedido com frete', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra', new Dimension(100, 30, 10, 3)))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  const input = {
    cpf: '489.502.368-00',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ]
  }
  await checkout.execute(input)
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute('489.502.368-00')
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(7050)
})

test('Deve fazer o pedido com desconto sem expirar', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20))
  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  const input = {
    cpf: '489.502.368-00',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ],
    coupon: "VALE20"
  }
  await checkout.execute(input)
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute('489.502.368-00')
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(5616)
})

test('Deve fazer o pedido com desconto expirado', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-01T10:00:00')))
  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  const input = {
    cpf: '489.502.368-00',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ],
    coupon: "VALE20",
    date: new Date('2022-03-01T10:00:00')
  }
  await checkout.execute(input)
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute('489.502.368-00')
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(7020)
})

test('Deve fazer o pedido com desconto válido', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20, new Date('2022-03-01T10:00:00')))
  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  const input = {
    cpf: '489.502.368-00',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ],
    coupon: "VALE20",
    date: new Date('2021-03-01T10:00:00')
  }
  await checkout.execute(input)
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute('489.502.368-00')
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(5616)
})

