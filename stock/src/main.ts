import ClearStock from "./application/ClearStock"
import DecrementStock from "./application/DecrementStock"
import GetStock from "./application/GetStock"
import QueueController from "./infra/controller/QueueController"
import RestController from "./infra/controller/RestController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import RabbitMqAdapter from "./infra/queue/RabbitMqAdapter"
import StockRepositoryDatabase from "./infra/repository/database/stock-repository-database"

async function init() {
  const connection = new PgPromiseAdapter()
  const stockRepository = new StockRepositoryDatabase(connection)
  const decrementStock = new DecrementStock(stockRepository)
  const getStock = new GetStock(stockRepository)
  const clearStock = new ClearStock(stockRepository);
  const httpServer = new ExpressAdapter()
  new RestController(httpServer, decrementStock, getStock, clearStock)
  const queue = new RabbitMqAdapter()
  await queue.connect()
  new QueueController(queue, decrementStock);
  httpServer.listen(3003)
}

init()