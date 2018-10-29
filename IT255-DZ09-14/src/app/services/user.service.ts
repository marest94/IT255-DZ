import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { catchError, map, tap } from "rxjs/operators";
import { User } from "../models/User";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  })
};

@Injectable()
export class UserService {
  private readonly registerUrl =
    "http://localhost:8888/methotels/users/registerservice.php";
  private readonly loginUrl =
    "http://localhost:8888/methotels/users/loginservice.php";

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    console.log(user);
    return this.http.post<User>(this.registerUrl, user, httpOptions).pipe(
      tap((_: User) => console.log(`added user ${user.username}`)),
      catchError(this.handleError<User>("registerError"))
    );
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<User>(this.loginUrl, user, httpOptions).pipe(
      tap((_: User) => console.log(`logged user ${user.username}`)),
      catchError(this.handleError<User>("loginError"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      localStorage.setItem("error", error.error.error);
      console.log(error.error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
