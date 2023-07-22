export class googleAPIDto {
  Response = class {
    constructor(place_id, name) {
      this.place_id = place_id;
      this.name = name;
    }
  }
}
