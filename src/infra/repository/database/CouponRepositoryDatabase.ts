import Coupon from '../../../domain/entity/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';
import Connection from '../../database/Connection'

export class CouponRepositoryDatabase implements CouponRepository {
  constructor (readonly connection: Connection) {}

  async getCoupon(code: string): Promise<Coupon | undefined> {
		const [couponData] = await this.connection.query("select * from coupon where code = $1", [code]);
    if(!couponData) return 
    return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date)
  }

  async save(coupon: Coupon): Promise<void> {
		await this.connection.query("insert into coupon (code, percentage) values ($1, $2);", [coupon.code, coupon.percentage]);
    return
  }
}