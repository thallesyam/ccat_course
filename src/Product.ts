type ProductModel = {
  description?: string,
  price?: number,
  quantity?: number
}

export class Product {
  constructor(
    private product: ProductModel
  ){
    if(!product.description || !product.price || !product.quantity) throw new Error('Invalid Format')
    if(product.price < 0) throw new Error('Invalid price')
    if(product.quantity < 0) throw new Error('Invalid quantity')
  }

  getProduct() {
    return this.product
  }
}