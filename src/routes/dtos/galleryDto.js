export class galleryDto{
  static Request = class{
    constructor(req, reqCategory) {
      this.pageNum = Number(req.query.pageNum);
      this.pageSize = Number(req.query.pageSize);
      this.category = Number(reqCategory);
    }
  }
  static Response = class{
    constructor(category, thumbnails) {
      this.category = category;
      this.thumbnails = thumbnails;
    }
  }

  static thumbnail = class{
    constructor(thumbnail) {
      this.cafeUuid = thumbnail.cafeUuid;
      this.url = thumbnail.url;
    }
  }
}
