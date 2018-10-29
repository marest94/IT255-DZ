import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { LoginDialogComponent } from "./dialogs/login/login.dialog.component";
import { RegisterDialogComponent } from "./dialogs/register/register.dialog.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "IT255-DZ09";
  public isAuth: boolean;
  public role: String = "null";
  public username: String;
  public idUser: number;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.isAuth = true;
      this.role = localStorage.getItem("role");
      this.username = localStorage.getItem("username");
      this.idUser = +localStorage.getItem("idUser");
    } else {
      this.isAuth = false;
    }
  }
  public logOut() {
    localStorage.removeItem("token");
    this.isAuth = false;
    location.reload();
    this.router.navigateByUrl("");
  }
  public login() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
  }
  public register() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);
  }
}
