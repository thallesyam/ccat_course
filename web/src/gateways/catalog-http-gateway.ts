import Item from "../entities/Item";
import HttpClient from "../infra/http-client";
import CatalogGateway from "./catalog-gateway";

export default class CatalogHttpGateway implements CatalogGateway {
  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string,
  ){}

  async getItems(): Promise<any> {
   const itemsData = await this.httpClient.get(`${this.baseUrl}/items`)
   const items: Item[] = []
   for(const itemData of itemsData) {
    items.push(new Item(itemData.idItem, itemData.description, itemData.price))
   }
   return items
  }
}