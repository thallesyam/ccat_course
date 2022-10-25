import OrderRepository from "../domain/repository/OrderRepository"

export default class GetOrdersByCpf {
  constructor(
    readonly orderRepository: OrderRepository
  ) {}

  async execute(cpf: string): Promise<Output[]> {
    const output = []
    const orders = await this.orderRepository.getByCpf(cpf)
    for(const order of orders) {
      output.push({ total: order.getTotal(), code: order.getCode() })
    }
    return output
  }
}


type Output = {
  total: number
  code: string
}
