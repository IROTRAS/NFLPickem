import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subscription, Observable, of } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-commish-login',
  templateUrl: './commish-login.component.html',
  styleUrls: ['./commish-login.component.css']
})
export class CommishLoginComponent implements OnInit {
  commishLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CommishLoginComponent>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.commishLoginForm = this.formBuilder.group({
      username: ['', Validators.required, this.validateUsername.bind(this)],
      password: ['', Validators.required, this.validatePassword.bind(this)]
    });
  }

  validateUsername(control: AbstractControl): Observable<any> {
    const username = control.value;
    if (username !== 'commish') {
      return of({ validUsername: false });
    }
    return of(null);
  }

  validatePassword(control: AbstractControl): Observable<any> {
    const password = control.value;
    if (password !== 'football') {
      return of({ validPassword: false });
    }
    return of(null);
  }

  login() {
    this.userService.sendCommishLogin();
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
