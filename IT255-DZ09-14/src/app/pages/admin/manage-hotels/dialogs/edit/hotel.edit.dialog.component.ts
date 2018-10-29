import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HotelService } from "../../../../../services/hotel.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Hotel } from "../../../../../models/Hotel";

@Component({
  selector: "app-hotel.edit.dialog",
  templateUrl: "./hotel.edit.dialog.component.html",
  styleUrls: ["./hotel.edit.dialog.component.scss"]
})
export class HotelEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HotelEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public hotel: Hotel,
    public hotelService: HotelService
  ) {}

  public editHotelForm = new FormGroup({
    name: new FormControl(this.hotel.name, [Validators.required]),
    address: new FormControl(this.hotel.address, [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  get name() {
    return this.editHotelForm.get("name");
  }
  get address() {
    return this.editHotelForm.get("address");
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.hotel = new Hotel(
      this.editHotelForm.value.name,
      this.editHotelForm.value.address,
      this.hotel.id
    );
    console.log(this.hotel);
    this.hotelService.updateHotel(this.hotel);
  }
}
