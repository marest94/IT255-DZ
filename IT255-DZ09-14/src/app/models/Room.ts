export class Room {
  public id: number;
  public roomName: string;
  public beds: number;
  public size: number;
  public tv: number;
  public bath: number;
  public description: string;
  public price: number;
  public picUrl: string;
  public idHotel: number;

  constructor(
    roomName: string,
    beds: number,
    size: number,
    tv: number,
    bath: number,
    description: string,
    price: number,
    picUrl: string,
    idHotel: number,
    id?: number
  ) {
    this.id = id;
    this.roomName = roomName;
    this.beds = beds;
    this.size = size;
    this.tv = tv;
    this.bath = bath;
    this.description = description;
    this.price = price;
    this.picUrl = picUrl;
    this.idHotel = idHotel;
  }
}
