import { Product } from "./Product";

export class Checkout {
  total: number = 0
  checkoutItems: Product[] = []

  constructor(
    private isValidCpf: boolean,
  ){
    if(!this.isValidCpf) throw new Error('Invalid cpf')
  }

  addItemToCart(product: Product) {
    return this.checkoutItems.push(product)
  }

  checkoutTotalPrice() {
    this.checkoutItems.map((product) => {
      this.total += product.getProduct().price * product.getProduct().quantity
    })

    return this.total
  }

  applyDiscount(discount: number) {
    this.checkoutTotalPrice()
    this.total = this.total - (this.total * (discount/100))
    return this.total
  }
}