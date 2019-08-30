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
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {
  removeUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public selectedweek: any,
    public dialogRef: MatDialogRef<RemoveUserComponent>,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.removeUserForm = this.formBuilder.group({
      username: ['', Validators.required, this.validateUsername.bind(this)]
    });
  }

  validateUsername(control: AbstractControl): Observable<any> {
    const username = control.value;
    return this.userService.userExists(username).pipe(
      map((value: boolean) => {
        if (value) {
          return null;
        }
        return { userexists: false };
      })
    );
  }

  remove() {
    this.userService.removeUser(this.removeUserForm.value).subscribe(
      res => {
        this.dialogRef.close();
        this.userService.sendSingleUserWeek(this.selectedweek.selectedweek);
      },
      err => {}
    );
  }

  close() {
    this.dialogRef.close();
  }
}
