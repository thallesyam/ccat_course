import axios from 'axios'

test('Deve testar o preview pela API', async () => {
  const input = {
    cpf: '48950236800',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ]
  }

  const response = await axios.post('http://localhost:3000/preview', input)
  const preview = response.data
  expect(preview.total).toBe(6270)
})

test('Deve testar o preview com desconto pela API', async () => {
  const input = {
    cpf: '48950236800',
    orderItems: [
      { idItem: 1, quantity: 1},
      { idItem: 2, quantity: 1},
      { idItem: 3, quantity: 1},
    ],
    coupon: "VALE20"
  }

  const response = await axios.post('http://localhost:3000/preview', input)
  const preview = response.data
  expect(preview.total).toBe(5064)
})

test('Deve testar o simulateFreight pela API', async () => {
  const input = {
    cpf: '48950236800',
    orderItems: [
      { idItem: 1, quantity: 1},
    ],
    coupon: "VALE20"
  }

  const response = await axios.post('http://localhost:3000/simulateFreight', input)
  const freight = response.data
  expect(freight).toBe(30)
})