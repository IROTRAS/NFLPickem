import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { UserService } from '../user.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  adduserForm: FormGroup;
  hide = true;
  confhide = true;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public selectedweek: any,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.adduserForm = this.formBuilder.group(
      {
        username: ['', Validators.required, this.validateUsername.bind(this)],
        password: ['', Validators.required],
        confpassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator('password', 'confpassword') }
    );
  }

  validateUsername(control: AbstractControl): Observable<any> {
    const username = control.value;
    return this.userService.userExists(username).pipe(
      map((value: boolean) => {
        if (value) {
          return { userexists: true };
        }
        return null;
      })
    );
  }

  save() {
    this.userService.addUser(this.adduserForm.value).subscribe(
      res => {
        this.dialogRef.close();
        this.userService.sendSingleUserWeek(this.selectedweek.selectedweek);
      },
      err => {}
    );
  }

  // onIconClick(event) {
  //   event.stopPropagation();
  //   this.hide = !this.hide;
  // }

  passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  close() {
    this.dialogRef.close();
  }
}
