import Checkout from "./application/Checkout"
import GetOrdersByCpf from "./application/GetOrdersByCpf"
import Preview from "./application/Preview"
import Item from "./domain/entity/Item"
import OrderController from "./infra/controller/OrderController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase"
import ItemRepositoryMemory from "./infra/repository/ItemRepositoryMemory"
import OrderRepositoryMemory from "./infra/repository/OrderRepositoryMemory"

// const itemRepository = new ItemRepositoryMemory()
// itemRepository.save(new Item(1, 1000, 'Guitarra'))
// itemRepository.save(new Item(2, 6000, 'Amplificador'))
// itemRepository.save(new Item(3, 20, 'Cordas'))

const connection = new PgPromiseAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryMemory()
const preview = new Preview(itemRepository)
const checkout = new Checkout(itemRepository, orderRepository)
const getOrderByCpf = new GetOrdersByCpf(orderRepository)

const httpServer = new ExpressAdapter()
new OrderController(httpServer, preview, checkout, getOrderByCpf)
httpServer.listen(3000)