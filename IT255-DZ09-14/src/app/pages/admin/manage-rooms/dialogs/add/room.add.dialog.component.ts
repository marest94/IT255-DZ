import { MatDialogRef } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Room } from "../../../../../models/Room";
import { RoomService } from "../../../../../services/room.service";
import { Hotel } from "../../../../../models/Hotel";
import { HotelService } from "../../../../../services/hotel.service";
import { MyErrorStateMatcher } from "../../../../../MyErrorStateMatcher";

@Component({
  selector: "app-room.add.dialog",
  templateUrl: "./room.add.dialog.component.html",
  styleUrls: ["./room.add.dialog.component.scss"]
})
export class RoomAddDialogComponent implements OnInit {
  hotels: Hotel[] = [];
  room: Room;
  matcher = this.myErrorStateMather;

  constructor(
    public dialogRef: MatDialogRef<RoomAddDialogComponent>,
    public hotelService: HotelService,
    public roomService: RoomService,
    private myErrorStateMather: MyErrorStateMatcher
  ) {}
  public addRoomForm = new FormGroup({
    roomName: new FormControl("", [Validators.required]),
    beds: new FormControl("", [Validators.required]),
    size: new FormControl("", [Validators.required]),
    tv: new FormControl("", [Validators.required]),
    bath: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    picUrl: new FormControl("", [Validators.required]),
    idHotel: new FormControl("", [Validators.required])
  });

  get roomName() {
    return this.addRoomForm.get("roomName");
  }
  get beds() {
    return this.addRoomForm.get("beds");
  }
  get size() {
    return this.addRoomForm.get("size");
  }
  get tv() {
    return this.addRoomForm.get("tv");
  }
  get bath() {
    return this.addRoomForm.get("bath");
  }
  get description() {
    return this.addRoomForm.get("description");
  }
  get price() {
    return this.addRoomForm.get("price");
  }
  get picUrl() {
    return this.addRoomForm.get("picUrl");
  }
  get idHotel() {
    return this.addRoomForm.get("idHotel");
  }

  ngOnInit() {
    this.getHotels();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getHotels() {
    this.hotelService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
    });
  }

  public confirmAdd(): void {
    this.room = new Room(
      this.addRoomForm.value.roomName,
      this.addRoomForm.value.beds,
      this.addRoomForm.value.size,
      this.addRoomForm.value.tv,
      this.addRoomForm.value.bath,
      this.addRoomForm.value.description,
      this.addRoomForm.value.price,
      this.addRoomForm.value.picUrl,
      this.addRoomForm.value.idHotel
    );
    this.roomService.addRoom(this.room);
  }
}
