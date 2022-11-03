import CalculateFreight from "./application/CalculateFreight"
import RestController from "./infra/controller/RestController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import { ZipCodeRepositoryDatabase } from "./infra/repository/database/ZipCodeRepositoryDatabase"

const connection = new PgPromiseAdapter()
const zipCodeRepository = new ZipCodeRepositoryDatabase(connection)
const calculateFreight = new CalculateFreight(zipCodeRepository)

const httpServer = new ExpressAdapter()
new RestController(httpServer, calculateFreight)
httpServer.listen(3001)