import Preview from "../src/application/Preview"
import Item from "../src/domain/entity/Item"
import ItemRepositoryMemory from "../src/infra/repository/ItemRepositoryMemory"

test('Deve simular um pedido', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra'))
  itemRepository.save(new Item(2, 6000, 'Amplificador'))
  itemRepository.save(new Item(3, 20, 'Cordas'))
  const preview = new Preview(itemRepository)
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