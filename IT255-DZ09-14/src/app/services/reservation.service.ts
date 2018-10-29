import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Reservation } from "../models/Reservation";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    token: localStorage.getItem("token")
  })
};

@Injectable()
export class ReservationService {
  private readonly GET_RESERVATIONS_URL =
    "http://localhost:8888/methotels/reservations/getuserreservationsservice.php?idUser=";
  private readonly GET_ALL_RESERVATIONS_URL =
    "http://localhost:8888/methotels/reservations/getreservationsservice.php";
  private readonly ADD_RESERVATION_URL =
    "http://localhost:8888/methotels/reservations/addreservationservice.php";
  private readonly DELETE_RESERVATION_URL =
    "http://localhost:8888/methotels/reservations/deletereservationservice.php?id=";
  private readonly UPDATE_RESERVATION_URL =
    "http://localhost:8888/methotels/reservations//updatereservationservice.php";

  dataChange: BehaviorSubject<Reservation[]> = new BehaviorSubject<
    Reservation[]
  >([]);
  dialogData: any;
  response: any;
  constructor(private httpClient: HttpClient) {}

  get data(): Reservation[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  getResponse() {
    return this.response;
  }

  getAllReservations(): void {
    this.httpClient
      .get<Reservation[]>(this.GET_ALL_RESERVATIONS_URL, httpOptions)
      .subscribe(
        data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.response = error.name + " " + error.message;
        }
      );
  }

  getAllUserReservations(idUser: number): void {
    this.httpClient
      .get<Reservation[]>(this.GET_RESERVATIONS_URL + idUser, httpOptions)
      .subscribe(
        data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.response = error.name + " " + error.message;
        }
      );
  }

  addReservation(reservation: Reservation): void {
    this.httpClient
      .post(this.ADD_RESERVATION_URL, reservation, httpOptions)
      .subscribe(
        data => {
          this.dialogData = reservation;
          this.response = data;
        },
        (error: HttpErrorResponse) => {
          this.response = error.name + " " + error.message;
        }
      );
  }

  updateReservation(reservation: Reservation): void {
    this.httpClient
      .put(this.UPDATE_RESERVATION_URL, reservation, httpOptions)
      .subscribe(
        data => {
          this.dialogData = reservation;
          this.response = data;
        },
        (error: HttpErrorResponse) => {
          this.response = error.name + " " + error.message;
        }
      );
  }

  deleteReservation(id: number): void {
    console.log(id);
    this.httpClient
      .get(this.DELETE_RESERVATION_URL + id, httpOptions)
      .subscribe(
        data => {
          this.response = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }
}
