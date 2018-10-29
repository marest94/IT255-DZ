import { Component } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { User } from "../../models/User";
import { UserService } from "../../services/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MyErrorStateMatcher } from "../../MyErrorStateMatcher";

@Component({
  selector: "app-login",
  templateUrl: "./login.dialog.component.html",
  styleUrls: ["./login.dialog.component.scss"]
})
export class LoginDialogComponent {
  public snackBar: MatSnackBar;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    public userService: UserService,
    private myErrorStateMather: MyErrorStateMatcher
  ) {}

  public loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  user: User;
  matcher = this.myErrorStateMather;

  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  loginUser() {
    this.user = new User(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    this.userService.loginUser(this.user).subscribe(result => {
      if (result != null) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.username);
        localStorage.setItem("role", result.role);
        localStorage.setItem("idUser", result.idUser);
        location.reload();
      } else {
        alert(localStorage.getItem("error"));
      }
    });
  }
}
