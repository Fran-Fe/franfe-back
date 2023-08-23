export class CafeListDto {
  static Request = class {
    constructor(req) {
      this.userLat = Number(req.userLat);
      this.userLng = Number(req.userLng);
      this.radius = req.radius === undefined ? Number.MAX_SAFE_INTEGER : Number(req.radius);
      this.search = req.search === undefined ? "" : req.search;
      this.options = req.options === undefined ? [] : req.options.split(",");
      this.hashtags = req.hashtags === undefined ? [] : req.hashtags.split(",");
      this.pageNumber = req.pageNumber === undefined ? null : Number(req.pageNumber);
      this.pageSize = req.pageSize === undefined ? null : Number(req.pageSize);
    }
  }

  static Response = class {
    constructor(cafeInfoList, topCountHashtags) {
        this.cafeInfoList = cafeInfoList;
        this.topCountHashtags = topCountHashtags;
    }
  }

  static CafeInfo = class {
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
