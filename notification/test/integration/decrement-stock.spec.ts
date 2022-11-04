import DecrementStock from "../../src/application/DecrementStock"
import GetStock from "../../src/application/GetStock"
import StockEntry from "../../src/domain/entity/StockEntry"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import StockRepositoryDatabase from "../../src/infra/repository/database/stock-repository-database"

test("Deve decrementar o estoque", async function () {
	const connection = new PgPromiseAdapter();
	const stockRepository = new StockRepositoryDatabase(connection);
	await stockRepository.clear();
	await stockRepository.save(new StockEntry(1, "in", 20));
	const decrementStock = new DecrementStock(stockRepository);
	const input = {
		idItem: 1,
		quantity: 10
	};
	await decrementStock.execute(input);
	const getStock = new GetStock(stockRepository);
	const output = await getStock.execute(1);
	expect(output.total).toBe(10);
	await connection.close();
});