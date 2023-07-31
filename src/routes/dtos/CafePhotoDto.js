export class CafePhotoDto {
  static Response = class {
    constructor(cafeUuid, bucketUrlList) {
      this.cafeUuid = cafeUuid;
      this.bucketUrl = bucketUrlList;
    }
  }
}