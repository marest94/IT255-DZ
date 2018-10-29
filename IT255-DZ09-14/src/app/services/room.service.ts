import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Room } from "../models/Room";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    token: localStorage.getItem("token")
  })
};

@Injectable()
export class RoomService {
  private readonly GET_ROOMS_URL =
    "http://localhost:8888/methotels/rooms/getroomsservice.php";
  private readonly GET_ROOM_URL =
    "http://localhost:8888/methotels/rooms/getroomservice.php?id=";
  private readonly ADD_ROOM_URL =
    "http://localhost:8888/methotels/rooms/addroomservice.php";
  private readonly DELETE_ROOM_URL =
    "http://localhost:8888/methotels/rooms/deleteroomservice.php?id=";
  private readonly UPDATE_ROOM_URL =
    "http://localhost:8888/methotels/rooms/updateroomservice.php";

  dataChange: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  dialogData: any;
  response: any;

  constructor(private httpClient: HttpClient) {}

  get data(): Room[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getResponse() {
    return this.response;
  }

  getAllRooms(): void {
    this.httpClient.get<Room[]>(this.GET_ROOMS_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.response = error.name + " " + error.message;
      }
    );
  }

  addRoom(room: Room): void {
    this.httpClient.post(this.ADD_ROOM_URL, room, httpOptions).subscribe(
      data => {
        this.dialogData = room;
        this.response = data;
      },
      (error: HttpErrorResponse) => {
        this.response = error.name + " " + error.message;
      }
    );
  }

  updateRoom(room: Room): void {
    this.httpClient.put(this.UPDATE_ROOM_URL, room, httpOptions).subscribe(
      data => {
        this.dialogData = room;
        this.response = data;
      },
      (error: HttpErrorResponse) => {
        this.response = error.name + " " + error.message;
      }
    );
  }

  deleteRoom(id: number): void {
    console.log(id);
    this.httpClient.get(this.DELETE_ROOM_URL + id, httpOptions).subscribe(
      data => {
        this.response = data;
      },
      (error: HttpErrorResponse) => {
        this.response = error.name + " " + error.message;
      }
    );
  }

  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.GET_ROOMS_URL);
  }

  getRoom(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.GET_ROOM_URL + id);
  }
}
