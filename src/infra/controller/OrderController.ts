import Checkout from "../../application/Checkout";
import GetOrdersByCpf from "../../application/GetOrdersByCpf";
import Preview from "../../application/Preview";
import HttpServer from "../http/HttpServer";

export default class OrderController {
  constructor(
    readonly httpServer: HttpServer,
    readonly preview: Preview,
    readonly checkout: Checkout,
    readonly getOrderByCpf: GetOrdersByCpf,

  ){
    httpServer.on("post", '/preview', async (params: any, body: any) => {
      const total = await preview.execute(body)
      return { total }
    })
    
    httpServer.on("post", '/checkout', async (params: any, body: any) => {
      await checkout.execute(body)
      return
    })
    
    httpServer.on("get", '/orders/:cpf', async (params: any, body: any) => {
      const orders = await getOrderByCpf.execute(params.cpf)
      return { orders }
    })
  }
}