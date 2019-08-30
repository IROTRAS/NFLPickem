import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WeekDataService } from '../week-data.service';
import { UserService } from '../user.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-user-week-picks',
  templateUrl: './user-week-picks.component.html',
  styleUrls: ['./user-week-picks.component.css']
})
export class UserWeekPicksComponent implements OnInit, OnDestroy {
  username: string;
  selectedweek: string; // the specific week
  scheduleweek: any; // schedule week object passed in
  // user week object passed in or not if first time for this user/week
  userWeek: any = []; /*{
    username: 'initial',
    userweek: [{
      week: 'initial',
      picks: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    }]
  }];
*/
  scheduleWeekSub: Subscription;

  constructor(
    private activatedroute: ActivatedRoute,
    private weekdataService: WeekDataService,
    private userService: UserService,
    private router: Router
  ) {
    this.activatedroute.params.subscribe(params => {
      this.username = params['username'];
      this.selectedweek = params['week'];
      // this.userWeek = ???
    });

    this.scheduleWeekSub = this.weekdataService
      .getSingleWeekGames()
      .subscribe((games: any) => {
        this.scheduleweek = games;
        console.log(this.scheduleweek);
      });

    this.userService.getSingleUserWeek(this.username).subscribe(data => {
      this.userWeek = data.map(x => ({
        username: x.username,
        userweek: x.userweeks.reduce((a, c) => {
          if (a && a.week === this.selectedweek) {
            return a;
          }
          if (c.week === this.selectedweek) {
            return c;
          }
        })
      }));
      console.log(this.userWeek);
      console.log(this.userWeek[0].username);
      console.log(this.userWeek[0].userweek.picks[0]);
      if (this.userWeek[0].userweek.picks.length === 0) {
        // first time for this user week, create it
        this.initializeUserWeekPicks();
      }
    });
  }

  ngOnInit() {}

  initializeUserWeekPicks() {
    // this.userWeek = { week: this.selectedweek, picks: [] };
    // this.userWeek.userweek.picks.length = this.scheduleweek.length;
    const weekLength = this.scheduleweek.length;
    this.userWeek.userweek.picks(weekLength).fill('');
    console.log(this.userWeek);
  }

  picked(index: number, team: string) {
    // console.log('before  ' + this.userWeek);
    this.userWeek[0].userweek.picks = this.replacePick(this.userWeek[0].userweek.picks, index, team);
    // console.log(this.userWeek[0].userweek.picks[index]);
    // console.log('after  ' + this.userWeek);
  }

  replacePick(array, index, value) {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
  }

  saveUserWeek() {
    const userWeekSave = {
      username: this.userWeek[0].username,
      week: this.selectedweek,
      picks: this.userWeek[0].userweek.picks
    };
    console.log(userWeekSave);
    this.userService.updateUser(userWeekSave).subscribe( response => {
      console.log(response);
      console.log('success');
    });
    this.back();
  }

  back() {
    this.router.navigate(['home']);
  }


  ngOnDestroy() {
    this.scheduleWeekSub.unsubscribe();
  }
}
