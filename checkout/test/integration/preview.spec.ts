import CalculateFreightGateway from "../../src/application/gateway/calculate-freight-gateway"
import Preview from "../../src/application/Preview"
import Coupon from "../../src/domain/entity/Coupon"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import GetItemHttpGateway from "../../src/infra/gateway/get-item-http-gateway"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"

let preview: Preview

beforeEach(() => {
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20))
  const calculateFreightGateway: CalculateFreightGateway = {
    async calculate(orderItems, from?, to?) {
      return 202.091008941878
    },
  }
  const getItemGateway = new GetItemHttpGateway()
  preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway)
})

test('Deve simular um pedido', async () => {
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
  expect(total).toBe(6232.091008941878)
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
  expect(total).toBe(5026.091008941878)
})

test('Deve simular um pedido com distância', async () => {
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('VALE20', 20))
  const calculateFreightGateway: CalculateFreightGateway = {
    async calculate(orderItems, from?, to?) {
      return 202.091008941878
    },
  }
  const getItemGateway = new GetItemHttpGateway()

  const preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway)
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
  expect(total).toBe(6232.091008941878)
})