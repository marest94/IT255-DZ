import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HotelService } from "../../../../../services/hotel.service";
import { Hotel } from "../../../../../models/Hotel";

@Component({
  selector: "app-hotel.delete.dialog",
  templateUrl: "./hotel.delete.dialog.component.html",
  styleUrls: ["./hotel.delete.dialog.component.scss"]
})
export class HotelDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HotelDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public hotel: Hotel,
    public hotelService: HotelService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.hotelService.deleteHotel(this.hotel.id);
  }
}
