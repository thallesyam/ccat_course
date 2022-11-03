import GetItem from "../../application/GetItem";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getItem: GetItem
  ){ 
    httpServer.on("get", '/items/:idItem', async (params: any, body: any) => {
      const item = await getItem.execute(params.idItem)
      return item
    })
  }
}