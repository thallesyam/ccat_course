import ZipCode from "../entity/ZipCode"

export default interface ZipCodeRepository {
  save(zipCode: ZipCode): Promise<void>
  getByCode(code: string): Promise<ZipCode>
}