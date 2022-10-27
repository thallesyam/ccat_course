import Coupon from "../../../domain/entity/Coupon";
import Order from "../../../domain/entity/Order";
import OrderCoupon from "../../../domain/entity/OrderCoupon";
import OrderItem from "../../../domain/entity/OrderItem";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

  constructor (readonly connection: Connection) {}
  

  async save(order: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    const ordersData = await this.connection.query('select * from order whre cpf = $1', [cpf])
    const orders: Order[] = []
    for(const orderData of ordersData) {
      const order = new Order(orderData.cpf, orderData.issue_date, orderData.sequence)
      const [orderItemsData] = await this.connection.query('select * from order_item where id_order = $1', [orderData.id_order])

      for(const orderItemData of orderItemsData) {
        order.orderItems.push(new OrderItem(orderItemData.id_item, parseFloat(orderItemData.price), orderItemData.quantity))
      }

      if(orderData.coupon) {
        order.coupon = new OrderCoupon(orderData.coupon_code, orderData.coupon_percentage)
      }

      order.freight = parseFloat(orderData.freight)
      orders.push(order)
    }

    return orders
  }

  async count(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  
}