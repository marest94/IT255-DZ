import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RoomService } from "../../../services/room.service";
import { HttpClient } from "@angular/common/http";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatSnackBar
} from "@angular/material";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DataSource } from "@angular/cdk/collections";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

import { Room } from "../../../models/Room";
import { Router } from "@angular/router";
import { RoomAddDialogComponent } from "./dialogs/add/room.add.dialog.component";
import { RoomEditDialogComponent } from "./dialogs/edit/room.edit.dialog.component";
import { RoomDeleteDialogComponent } from "./dialogs/delete/room.delete.dialog.component";

@Component({
  selector: "app-manage-rooms",
  templateUrl: "./manage-rooms.component.html",
  styleUrls: ["./manage-rooms.component.scss"]
})
export class ManageRoomsComponent implements OnInit {
  displayedColumns = [
    "roomName",
    "beds",
    "size",
    "tv",
    "bath",
    "description",
    "price",
    "picUrl",
    "idHotel",
    "actions"
  ];
  roomServiceData: RoomService | null;
  dataSource: RoomsDataSource | null;
  index: number;
  id: number;
  public rooms: Room[];

  constructor(
    public httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public roomService: RoomService
  ) {}

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild("filter")
  filter: ElementRef;

  ngOnInit() {
    if (
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") == "admin"
    ) {
      this.loadData();
    } else {
      this.router.navigateByUrl("");
    }
  }

  refresh() {
    this.loadData();
  }

  addNew(room: Room) {
    const dialogRef = this.dialog.open(RoomAddDialogComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.roomServiceData.dataChange.value.push(
          this.roomService.getDialogData()
        );
        this.snackBar.open(this.roomService.getResponse(), "OK", {
          duration: 3000
        });
        this.refreshTable();
      }
    });
  }

  startEdit(
    i: number,
    id: number,
    roomName: string,
    beds: number,
    size: number,
    tv: number,
    bath: number,
    description: string,
    price: number,
    picUrl: string,
    idHotel: number
  ) {
    console.log("i: ",i,"id: ", id,"room: ",roomName,"beds: ",beds,"size: ",size,
    "tv: ", tv,"bath: ", bath,"bath: ", description,"price: ", price,"picUrl: ", picUrl,"idHotel: ", idHotel);
    this.id = id;
    const dialogRef = this.dialog.open(RoomEditDialogComponent, {
      data: {
        id: id,
        roomName: roomName,
        beds: beds,
        size: size,
        tv: tv,
        bath: bath,
        description: description,
        price: price,
        picUrl: picUrl,
        idHotel: idHotel
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.roomServiceData.dataChange.value.findIndex(
          x => x.id === this.id
        );
        this.roomServiceData.dataChange.value[
          foundIndex
        ] = this.roomService.getDialogData();
        this.snackBar.open(this.roomService.getResponse(), "OK", {
          duration: 3000
        });
        this.refreshTable();
      }
    });
  }

  deleteItem(
    i: number,
    id: number,
    roomName: string,
    beds: number,
    size: number,
    tv: number,
    bath: number,
    description: string,
    price: number,
    picUrl: string,
    idHotel: number
  ) {
    this.index = i;
    this.id = id;

    const dialogRef = this.dialog.open(RoomDeleteDialogComponent, {
      data: {
        id: id,
        roomName: roomName,
        beds: beds,
        size: size,
        tv: tv,
        bath: bath,
        description: description,
        price: price,
        picUrl: picUrl,
        idHotel: idHotel
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.roomServiceData.dataChange.value.findIndex(
          x => x.id === this.id
        );
        this.roomServiceData.dataChange.value.splice(foundIndex, 1);
        this.snackBar.open(this.roomService.getResponse(), "OK", {
          duration: 3000
        });
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
    } else {
      this.dataSource.filter = "";
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.roomServiceData = new RoomService(this.httpClient);
    this.dataSource = new RoomsDataSource(
      this.roomServiceData,
      this.paginator,
      this.sort
    );

    Observable.fromEvent(this.filter.nativeElement, "keyup")
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class RoomsDataSource extends DataSource<Room> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Room[] = [];
  renderedData: Room[] = [];

  constructor(
    public _roomServiceData: RoomService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<Room[]> {
    const displayDataChanges = [
      this._roomServiceData.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._roomServiceData.getAllRooms();
    console.log(this._roomServiceData.getAllRooms()
  );
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._roomServiceData.data
        .slice()
        .filter((room: Room) => {
          const searchStr = (
            room.id +
            room.roomName +
            room.beds +
            room.size +
            room.tv +
            room.bath +
            room.description +
            room.price +
            room.picUrl +
            room.idHotel
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

      const sortedData = this.sortData(this.filteredData.slice());

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(
        startIndex,
        this._paginator.pageSize
      );
      console.log(this.renderedData);
      return this.renderedData;
    });
  }
  disconnect() {}

  sortData(data: Room[]): Room[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "roomName":
          [propertyA, propertyB] = [a.roomName, b.roomName];
          break;
        case "beds":
          [propertyA, propertyB] = [a.beds, b.beds];
          break;
        case "size":
          [propertyA, propertyB] = [a.size, b.size];
          break;
        case "tv":
          [propertyA, propertyB] = [a.tv, b.tv];
          break;
        case "bath":
          [propertyA, propertyB] = [a.bath, b.bath];
          break;
        case "description":
          [propertyA, propertyB] = [a.description, b.description];
          break;
        case "price":
          [propertyA, propertyB] = [a.price, b.price];
          break;
        case "picUrl":
          [propertyA, propertyB] = [a.picUrl, b.picUrl];
          break;
        case "idHotel":
          [propertyA, propertyB] = [a.idHotel, b.idHotel];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
