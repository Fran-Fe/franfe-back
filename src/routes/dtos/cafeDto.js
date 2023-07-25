export class CafeDto {
  static Response = class {
    constructor(cafe) {
      this.uuid = cafe.uuid;
      this.address = cafe.address;
      this.placeName = cafe.placeName;
    }
  }

  static DetailResponse = class {
    constructor(cafe, options, hashtags, reviews, thumbnailS3List) {
      this.uuid = cafe.uuid;
      this.address = cafe.address;
      this.lat = cafe.lat;
      this.lng = cafe.lng;
      this.placeName = cafe.placeName;
      this.overView = cafe.overView;
      this.rating = cafe.rating;
      this.options = options;
      this.hashtags = hashtags;
      this.reviews = reviews;
      this.thumbnailS3List = thumbnailS3List;
    }

    static Option = class {
      constructor(option) {
        this.option = option.option;
        this.optionOn = option.optionOn;
      }
    }

    static Review = class {
      constructor(review, text) {
        this.authorName = review.authorName;
        this.rating = review.rating;
        this.relativeTimeDescription = review.relativeTimeDescription;
        this.text = text;
      }
    }

    static thumbnailS3 = class {
      constructor(thumbnailS3) {
        this.bucketUrl = thumbnailS3.bucketUrl;
        this.category = thumbnailS3.category;
      }
    }
  }
}