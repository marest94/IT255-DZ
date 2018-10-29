export class Reservation {
  public id: number;
  public fromDate: Date;
  public toDate: Date;
  public days: number;
  public idRoom: number;
  public price: number;
  public idUser: number;

  constructor(
    fromDate: Date,
    toDate: Date,
    days: number,
    idRoom: number,
    price: number,
    idUser: number,
    id?: number
  ) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.days = days;
    this.idRoom = idRoom;
    this.price = price;
    this.idUser = idUser;
    this.id = id;
  }
}