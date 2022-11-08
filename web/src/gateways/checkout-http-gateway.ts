import HttpClient from "../infra/http-client";
import CheckoutGateway from "./checkout-gateway";

export default class CheckoutHttpGateway implements CheckoutGateway {
  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string,

  ){}

  async checkout(order: any): Promise<any> {
    await this.httpClient.post(`${this.baseUrl}/checkout`, order)
  }

  async getOrdersByCpf(cpf: string): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/orders/${cpf}`)
  }

  async preview(order: any): Promise<any> {
    const preview = await this.httpClient.post(`${this.baseUrl}/preview`, order)
    return preview.total
     
  }

  async validateCoupon(code: string): Promise<boolean> {
    return this.httpClient.post(`${this.baseUrl}/validateCoupon`, { code })
  }
}