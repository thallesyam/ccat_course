import Dimension from "../src/domain/entity/Dimension"
import FreightCalculator from "../src/domain/entity/FreightCalculator"
import Item from "../src/domain/entity/Item"

test('Deve calcular o frete', () => {
  const item = new Item(1, 1000, 'Guitarra', new Dimension(100, 30, 10, 3))
  const freight = FreightCalculator.calculate(item)
  expect(freight).toBe(30)
})

test('Deve calcular o frete minimo', () => {
  const item = new Item(3, 30, 'Cabo', new Dimension(1, 1, 1, 0.9))
  const freight = FreightCalculator.calculate(item)
  expect(freight).toBe(10)
})