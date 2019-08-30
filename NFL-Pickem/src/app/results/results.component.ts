import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeekDataService } from '../week-data.service';
import { UserService } from '../user.service';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  selectedweek: string;
  scheduleweek: string;
  allweeks = [];
  weeks = [];
  test = [];
  allUserSingleWeek: any;
  allUserSingleWeekScores: any = [];
  weekGames: any;
  byeteams: any = [];
  subscriptions: Subscription = new Subscription();
  results: any = [];

  constructor(
    private weekdataService: WeekDataService,
    private userService: UserService,
    private router: Router
  ) {
    this.subscriptions.add(
      this.userService.getSingleWeekPicks().subscribe((userpicks: any) => {
        this.allUserSingleWeek = userpicks;
        console.log(this.allUserSingleWeek);
        console.log('test subscribe all user single week');
      })
    );
    this.subscriptions.add(
      this.weekdataService.getByeTeamsWeek().subscribe((byeteams: any) => {
        this.byeteams = byeteams;
      })
    );
    this.subscriptions.add(
      this.weekdataService.getSingleWeekGames().subscribe((weekGames: any) => {
        this.weekGames = weekGames;
      })
    );
    this.subscriptions.add(
      this.weekdataService.getSelectedWeek().subscribe((selectedweek: any) => {
        this.selectedweek = selectedweek;
      })
    );
    this.subscriptions.add(
      this.weekdataService.getSingleWeekResults().subscribe((results: any) => {
        this.results = results;
        console.log(this.results);
        // if weekResults is first time then create
        if (this.results.length === 0) {
          this.initializeResults();
        }
      })
    );
  }

  ngOnInit() {
    this.getAllWeeks();
  }

  getAllWeeks(): void {
    this.weekdataService.getAllWeeks().subscribe(weeks => {
      this.allweeks = weeks;
      console.log(this.allweeks);
      for (const w of this.allweeks) {
        this.weeks.push(w.week);
      }
    });
  }

  weekSelected(selectedweek: string) {
    this.weekdataService.sendSelectedWeek(selectedweek);
    this.weekdataService.sendSingleWeek(selectedweek);
    this.userService.sendSingleUserWeek(selectedweek);
  }

  initializeResults() {
    this.results.length = this.weekGames.length;
    this.results.fill('');
  }

  picked(index: number, team: string) {
    this.results = this.replacePick(this.results, index, team);
    // this.weekGames.away = this.replacePick(this.weekGames, index, team);
  }

  replacePick(array, index, value) {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
  }

  saveResults() {
    // console.log(this.selectedweek)
    // console.log(this.selectedResults)
    this.weekdataService.resultsAdd(this.selectedweek, this.results).subscribe(
      response => {
        console.log(response);
        console.log('success');
      },
      err => {},
      () => {}
    );
  }

  back() {
    this.router.navigate(['home']);
  }

  closeWeek() {
    let index = this.weeks.indexOf(this.selectedweek);
    const nextweekindex = (index += 1);
    const nextweek = this.weeks[nextweekindex];
    this.stageUserWeekScore(this.allUserSingleWeek, index);
    // console.log('testing closing the week');
    // console.log(this.selectedweek);
    // console.log('all weeks ' + this.allweeks);
    console.log('week scores array ');
    console.log(this.allUserSingleWeekScores);

    this.weekdataService
      .setWeekClosed(this.selectedweek)
      .subscribe(res => console.log(res));
    this.userService
      .updateUserWeekScore(this.allUserSingleWeekScores)
      .subscribe(response => console.log(response));
    this.weekdataService
      .setWeekActive(nextweek)
      .subscribe(response => console.log(response));
  }

  stageUserWeekScore(allUserSingleWeek: Array<any>, index: Number) {
    this.allUserSingleWeekScores = allUserSingleWeek.map(
      (allUserSingleWeek: any) => ({
        updateOne: {
          filter: {
            username: allUserSingleWeek.username,
            'userweeks.week': allUserSingleWeek.userweek.week
          },
          update: {
            $set: {
              'userweeks.$[index].score': allUserSingleWeek.weekscore
            }
          },
          arrayFilters: [
            { 'index.week': { $eq: allUserSingleWeek.userweek.week } }
          ]
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
