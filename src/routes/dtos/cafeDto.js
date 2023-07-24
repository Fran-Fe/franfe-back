export class CafeDto {
  static Response = class {
    constructor(cafe) {
      this.uuid = cafe.uuid;
      this.address = cafe.address;
      this.placeName = cafe.placeName;
    }
  }

  static DetailResponse = class {
    constructor(cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3 ) {
        this.uuid = cafe.uuid;
        this.address = cafe.address;
        this.lat = cafe.lat;
        this.lng = cafe.lng;
        this.placeName = cafe.placeName;
        this.overView = cafe.overView;
        this.rating = cafe.rating;
        this.cafeOption = cafeOption;
        this.cafeHashtags = cafeHashtags;
        this.cafeReviews = cafeReviews;
        this.cafeThumbnailS3 = cafeThumbnailS3;
    }

    static CafeOption = class {

    }

    static CafeHashtag = class {

    }

    static CafeReview = class {

    }

    static CafeThumbnailS3 = class {

    }
  }
}