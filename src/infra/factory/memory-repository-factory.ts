import RepositoryFactory from "../../domain/factory/repository-factory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import CouponRepositoryMemory from "../repository/CouponRepositoryMemory";
import ItemRepositoryMemory from "../repository/ItemRepositoryMemory";
import OrderRepositoryMemory from "../repository/OrderRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {
  itemRepository?: ItemRepository
  couponRepository?: CouponRepository
  orderRepository?: OrderRepository

  createCouponRepository(): CouponRepository {
    if(!this.couponRepository) {
      this.couponRepository = new CouponRepositoryMemory()
    }
    return this.couponRepository
  }
  
  createItemRepository(): ItemRepository {
    if(!this.itemRepository) {
      this.itemRepository = new ItemRepositoryMemory()
    }
    return this.itemRepository
  }
  
  createOrderRepository(): OrderRepository {
    if(!this.orderRepository) {
      this.orderRepository = new OrderRepositoryMemory()
    }
    return this.orderRepository
  }
}