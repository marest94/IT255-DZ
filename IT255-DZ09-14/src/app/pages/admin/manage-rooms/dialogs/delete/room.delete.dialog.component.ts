import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, Inject } from "@angular/core";
import { RoomService } from "../../../../../services/room.service";
import { Room } from "../../../../../models/Room";

@Component({
  selector: "app-room.delete.dialog",
  templateUrl: "./room.delete.dialog.component.html",
  styleUrls: ["./room.delete.dialog.component.scss"]
})
export class RoomDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RoomDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public room: Room,
    public roomService: RoomService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.roomService.deleteRoom(this.room.id);
  }
}
