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
        this.cafeOption = cafeOptions;
        this.cafeHashtags = cafeHashtags;
        this.cafeReviews = cafeReviews;
        this.cafeThumbnailS3 = cafeThumbnailS3;
    }

    static CafeOption = class {
      constructor(option) {
        this.option = option.option;
        this.optionOn = option.optionOn;
      }

    }

    static CafeReview = class {
      constructor(review, text) {
        this.authorName = review.authorName;
        this.rating = review.rating;
        this.relativeTimeDescription = review.relativeTimeDescription;
        this.text = text;
      }


    }

    static CafeThumbnailS3 = class {
      constructor(thumbnailS3) {
        this.bucketUrl = thumbnailS3.bucketUrl;
        this.category = thumbnailS3.category;
      }

    }
  }
}