export default class Coupon {
  constructor(readonly code: string, readonly percentage: number, readonly expireDate?: Date){}

  calculateDiscount(total: number, now: Date = new Date()) {
    if(this.expireDate && this.expireDate.getTime() < now.getTime()) {
      return 0
    }
    return (total * this.percentage)/100
  }
}