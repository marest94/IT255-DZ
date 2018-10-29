import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { RoomService } from "../../../../../services/room.service";
import { Room } from "../../../../../models/Room";
import { HotelService } from "../../../../../services/hotel.service";
import { Hotel } from "../../../../../models/Hotel";
import { MyErrorStateMatcher } from "../../../../../MyErrorStateMatcher";

@Component({
  selector: "app-room.edit.dialog",
  templateUrl: "./room.edit.dialog.component.html",
  styleUrls: ["./room.edit.dialog.component.scss"]
})
export class RoomEditDialogComponent implements OnInit {
  hotels: Hotel[] = [];
  matcher = this.myErrorStateMather;

  constructor(
    public dialogRef: MatDialogRef<RoomEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public room: Room,
    public roomService: RoomService,
    public hotelService: HotelService,
    private myErrorStateMather: MyErrorStateMatcher
    
  ) {}
  public editRoomForm = new FormGroup({
    roomName: new FormControl(this.room.roomName, [Validators.required]),
    beds: new FormControl(this.room.beds, [Validators.required]),
    size: new FormControl(this.room.size, [Validators.required]),
    tv: new FormControl(this.room.tv, [Validators.required]),
    bath: new FormControl(this.room.bath, [Validators.required]),
    description: new FormControl(this.room.description, [Validators.required]),
    price: new FormControl(this.room.price, [Validators.required]),
    picUrl: new FormControl(this.room.picUrl, [Validators.required]),
    idHotel: new FormControl(this.hotels[this.room.idHotel], [
      Validators.required
    ])
  });

  get roomName() {
    return this.editRoomForm.get("roomName");
  }
  get beds() {
    return this.editRoomForm.get("beds");
  }
  get size() {
    return this.editRoomForm.get("size");
  }
  get tv() {
    return this.editRoomForm.get("tv");
  }
  get bath() {
    return this.editRoomForm.get("bath");
  }
  get description() {
    return this.editRoomForm.get("description");
  }
  get price() {
    return this.editRoomForm.get("price");
  }
  get picUrl() {
    return this.editRoomForm.get("picUrl");
  }
  get idHotel() {
    return this.editRoomForm.get("idHotel");
  }

  ngOnInit() {
    this.getHotels();
    console.log("room: ", this.room);
    console.log("pic: ", this.editRoomForm.get("picUrl"));
    console.log("price: ",this.editRoomForm.get("price"));

  }

  getHotels() {
    this.hotelService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
      console.log(this.hotels);
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  public confirmEdit(): void {
    this.room = new Room(
      this.editRoomForm.value.roomName,
      this.editRoomForm.value.beds,
      this.editRoomForm.value.size,
      this.editRoomForm.value.tv,
      this.editRoomForm.value.bath,
      this.editRoomForm.value.description,
      this.editRoomForm.value.price,
      this.editRoomForm.value.picUrl,
      this.editRoomForm.value.idHotel,
      this.room.id
    );
    this.roomService.updateRoom(this.room);
  }
}
