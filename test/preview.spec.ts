import Preview from "../src/application/Preview"
import Coupon from "../src/domain/entity/Coupon"
import Item from "../src/domain/entity/Item"
import CouponRepositoryMemory from "../src/infra/repository/CouponRepositoryMemory"
import ItemRepositoryMemory from "../src/infra/repository/ItemRepositoryMemory"

test('Deve simular um pedido', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const couponRepository = new CouponRepositoryMemory()
  const preview = new Preview(itemRepository, couponRepository)
  const input = {
    cpf: '48950236800',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ]
  }
  const total = await preview.execute(input)
  expect(total).toBe(7020)
})

test('Deve simular um pedido com desconto', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20))
  const preview = new Preview(itemRepository, couponRepository)
  const input = {
    cpf: '48950236800',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ],
    coupon: "VALE20"
  }
  const total = await preview.execute(input)
  expect(total).toBe(5616)
})