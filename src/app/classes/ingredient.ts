export class ingredient {
  id: string ;
  name: string;
  _selected = false;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
