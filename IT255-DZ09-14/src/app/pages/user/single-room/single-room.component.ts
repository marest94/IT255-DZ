import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { FormGroup, FormControl } from "@angular/forms";
import { Reservation } from "../../../models/Reservation";
import { ReservationService } from "../../../services/reservation.service";
import { Room } from "../../../models/Room";
import { RoomService } from "../../../services/room.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatSnackBar,
  MatDialog
} from "../../../../../node_modules/@angular/material";
import { LoginDialogComponent } from "../../../dialogs/login/login.dialog.component";

@Component({
  selector: "app-single-room",
  templateUrl: "./single-room.component.html",
  styleUrls: ["./single-room.component.scss"]
})
export class SingleRoomComponent implements OnInit {
  myMoment: moment.Moment;
  reservation: Reservation;
  fromDate: Date;
  now: Date = new Date();
  room: Room;
  roomID: number;
  idUser: number;
  snackBar: MatSnackBar;
  url: string;
  isAuth: boolean;

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.isAuth = true;
      this.idUser = +localStorage.getItem("idUser");
    } else {
      this.isAuth = false;
    }
    this.activatedRoute.params.subscribe(param => {
      this.roomID = +param["id"];
      this.roomService.getRoom(this.roomID).subscribe(res => {
        this.room = new Room(
          res.roomName,
          res.beds,
          res.size,
          res.tv,
          res.bath,
          res.description,
          res.price,
          res.picUrl,
          res.idHotel,
          res.id
        );
        this.url = res.picUrl;
      });
    });
  }

  public newReservationForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl()
  });

  reserveRoom() {
    if (this.isAuth) {
      this.reservation = new Reservation(
        this.newReservationForm.controls.fromDate.value,
        this.newReservationForm.controls.toDate.value,
        this.getDays(),
        this.room.id,
        this.getPrice(),
        this.idUser
      );
      this.reservationService.addReservation(this.reservation);
      this.router.navigateByUrl("/reservations");
    } else {
      const dialogRef = this.dialog.open(LoginDialogComponent);
    }
  }

  setMinFromDate() {
    this.fromDate = this.newReservationForm.controls.fromDate.value;
  }

  getDays(): number {
    return moment
      .duration(
        moment(this.newReservationForm.controls.toDate.value).diff(
          moment(this.fromDate)
        )
      )
      .asDays();
  }

  getPrice(): number {
    return this.getDays() * this.room.price;
  }
}
