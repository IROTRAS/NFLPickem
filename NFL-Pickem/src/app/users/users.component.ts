import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { WeekDataService } from '../week-data.service';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  commishLoggedIn: Boolean = false;
  selectedweek: any;
  allusers: any;
  allUserWeeks: any;
  userweekpicks: any;
  userTotalScores: any = [];
  picks: any;
  results: any;
  weekscore: any = [];
  subscriptions: Subscription = new Subscription();

  addUserDialogRef: MatDialogRef<AddUserComponent>;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private weekdataService: WeekDataService,
    private router: Router
  ) {
    this.subscriptions.add(
      this.userService.getSingleWeekPicks().subscribe((userpicks: any) => {
        this.userweekpicks = userpicks;
        this.subscriptions.add(
          this.weekdataService
            .getSingleWeekResults()
            .subscribe((singleWeekResults: any) => {
              this.results = singleWeekResults;
              this.calculateWeekScore(singleWeekResults);
            })
        );
      })
    );
    this.subscriptions.add(
      this.weekdataService
        .getSelectedWeek()
        .subscribe((selectedweek: string) => {
          this.selectedweek = selectedweek;
        })
    );
    this.subscriptions.add(
      this.userService.getAllUserWeek().subscribe((allUserWeeks: any) => {
        this.calculateTotalScore(allUserWeeks);
      })
    );
    this.subscriptions.add(
      this.userService.getCommishLogin().subscribe(isloggedin => {
        this.commishLoggedIn = isloggedin;
      })
    );
  }

  private calculateWeekScore(singleWeekResults: any) {
    if (this.results.length !== 0) {
      this.weekscore = [];
      this.userweekpicks.map(user => {
        const score = user.userweek.picks.filter((pick: string) =>
          singleWeekResults.includes(pick)
        ).length;
        const score2: number = user.userweek.picks.reduce(
          (cum: number, curr: string) => {
            if (singleWeekResults.includes(curr)) {
              return (cum += 1);
            }
            return cum;
          },
          0
        );
        if (score !== score2) {
          throw new Error('WHA??');
        }
        user.weekscore = score;
      });
    }
  }

  private calculateTotalScore(allUserWeeks: any) {
    this.userTotalScores = allUserWeeks.map((users: any) => {
      const userWeekScores: any = users.userweeks.map((userweek: any) => {
        return userweek.score;
      });
      const userTotalScore = userWeekScores.reduce(
        (cum: number, curr: number) => {
          return curr + cum;
        }
      );
      return userTotalScore;
    });
  }

  ngOnInit() {}

  addUserDialog() {
    this.addUserDialogRef = this.dialog.open(AddUserComponent, {
      hasBackdrop: true,
      autoFocus: true,
      disableClose: true,
      data: { selectedweek: this.selectedweek }
    });
  }

  userPicks(user: any) {
    this.router.navigate(['picks', user.username, user.userweek.week]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
