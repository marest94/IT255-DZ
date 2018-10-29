import { Component, OnInit } from "@angular/core";
import { Room } from "../../../models/Room";
import { RoomService } from "../../../services/room.service";
import { Router } from "@angular/router";
import { Hotel } from "../../../models/Hotel";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"]
})
export class RoomsComponent implements OnInit {
  public isAuth: boolean;
  searchTerm: any;
  rooms: Room[];
  hotels: Hotel[];
  constructor(public roomService: RoomService, private router: Router) {}

  ngOnInit() {
    this.getRooms();
    if (localStorage.getItem("token")) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
  getRooms() {
    this.roomService.getRooms().subscribe(result => {
      this.rooms = result;
    });
  }

  getHotel() {}
  goToThisRoom(id: number) {
    this.router.navigate(["/room", id]);
  }
}
