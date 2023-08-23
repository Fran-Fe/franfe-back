export class CafePhotoUrlDto {
  static Response = class {
    constructor(photoUrl) {
      this.id = photoUrl.id;
      this.url = photoUrl.url;
    }
  }
}