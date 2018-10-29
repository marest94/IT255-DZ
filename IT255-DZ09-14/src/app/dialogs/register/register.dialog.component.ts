import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";

import { User } from "../../models/User";
import { MyErrorStateMatcher } from "../../MyErrorStateMatcher";

@Component({
  selector: "app-register",
  templateUrl: "./register.dialog.component.html",
  styleUrls: ["./register.dialog.component.scss"]
})
export class RegisterDialogComponent {
  matcher = this.myErrorStateMather;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    public userService: UserService,
    private myErrorStateMather: MyErrorStateMatcher
  ) {}

  public registerForm = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]),
    lastName: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  get firstName() {
    return this.registerForm.get("firstName"); //notice this
  }
  get lastName() {
    return this.registerForm.get("lastName"); //notice this
  }
  get email() {
    return this.registerForm.get("email"); //notice this
  }
  get username() {
    return this.registerForm.get("username"); //notice this
  }
  get password() {
    return this.registerForm.get("password"); //notice this
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  registerUser() {
    this.user = new User(
      this.registerForm.value.username,
      this.registerForm.value.password,
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      "user"
    );

    this.userService.registerUser(this.user).subscribe(result => {
      if (result != null) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.username);
        localStorage.setItem("role", result.role);
        localStorage.setItem("idUser", result.idUser);
        location.reload();
      } else {
        alert(
          localStorage
            .getItem("error")
            .split("\\r\\n")
            .join("\n")
        );
      }
    });
  }
}
