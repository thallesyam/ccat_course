import Preview from "../../src/application/Preview"
import Coord from "../../src/domain/entity/Coord"
import Coupon from "../../src/domain/entity/Coupon"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import ZipCode from "../../src/domain/entity/ZipCode"
import CouponRepositoryMemory from "../../src/infra/repository/CouponRepositoryMemory"
import ItemRepositoryMemory from "../../src/infra/repository/ItemRepositoryMemory"
import ZipCodeRepositoryMemory from "../../src/infra/repository/ZipCodeRepositoryMemory"

let preview: Preview

beforeEach(() => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20))
  const zipCodeRepository = new ZipCodeRepositoryMemory()
  zipCodeRepository.save(new ZipCode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
  zipCodeRepository.save(new ZipCode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
  preview = new Preview(itemRepository, couponRepository, zipCodeRepository)
})

test('Deve simular um pedido', async () => {
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

test('Deve simular um pedido com distância', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra', new Dimension(100, 30, 10, 3)))
  itemRepository.save(new Item(2, 6000, 'Amplificador', new Dimension(50, 50, 50, 20)))
  itemRepository.save(new Item(3, 20, 'Cordas', new Dimension(10, 10, 10, 1)))
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20))
  const zipCodeRepository = new ZipCodeRepositoryMemory()
  zipCodeRepository.save(new ZipCode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
  zipCodeRepository.save(new ZipCode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
  preview = new Preview(itemRepository, couponRepository, zipCodeRepository)
  const input = {
    cpf: '48950236800',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ],
    from: "88015600",
    to: "22060030"
  }
  const total = await preview.execute(input)
  expect(total).toBe(7202.091008941878)
})