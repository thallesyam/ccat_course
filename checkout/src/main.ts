import Checkout from "./application/Checkout"
import GetOrdersByCpf from "./application/GetOrdersByCpf"
import Preview from "./application/Preview"
import SimulateFreight from "./application/SimulateFreight"
import Coord from "./domain/entity/Coord"
import Coupon from "./domain/entity/Coupon"
import ZipCode from "./domain/entity/ZipCode"
import RestController from "./infra/controller/RestController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import MemoryRepositoryFactory from "./infra/factory/memory-repository-factory"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import CouponRepositoryMemory from "./infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase"
import OrderRepositoryMemory from "./infra/repository/memory/OrderRepositoryMemory"
import ZipCodeRepositoryMemory from "./infra/repository/memory/ZipCodeRepositoryMemory"
import GetItemHttpGateway from "./infra/gateway/get-item-http-gateway"
import CalculateFreightHttpGateway from "./infra/gateway/calculate-freight-http-gateway"
import DecrementStockHttpGateway from "./infra/gateway/decrement-stock-http-gateway"

const connection = new PgPromiseAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
couponRepository.save(new Coupon('VALE20', 20))
const repositoryFactory = new MemoryRepositoryFactory()
const zipCodeRepository = new ZipCodeRepositoryMemory()
zipCodeRepository.save(new ZipCode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
zipCodeRepository.save(new ZipCode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
const getItemGateway = new GetItemHttpGateway()
const calculateFreightGateway = new CalculateFreightHttpGateway()
const decrementStockGateway = new DecrementStockHttpGateway()
const preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway)
const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway, decrementStockGateway)
const getOrderByCpf = new GetOrdersByCpf(orderRepository)
const simulateFreight = new SimulateFreight(itemRepository, zipCodeRepository)

const httpServer = new ExpressAdapter()
new RestController(httpServer, preview, checkout, getOrderByCpf, simulateFreight)
httpServer.listen(3004)