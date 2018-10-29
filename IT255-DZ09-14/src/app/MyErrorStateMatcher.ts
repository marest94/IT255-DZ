import {
  FormControl,
  FormGroupDirective,
  NgForm
} from "../../node_modules/@angular/forms";
import { ErrorStateMatcher } from "../../node_modules/@angular/material";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
