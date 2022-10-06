import Checkout from "../src/application/Checkout"
import GetOrdersByCpf from "../src/application/GetOrdersByCpf"
import Item from "../src/domain/entity/Item"
import ItemRepositoryMemory from "../src/infra/repository/ItemRepositoryMemory"
import OrderRepositoryMemory from "../src/infra/repository/OrderRepositoryMemory"

test('Deve fazer o pedido', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const orderRepository = new OrderRepositoryMemory()
  const checkout = new Checkout(itemRepository, orderRepository)
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