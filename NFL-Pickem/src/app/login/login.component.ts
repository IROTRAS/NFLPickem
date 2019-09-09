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
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  confhide = true;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public selectedweek: any,
    public dialogRef: MatDialogRef<LoginComponent>,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required, this.validateUsername.bind(this)],
      password: ['', Validators.required]
    });
  }

  validateUsername(control: AbstractControl): Observable<any> {
    const username = control.value;
    return this.userService.userExists(username).pipe(
      map((value: boolean) => {
        if (!value) {
          return { userexists: false };
        }
        return null;
      })
    );
  }

  login() {
    this.authService.authenticateUser(this.loginForm.value).subscribe(
      res => {
        console.log('res');
        console.log(res);
        this.authService.setSession(res);
        this.dialogRef.close();
      },
      err => {}
    );
  }

  // onIconClick(event) {
  //   event.stopPropagation();
  //   this.hide = !this.hide;
  // }

  close() {
    this.authService.logout();
    this.dialogRef.close();
  }
}
