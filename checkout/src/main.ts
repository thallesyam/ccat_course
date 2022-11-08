import Checkout from "./application/Checkout"
import GetOrdersByCpf from "./application/GetOrdersByCpf"
import Preview from "./application/Preview"
import RestController from "./infra/controller/RestController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import GetItemHttpGateway from "./infra/gateway/get-item-http-gateway"
import CalculateFreightHttpGateway from "./infra/gateway/calculate-freight-http-gateway"
import DecrementStockHttpGateway from "./infra/gateway/decrement-stock-http-gateway"
import RabbitMqAdapter from "./infra/queue/RabbitMqAdapter"
import ValidateCoupon from "./application/ValidateCoupon"
import DatabaseRepositoryFactory from "./infra/factory/database-repository-factory"
import QueueController from "./infra/controller/QueueController"
import GetOrdersByCpfQuery from "./application/GetOrdersByCpfQuery"

async function init() {
	const connection = new PgPromiseAdapter();
	const repositoryFactory = new DatabaseRepositoryFactory(connection);
	const getItemGateway = new GetItemHttpGateway();
	const calculateFreightGateway = new CalculateFreightHttpGateway();
	const decrementStockGateway = new DecrementStockHttpGateway();
	const preview = new Preview(repositoryFactory.createCouponRepository(), getItemGateway, calculateFreightGateway);
	const queue = new RabbitMqAdapter();
	await queue.connect();
	const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway, decrementStockGateway, queue);
	const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory.createOrderRepository(), getItemGateway);
	const getOrdersByCpfQuery = new GetOrdersByCpfQuery(connection);
	const validateCoupon = new ValidateCoupon(repositoryFactory.createCouponRepository());
	const httpServer = new ExpressAdapter();
	// const httpServer = new HapiHttp();
	new RestController(httpServer, preview, checkout, getOrdersByCpf, getOrdersByCpfQuery, validateCoupon, queue);
	new QueueController(queue, checkout);
	httpServer.listen(3000);
}

init()