import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Hotel } from "../../../../../models/Hotel";
import { HotelService } from "../../../../../services/hotel.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MyErrorStateMatcher } from "../../../../../MyErrorStateMatcher";

@Component({
  selector: "app-hotel.add.dialog",
  templateUrl: "./hotel.add.dialog.component.html",
  styleUrls: ["./hotel.add.dialog.component.scss"]
})
export class HotelAddDialogComponent {
  hotel: Hotel;
  matcher = this.myErrorStateMather;

  constructor(
    public dialogRef: MatDialogRef<HotelAddDialogComponent>,
    public hotelService: HotelService,
    private myErrorStateMather: MyErrorStateMatcher
  ) {}

  public addHotelForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  get name() {
    return this.addHotelForm.get("name");
  }
  get address() {
    return this.addHotelForm.get("address");
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.hotel = new Hotel(
      this.addHotelForm.value.name,
      this.addHotelForm.value.address
    );
    this.hotelService.addHotel(this.hotel);
  }
}
