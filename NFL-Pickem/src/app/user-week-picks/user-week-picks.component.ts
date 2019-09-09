import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WeekDataService } from '../week-data.service';
import { UserService } from '../user.service';
import { $ } from 'protractor';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-week-picks',
  templateUrl: './user-week-picks.component.html',
  styleUrls: ['./user-week-picks.component.css']
})
export class UserWeekPicksComponent implements OnInit, OnDestroy {
  username: string;
  selectedweek: string; // the specific week
  scheduleweek: any; // schedule week object passed in
  scheduleGamesTimes: any = [];
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
    private authService: AuthService,
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
        this.scheduleGamesTimes = this.scheduleweek.map(game => {
          return this.getAsDate(game.date, game.start);
        });
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
  }

  picked(index: number, team: string) {
    const token = this.authService.getIdToken();
    const user = this.authService.getUserFromToken(token);
    const rightNow = new Date();
    if (
      this.userWeek[0].username === user.username &&
      rightNow <= this.scheduleGamesTimes[index]
    ) {
      this.userWeek[0].userweek.picks = this.replacePick(
        this.userWeek[0].userweek.picks,
        index,
        team
      );
    }
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
    this.userService.updateUser(userWeekSave).subscribe(response => {
      console.log(response);
      console.log('success');
    });
    this.back();
  }

  back() {
    this.router.navigate(['home']);
  }

  getAsDate(day, time) {
    const hours = Number(time.match(/^(\d+)/)[1]);
    const minutes = Number(time.match(/:(\d+)/)[1]);
    const AMPM = time.match(/\s(.*)$/)[1];
    // if (AMPM === "pm" && hours<12)
    //   {hours = hours+12};
    // if(AMPM == "am" && hours==12) hours = hours-12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) {
      sHours = '0' + sHours;
    }
    if (minutes < 10) {
      sMinutes = '0' + sMinutes;
    }
    time = sHours + ':' + sMinutes + ':00';
    const d = new Date(day);
    const n = d.toISOString().substring(0, 10);
    const newDate = new Date(n + 'T' + time);
    return newDate;
  }

  ngOnDestroy() {
    this.scheduleWeekSub.unsubscribe();
  }
}
