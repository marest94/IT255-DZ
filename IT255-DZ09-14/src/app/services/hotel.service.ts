import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Hotel } from "../models/Hotel";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    token: localStorage.getItem("token")
  })
};

@Injectable()
export class HotelService {
  private readonly GET_HOTELS_URL =
    "http://localhost:8888/methotels/hotels/gethotelsservice.php";
  private readonly GET_HOTEL_URL =
    "http://localhost:8888/methotels/hotels/gethotelservice.php+?id";
  private readonly ADD_HOTEL_URL =
    "http://localhost:8888/methotels/hotels/addhotelservice.php";
  private readonly DELETE_HOTEL_URL =
    "http://localhost:8888/methotels/hotels/deletehotelservice.php?id=";
  private readonly UPDATE_HOTEL_URL =
    "http://localhost:8888/methotels/hotels/updatehotelservice.php";

  dataChange: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);
  dialogData: any;
  response: any;
  constructor(private httpClient: HttpClient) {}

  get data(): Hotel[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getResponse() {
    return this.response;
  }

  getAllHotels(): void {
    this.httpClient.get<Hotel[]>(this.GET_HOTELS_URL).subscribe(
      data => {
        this.dataChange.next(data);
        this.response = data;
      },
      (error: HttpErrorResponse) => {
        this.response = error.name + " " + error.message;
      }
    );
  }

  addHotel(hotel: Hotel): void {
    this.httpClient.post(this.ADD_HOTEL_URL, hotel, httpOptions).subscribe(
      data => {
        this.dialogData = data;
      },
      (error: HttpErrorResponse) => {
        this.response = error.name + " " + error.message;
      }
    );
  }

  updateHotel(hotel: Hotel): void {
    this.httpClient.put(this.UPDATE_HOTEL_URL, hotel, httpOptions).subscribe(
      data => {
        this.dialogData = hotel;
        this.response = data;
      },
      (error: HttpErrorResponse) => {
        this.response = error.name + " " + error.message;
      }
    );
  }

  deleteHotel(id: number): void {
    console.log(id);
    this.httpClient.get(this.DELETE_HOTEL_URL + id, httpOptions).subscribe(
      data => {
        this.response = data;
      },
      (error: HttpErrorResponse) => {
        this.response = error.name + " " + error.message;
      }
    );
  }

  getHotels() {
    return this.httpClient.get<Hotel[]>(this.GET_HOTELS_URL);
  }

  getHotel(id: number): Observable<Hotel> {
    return this.httpClient.get<Hotel>(this.GET_HOTEL_URL + id);
  }
}
