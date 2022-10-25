import Order from "../domain/entity/Order"
import RepositoryFactory from "../domain/factory/repository-factory"
import ItemRepository from "../domain/repository/ItemRepository"
import OrderRepository from "../domain/repository/OrderRepository"
import CouponRepository from "../domain/repository/CouponRepository"
export default class Checkout {
  itemRepository: ItemRepository
  orderRepository: OrderRepository
  couponRepository: CouponRepository

  constructor(
    readonly repositoryFactory: RepositoryFactory
  ) {
    this.itemRepository = repositoryFactory.createItemRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
  }

  async execute(input: Input): Promise<void> {
    const nextSequence = await this.orderRepository.count() + 1
    const order = new Order(input.cpf, input.date, nextSequence)
    for(const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }
    if(input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon)
      if(coupon) order.addCoupon(coupon)
    }
    
    await this.orderRepository.save(order)
  }
}


type Input = {
  cpf: string
  orderItems: {
    idItem: number,
    quantity: number
  }[]
  coupon?: string
  date?: Date
}
