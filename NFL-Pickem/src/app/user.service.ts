import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  ObservableInput
} from 'rxjs';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { USERS } from './mock-users';
import { RESULTS } from './mock-results';
import { LowerCasePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any;
  singleWeekPicks: any;
  selectedweekSub: Subscription;
  private _HOST = environment._HOST;
  private singleweekPicksSubject = new BehaviorSubject<any>([]);
  private commishLoginSubject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  getAllUserWeek(): Observable<any> {
    return this.http.get(this._HOST + '/user');
  }

  getSingleUserWeek(username: string): Observable<any> {
    return this.http.get(this._HOST + '/user/' + username);
  }

  getSingleWeekPicks(): Observable<any> {
    return this.singleweekPicksSubject.asObservable();
  }

  sendSingleUserWeek(selectedweek: string) {
    this.getAllUserWeek().subscribe(data => {
      this.singleWeekPicks = data.map(x => ({
        username: x.username,
        weekscore: x.weekscore,
        userweek: x.userweeks.reduce((a, c) => {
          if (a && a.week === selectedweek) {
            return a;
          }
          if (c.week === selectedweek) {
            return c;
          }
        })
      }));
      this.singleweekPicksSubject.next(this.singleWeekPicks);
    });
  }

  addUser(username: any): Observable<any> {
    return this.http.post(this._HOST + '/user', username);
  }

  removeUser(username: any): Observable<any> {
    return this.http.post(this._HOST + '/user/delete', username);
  }

  userExists(username: any): Observable<any> {
    return this.http.get(this._HOST + '/user/exists/' + username);
  }

  updateUser(userpickSave: any): Observable<any> {
    return this.http.post(this._HOST + '/user/update', userpickSave);
  }

  updateUserWeekScore(userWeekScores: any): Observable<any> {
    return this.http.post(this._HOST + '/user/userweek/score', userWeekScores);
  }

  getCommishLogin(): Observable<any> {
    return this.commishLoginSubject.asObservable();
  }

  sendCommishLogin() {
    this.commishLoginSubject.next(true);
  }
}
