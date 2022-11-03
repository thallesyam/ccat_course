import Coord from '../../../domain/entity/Coord';
import ZipCode from '../../../domain/entity/ZipCode';
import ZipCodeRepository from '../../../domain/repository/ZipCodeRepository';
import Connection from '../../database/Connection'

export class ZipCodeRepositoryDatabase implements ZipCodeRepository {
  constructor (readonly connection: Connection) {}

  async save(zipCode: ZipCode): Promise<void> {
    throw new Error('Method not implemented.')
  }
  
  async getByCode(code: string): Promise<ZipCode> {
		const [zipCodeData] = await this.connection.query("select * from zipcode where code = $1", [code]);
    if(!zipCodeData) throw new Error('Zipcode not found')
    const zipCode = new ZipCode(zipCodeData.code, zipCodeData.street, zipCodeData.neighborhood, new Coord(parseFloat(zipCodeData.lat),  parseFloat(zipCodeData.long)))
    return zipCode
  }
}