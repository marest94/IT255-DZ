import { Component, Inject } from "@angular/core";
import { ReservationService } from "../../../../../services/reservation.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Reservation } from "../../../../../models/Reservation";
import * as moment from "moment";
import { RoomService } from "../../../../../services/room.service";

@Component({
  selector: "app-reservation.edit.dialog",
  templateUrl: "./reservation.edit.dialog.component.html",
  styleUrls: ["./reservation.edit.dialog.component.scss"]
})
export class ReservationEditDialogComponent {
  now: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<ReservationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public reservation: Reservation,
    public reservationService: ReservationService,
    public roomService: RoomService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  calculateNewReservation() {
    this.roomService.getRoom(this.reservation.idRoom).subscribe(res => {
      this.reservation.days = this.getDays();
      this.reservation.price = res.price * this.reservation.days;
    });
  }

  stopEdit(): void {
    this.reservationService.updateReservation(this.reservation);
  }

  getDays(): number {
    return moment
      .duration(
        moment(this.reservation.toDate).diff(moment(this.reservation.fromDate))
      )
      .asDays();
  }
}
