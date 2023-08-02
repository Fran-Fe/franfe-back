export class CafeLocationDto {
  static Request = class{
    constructor(req) {
      this.userLat = req.userLat;
      this.userLng = req.userLng;
      this.distance = req.distance;
    }
  }
  static Response = class {
    constructor(cafe, thumbnails, reviewCount = 0, hashTags) {
      this.uuid = cafe.uuid;
      this.address = cafe.address;
      this.placeName = cafe.placeName;
      this.rating = cafe.rating;
      this.reviewCount = reviewCount;
      this.thumbnails = thumbnails;
      this.hashTags = hashTags;

    }
  }
  static Thumbnail = class {
    constructor(thumb) {
      this.category = thumb.category;
      this.url= thumb.bucketUrl;
    }
  }

}
