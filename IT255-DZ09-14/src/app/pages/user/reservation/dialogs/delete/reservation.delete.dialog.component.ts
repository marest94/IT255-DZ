import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Reservation } from "../../../../../models/Reservation";
import { ReservationService } from "../../../../../services/reservation.service";

@Component({
  selector: "app-reservation.delete.dialog",
  templateUrl: "./reservation.delete.dialog.component.html",
  styleUrls: ["./reservation.delete.dialog.component.scss"]
})
export class ReservationDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReservationDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public reservation: Reservation,
    public reservationService: ReservationService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.reservationService.deleteReservation(this.reservation.id);
  }
}
