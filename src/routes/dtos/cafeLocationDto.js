export class CafeLocationDto {
  static Request = class{
    constructor(req) {
      this.userLng = req.userLng;
      this.userLat = req.userLat;
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
