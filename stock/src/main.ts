import ClearStock from "./application/ClearStock"
import DecrementStock from "./application/DecrementStock"
import GetStock from "./application/GetStock"
import RestController from "./infra/controller/RestController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import StockRepositoryDatabase from "./infra/repository/database/stock-repository-database"

const connection = new PgPromiseAdapter()
const stockRepository = new StockRepositoryDatabase(connection)
const decrementStock = new DecrementStock(stockRepository)
const getStock = new GetStock(stockRepository)
const clearStock = new ClearStock(stockRepository);
const httpServer = new ExpressAdapter()
new RestController(httpServer, decrementStock, getStock, clearStock)
httpServer.listen(3003)