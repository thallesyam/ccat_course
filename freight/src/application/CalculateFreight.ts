import DistanceCalculator from "../domain/entity/DistanceCalculator";
import FreightCalculator from "../domain/entity/FreightCalculator";
import ZipCodeRepository from "../domain/repository/ZipCodeRepository";

export default class CalculateFreight {
  constructor(
    readonly zipCodeRepository: ZipCodeRepository
  ){}

  async execute(input: Input): Promise<number> {
    let freight = 0
    let distance
    if(input.from && input.to) {
      const from = await this.zipCodeRepository.getByCode(input.from)
      const to = await this.zipCodeRepository.getByCode(input.to)
      distance = DistanceCalculator.calculate(from.coord, to.coord)
    }
    for(const orderItem of input.orderItems) {
      freight += FreightCalculator.calculate(orderItem.volume, orderItem.density, distance) * orderItem.quantity 
    }
    return freight
  }
}

type Input = {
  orderItems: {
    volume: number, 
    density: number, 
    quantity: number
  }[]
  from?: string
  to?: string
}