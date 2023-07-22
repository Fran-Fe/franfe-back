export class CafeDto {
  Response = class {
    constructor(cafe) {
      this.uuid = cafe.uuid;
      this.address = cafe.address;
      this.placeName = cafe.placeName;
    }
  }
}