export class galleryDto{
  static Response = class{
    constructor(category, thumbnails) {
      this.category = category;
      this.thumbnails = thumbnails;
    }
  }

  static thumbnail = class{
    constructor(data) {
      this.uuid = data.uuid;
      this.url = data.url;
    }
  }
}
