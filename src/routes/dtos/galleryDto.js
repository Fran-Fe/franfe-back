export class galleryDto{
  static Request = class{
    constructor(req) {
      this.pageNum = Number(req.query.pageNum);
      this.pageSize = Number(req.query.pageSize);
      this.category = Number(req.query.category);
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
      this.uuid = data.dataValues.cafeUuid;
      this.url = data.dataValues.bucketUrl;
    }
  }
}
