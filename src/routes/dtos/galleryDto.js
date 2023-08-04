export class galleryDto{
  static Request = class{
    constructor(req) {
      this.pageNum = req.query.pageNum;
      this.pageSize = req.query.pageSize;
      this.category = req.query.category;
    }
  }
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
