import Checkout from "../../src/application/Checkout"
import GetOrdersByCpf from "../../src/application/GetOrdersByCpf"
import Coupon from "../../src/domain/entity/Coupon"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import MemoryRepositoryFactory from "../../src/infra/factory/memory-repository-factory"
import CouponRepositoryMemory from "../../src/infra/repository/CouponRepositoryMemory"
import ItemRepositoryMemory from "../../src/infra/repository/ItemRepositoryMemory"
import OrderRepositoryMemory from "../../src/infra/repository/OrderRepositoryMemory"

test('Deve fazer o pedido', async () => {
  const repositoryFactory = new MemoryRepositoryFactory()
  const orderRepository = repositoryFactory.createOrderRepository()
  const itemRepository = repositoryFactory.createItemRepository()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const checkout = new Checkout(repositoryFactory)
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
  const repositoryFactory = new MemoryRepositoryFactory()
  const orderRepository = repositoryFactory.createOrderRepository()
  const itemRepository = repositoryFactory.createItemRepository()
  itemRepository.save(new Item(1, 1000, 'Guitarra', new Dimension(100, 30, 10, 3)))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const checkout = new Checkout(repositoryFactory)
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
  const repositoryFactory = new MemoryRepositoryFactory()
  const orderRepository = repositoryFactory.createOrderRepository()
  const itemRepository = repositoryFactory.createItemRepository()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const couponRepository = repositoryFactory.createCouponRepository()
  couponRepository.save(new Coupon('VALE20', 20))
  const checkout = new Checkout(repositoryFactory)
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
  const repositoryFactory = new MemoryRepositoryFactory()
  const orderRepository = repositoryFactory.createOrderRepository()
  const itemRepository = repositoryFactory.createItemRepository()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const couponRepository = repositoryFactory.createCouponRepository()
  couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-01T10:00:00')))
  const checkout = new Checkout(repositoryFactory)
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
  const repositoryFactory = new MemoryRepositoryFactory()
  const orderRepository = repositoryFactory.createOrderRepository()
  const itemRepository = repositoryFactory.createItemRepository()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const couponRepository = repositoryFactory.createCouponRepository()
  couponRepository.save(new Coupon('VALE20', 20, new Date('2022-03-01T10:00:00')))
  const checkout = new Checkout(repositoryFactory)
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

test('Deve fazer o pedido com código', async () => {
  const repositoryFactory = new MemoryRepositoryFactory()
  const orderRepository = repositoryFactory.createOrderRepository()
  const itemRepository = repositoryFactory.createItemRepository()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  const checkout = new Checkout(repositoryFactory)
  const input = {
    cpf: '489.502.368-00',
    orderItems: [
      { idItem: 1, quantity: 1},
    ],
    date: new Date('2021-03-01T10:00:00')
  }
  await checkout.execute(input)
  await checkout.execute(input)
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrdersByCpf.execute('489.502.368-00')
  expect(orders).toHaveLength(2)
  expect(orders[0].code).toBe('202100000001')
  expect(orders[1].code).toBe('202100000002')
})

