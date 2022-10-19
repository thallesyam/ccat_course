import Coupon from "../entity/Coupon";

export default interface CouponRepository {
  getCoupon(code: string): Promise<Coupon | undefined>
  save(coupon: Coupon): Promise<void>
}