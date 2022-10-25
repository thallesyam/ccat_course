import { SimulateFreight } from "../src/application/SimulateFreight"
import Dimension from "../src/domain/entity/Dimension"
import Item from "../src/domain/entity/Item"
import ItemRepositoryMemory from "../src/infra/repository/ItemRepositoryMemory"

test('Deve simular o frete', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra', new Dimension(100, 30, 10, 3)))
  const simulateFreight = new SimulateFreight(itemRepository)
  const input = {
    orderItems: [
      { idItem: 1, quantity: 1},
    ]
  }
  const freight = await simulateFreight.execute(input)
  expect(freight).toBe(30)
})