import Checkout from "./application/Checkout"
import GetOrdersByCpf from "./application/GetOrdersByCpf"
import Preview from "./application/Preview"
import { SimulateFreight } from "./application/SimulateFreight"
import Coord from "./domain/entity/Coord"
import Coupon from "./domain/entity/Coupon"
import Dimension from "./domain/entity/Dimension"
import Item from "./domain/entity/Item"
import ZipCode from "./domain/entity/ZipCode"
import OrderController from "./infra/controller/OrderController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import MemoryRepositoryFactory from "./infra/factory/memory-repository-factory"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import CouponRepositoryMemory from "./infra/repository/CouponRepositoryMemory"
import { CouponRepositoryDatabase } from "./infra/repository/database/CouponRepositoryDatabase"
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase"
import { ZipCodeRepositoryDatabase } from "./infra/repository/database/ZipCodeRepositoryDatabase"
import ItemRepositoryMemory from "./infra/repository/ItemRepositoryMemory"
import OrderRepositoryMemory from "./infra/repository/OrderRepositoryMemory"
import ZipCodeRepositoryMemory from "./infra/repository/ZipCodeRepositoryMemory"

// const itemRepository = new ItemRepositoryMemory()
// itemRepository.save(new Item(1, 1000, 'Guitarra', new Dimension(100, 30, 10, 3)))
// itemRepository.save(new Item(2, 6000, 'Amplificador', new Dimension(50, 50, 50, 20)))
// itemRepository.save(new Item(3, 20, 'Cordas', new Dimension(10, 10, 10, 1)))

// const couponRepository = new CouponRepositoryDatabase(connection) 
// couponRepository.save(new Coupon('VALE20', 20))

const connection = new PgPromiseAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
couponRepository.save(new Coupon('VALE20', 20))
const repositoryFactory = new MemoryRepositoryFactory()
const zipCodeRepository = new ZipCodeRepositoryMemory()
zipCodeRepository.save(new ZipCode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
zipCodeRepository.save(new ZipCode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
const preview = new Preview(itemRepository, couponRepository, zipCodeRepository)
const checkout = new Checkout(repositoryFactory)
const getOrderByCpf = new GetOrdersByCpf(orderRepository)
const simulateFreight = new SimulateFreight(itemRepository, zipCodeRepository)

const httpServer = new ExpressAdapter()
new OrderController(httpServer, preview, checkout, getOrderByCpf, simulateFreight)
httpServer.listen(3000)