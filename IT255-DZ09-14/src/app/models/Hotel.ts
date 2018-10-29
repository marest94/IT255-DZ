export class Hotel {
  public id: number;
  public name: string;
  public address: string;

  constructor(name: string, address: string, id?: number) {
    this.name = name;
    this.address = address;
    this.id = id;
  }
}
