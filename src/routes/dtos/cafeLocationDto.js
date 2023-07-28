export class CafeLocationDto {
  static Request = class{
    constructor(req) {
      this.userLat = req.userLat;
      this.userLng = req.userLng;
      this.distance = req.distance;
    }
  }
  static Response = class {
    constructor(cafe) {
      this.uuid = cafe.uuid;
      this.address = cafe.address;
      this.placeName = cafe.placeName;
    }
  }
}
