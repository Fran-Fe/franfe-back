export class CafeLocationDto {
  static Request = class{
    constructor(req) {
      this.userLat = req.userLat;
      this.userLng = req.userLng;
      this.distance = req.distance;
    }
  }
  static Response = class {
    constructor(cafe, thumbnails, countReviews = '0', hashTags) {
      this.uuid = cafe.uuid;
      this.address = cafe.address;
      this.placeName = cafe.placeName;
      this.rating = cafe.rating;
      this.countReviews = countReviews;
      this.thumbnails = thumbnails;
      this.hashTags = hashTags;

      //리뷰 개수, 해시태그
    }
  }
  static Thumbnail = class {
    constructor(thumb) {
      this.category = thumb.category;
      this.url= thumb.bucketUrl;
    }
  }

  static Hashtag = class{
    constructor(hashtag) {
      this.hashtag = hashtag.hashtag;
    }
  }
}
