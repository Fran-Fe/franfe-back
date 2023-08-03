export class CafeLocationDto {
  static Request = class {
    constructor(req) {
      this.userLat = Number(req.userLat);
      this.userLng = Number(req.userLng);
      this.distance = req.distance === "" ? Number.MAX_SAFE_INTEGER : Number(req.distance);
    }
  }
  static Response = class {
    constructor(cafe, thumbnails, hashTags, distance, reviewCount = 0,) {
      this.uuid = cafe.uuid;
      this.address = cafe.address;
      this.placeName = cafe.placeName;
      this.rating = cafe.rating;
      this.reviewCount = reviewCount;
      this.thumbnails = thumbnails;
      this.hashTags = hashTags;
      this.distance = distance;

    }
  }
  static Thumbnail = class {
    constructor(thumb) {
      this.category = thumb.category;
      this.bucketUrl = thumb.bucketUrl;
    }
  }

}
