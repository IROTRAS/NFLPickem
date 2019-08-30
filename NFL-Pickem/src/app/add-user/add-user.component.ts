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

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public selectedweek: any,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.adduserForm = this.formBuilder.group({
      username: ['', Validators.required, this.validateUsername.bind(this)]
    });
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

  close() {
    this.dialogRef.close();
  }
}
