import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
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
import { Router } from "@angular/router";
import { HotelService } from "../../../services/hotel.service";
import { Hotel } from "../../../models/Hotel";
import { HotelAddDialogComponent } from "./dialogs/add/hotel.add.dialog.component";
import { HotelEditDialogComponent } from "./dialogs/edit/hotel.edit.dialog.component";
import { HotelDeleteDialogComponent } from "./dialogs/delete/hotel.delete.dialog.component";

@Component({
  selector: "app-manage-hotels",
  templateUrl: "./manage-hotels.component.html",
  styleUrls: ["./manage-hotels.component.scss"]
})
export class ManageHotelsComponent implements OnInit {
  displayedColumns = ["name", "address", "actions"];
  hotelServiceData: HotelService | null;
  dataSource: HotelsDataSourc | null;
  index: number;
  id: number;
  public hotels: Hotel[];

  constructor(
    public httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public hotelService: HotelService
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

  addNew(hotel: Hotel) {
    const dialogRef = this.dialog.open(HotelAddDialogComponent, {
      data: { hotel: hotel }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.hotelServiceData.dataChange.value.push(
          this.hotelService.getDialogData()
        );
        this.snackBar.open(this.hotelService.getResponse(), "OK", {
          duration: 3000
        });
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, name: string, address: string) {
    this.id = id;
    const dialogRef = this.dialog.open(HotelEditDialogComponent, {
      data: { id: id, name: name, address: address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.hotelServiceData.dataChange.value.findIndex(
          x => x.id === this.id
        );
        this.hotelServiceData.dataChange.value[
          foundIndex
        ] = this.hotelService.getDialogData();
        this.snackBar.open(this.hotelService.getResponse(), "OK", {
          duration: 3000
        });
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, name: string, address: string) {
    this.index = i;
    this.id = id;

    const dialogRef = this.dialog.open(HotelDeleteDialogComponent, {
      data: { id: id, name: name, address: address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.hotelServiceData.dataChange.value.findIndex(
          x => x.id === this.id
        );
        this.hotelServiceData.dataChange.value.splice(foundIndex, 1);
        this.snackBar.open(this.hotelService.getResponse(), "OK", {
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
    this.hotelServiceData = new HotelService(this.httpClient);
    this.dataSource = new HotelsDataSourc(
      this.hotelServiceData,
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

export class HotelsDataSourc extends DataSource<Hotel> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Hotel[] = [];
  renderedData: Hotel[] = [];

  constructor(
    public _hotelServiceData: HotelService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<Hotel[]> {
    const displayDataChanges = [
      this._hotelServiceData.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._hotelServiceData.getAllHotels();

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this._hotelServiceData.data
        .slice()
        .filter((hotel: Hotel) => {
          const searchStr = (
            hotel.id +
            hotel.name +
            hotel.address
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

  sortData(data: Hotel[]): Hotel[] {
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
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case "address":
          [propertyA, propertyB] = [a.address, b.address];
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
