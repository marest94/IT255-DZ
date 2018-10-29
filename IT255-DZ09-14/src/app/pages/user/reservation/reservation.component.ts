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
import { ReservationService } from "../../../services/reservation.service";
import { Reservation } from "../../../models/Reservation";

import { Router } from "@angular/router";
import { ReservationEditDialogComponent } from "./dialogs/edit/reservation.edit.dialog.component";
import { ReservationDeleteDialogComponent } from "./dialogs/delete/reservation.delete.dialog.component";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.scss"]
})
export class ReservationComponent implements OnInit {
  displayedColumns = ["id", "fromDate", "toDate", "days", "price", "actions"];
  exampleDatabase: ReservationService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  idUser: number;
  public reservations: Reservation[];
  public isAuth: boolean;

  constructor(
    public httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public reservationService: ReservationService
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
      localStorage.getItem("role") == "user"
    ) {
      this.isAuth = true;
      console.log(localStorage.getItem("idUser"));

      this.idUser = +localStorage.getItem("idUser");
      this.loadData();
    } else {
      this.isAuth = false;
      this.router.navigateByUrl("");
    }
  }

  refresh() {
    this.loadData();
  }

  startEdit(
    i: number,
    id: number,
    fromDate: string,
    toDate: string,
    days: number,
    idRoom: number,
    price: number,
    idUser: number
  ) {
    this.id = id;
   
    const dialogRef = this.dialog.open(ReservationEditDialogComponent, {
      data: {
        id: id,
        fromDate: fromDate,
        toDate: toDate,
        days: days,
        idRoom: idRoom,
        price: price,
        idUser: idUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.reservationService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(
    i: number,
    id: number,
    fromDate: string,
    toDate: string,
    days: number,
    idRoom: number,
    price: number,
    idUser: number
  ) {
    this.index = i;
    this.id = id;

    const dialogRef = this.dialog.open(ReservationDeleteDialogComponent, {
      data: {
        id: id,
        fromDate: fromDate,
        toDate: toDate,
        days: days,
        idRoom: idRoom,
        price: price,
        idUser: idUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.snackBar.open(
          "Uspesno obrisana rezervacija za " + id + " sobu",
          "OK",
          {
            duration: 3000
          }
        );
        this.refreshTable();
      }
    });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = "";
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new ReservationService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
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

export class ExampleDataSource extends DataSource<Reservation> {
  idUser: number = +localStorage.getItem("idUser");
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Reservation[] = [];
  renderedData: Reservation[] = [];

  constructor(
    public _exampleDatabase: ReservationService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Reservation[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllUserReservations(this.idUser);
    console.log(this._exampleDatabase.getAllUserReservations(this.idUser));
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data
        .slice()
        .filter((reservation: Reservation) => {
          const searchStr = (
            reservation.id +
            reservation.fromDate.toString() +
            reservation.toDate.toString() +
            reservation.days +
            reservation.idRoom +
            reservation.price
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
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

  /** Returns a sorted copy of the database data. */
  sortData(data: Reservation[]): Reservation[] {
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
        case "fromDate":
          [propertyA, propertyB] = [a.fromDate.toString(), b.toString()];
          break;
        case "toDate":
          [propertyA, propertyB] = [a.toDate.toString(), b.toDate.toString()];
          break;
        case "days":
          [propertyA, propertyB] = [a.days, b.days];
          break;
        case "idRoom":
          [propertyA, propertyB] = [a.idRoom, b.idRoom];
          break;
        case "price":
          [propertyA, propertyB] = [a.price, b.price];
          break;
        case "idUser":
          [propertyA, propertyB] = [a.idUser, b.idUser];
          break;
        case "price":
          [propertyA, propertyB] = [a.price, b.price];
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
