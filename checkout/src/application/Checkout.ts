import Order from "../domain/entity/Order"
import RepositoryFactory from "../domain/factory/repository-factory"
import OrderRepository from "../domain/repository/OrderRepository"
import CouponRepository from "../domain/repository/CouponRepository"
import GetItemGateway from "./gateway/get-item-gateway"
import CalculateFreightGateway from "./gateway/calculate-freight-gateway"
import DecrementStockGateway from "./gateway/decrement-stock-gateway"
export default class Checkout {
  orderRepository: OrderRepository
  couponRepository: CouponRepository

  constructor(
		  repositoryFactory: RepositoryFactory,
		  readonly getItemGateway: GetItemGateway,
		  readonly calculateFreightGateway: CalculateFreightGateway,
		  readonly decrementStockGateway: DecrementStockGateway
    ) {
      this.couponRepository = repositoryFactory.createCouponRepository();
      this.orderRepository = repositoryFactory.createOrderRepository();
  }

	async execute (input: Input): Promise<void> {
		const nextSequence = (await this.orderRepository.count()) + 1;
		const order = new Order(input.cpf, input.date, nextSequence);
		const orderItems = [];
		for (const orderItem of input.orderItems) {
			const item = await this.getItemGateway.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
			orderItems.push({ volume: item.getVolume(), density: item.getDensity(), quantity: orderItem.quantity });
      await this.decrementStockGateway.execute(orderItem.idItem, orderItem.quantity)
		}
		order.freight = await this.calculateFreightGateway.calculate(orderItems, input.from, input.to);
		if (input.coupon) {
			const coupon = await this.couponRepository.getCoupon(input.coupon);
			if (coupon) order.addCoupon(coupon);
		}
		await this.orderRepository.save(order);
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
  from?: string,
	to?: string
}
