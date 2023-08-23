export class CafePhotoUrlDto {
  static Response = class {
    constructor(cafeUuid, cafePhotos) {
      this.cafeUuid = cafeUuid;
      this.cafePhoto = cafePhotos;
    }
  }

  static CafePhoto = class {
    constructor(id, url) {
      this.id = id;
      this.url = url;
    }
  }
}