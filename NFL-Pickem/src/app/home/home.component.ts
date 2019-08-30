import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsComponent } from '../results/results.component';
import { RemoveUserComponent } from '../remove-user/remove-user.component';
import { WeekAddComponent } from '../week-add/week-add.component';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { WeekDataService } from '../week-data.service';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { CommishLoginComponent } from '../commish-login/commish-login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  commishLoggedIn: Boolean = false;

  removeUserDialogRef: MatDialogRef<RemoveUserComponent>;
  commishLoginDialogRef: MatDialogRef<CommishLoginComponent>;
  subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private weekDataService: WeekDataService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.subscriptions.add(
      this.userService.getCommishLogin().subscribe(isloggedin => {
        this.commishLoggedIn = isloggedin;
      })
    );
  }

  ngOnInit() {}

  updateSeason() {
    this.router.navigate(['weeks']);
  }

  updateResults() {
    this.router.navigate(['results']);
  }

  commishLoginDialog() {
    this.commishLoginDialogRef = this.dialog.open(CommishLoginComponent, {
      hasBackdrop: true,
      autoFocus: true,
      disableClose: true,
      data: {}
    });
  }

  removeUserDialog() {
    this.removeUserDialogRef = this.dialog.open(RemoveUserComponent, {
      hasBackdrop: true,
      autoFocus: true,
      disableClose: true,
      data: {}
    });
  }


  setupSeason() {
    this.weekDataService.setupSeason().subscribe(
      res => {
        console.log('success');
      },
      err => {
        console.log('failure');
      }
    );
  }

  deleteSeason() {
    this.weekDataService.deleteSeason().subscribe(
      res => {
        console.log('success');
      },
      err => {
        console.log('failure');
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
