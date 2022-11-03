import Coord from "./Coord";

export default class ZipCode {
  constructor(
    readonly code: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly coord: Coord
  ){}
}