import FreightCalculator from "../../src/domain/entity/FreightCalculator"

test('Deve calcular o frete', () => {
  const freight = FreightCalculator.calculate(0.03, 100)
  expect(freight).toBe(30)
})

test('Deve calcular o frete minimo', () => {
  const freight = FreightCalculator.calculate(0.001, 900)
  expect(freight).toBe(10)
})

test('Deve calcular o frete com distância', () => {
  const distance = 748.2217780081631
  const freight = FreightCalculator.calculate(0.03, 100, distance)
  expect(freight).toBe(22.446653340244893)
})