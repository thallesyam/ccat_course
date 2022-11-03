import GetItem from "../../src/application/GetItem"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"

test('Deve obter o item', async () => {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 1000, 'Guitarra', new Dimension(100, 30, 10, 3)))
  const getItem = new GetItem(itemRepository)
  const item = await getItem.execute(1)
  expect(item.price).toBe(1000)
})