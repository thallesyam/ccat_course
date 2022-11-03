import ClearStock from "../../application/ClearStock";
import DecrementStock from "../../application/DecrementStock";
import GetStock from "../../application/GetStock";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly decrementStock: DecrementStock,
    readonly getStock: GetStock,
		readonly clearStock: ClearStock
  ){
    httpServer.on("post", '/decrementStock', async (params: any, body: any) => {
      await decrementStock.execute(body)
    })

    httpServer.on("post", '/calculateStock/:idItem', async (params: any, body: any) => {
      const output = await getStock.execute(params.idItem)
      return output
    })

		httpServer.on("post", "/clearStock", async function (params: any, body: any) {
			await clearStock.execute();
		});
  }
}