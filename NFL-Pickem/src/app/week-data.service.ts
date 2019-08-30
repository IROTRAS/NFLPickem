import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { SETUP_SEASON } from '../app/mock-setup-season';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeekDataService {
  private _HOST = environment._HOST;
  scheduleWeek: any;
  selectedWeekData: any = [];
  setupSeasonWeeks: any = SETUP_SEASON;

  private singleweekgamesSubject = new BehaviorSubject<any>(this.scheduleWeek);
  private byeTeamsSubject = new BehaviorSubject<any>(this.scheduleWeek);
  private selectedweekSubject = new BehaviorSubject<any>(this.scheduleWeek);
  private singleweekallSubject = new Subject<any>();
  private singleweekResultsSubject = new BehaviorSubject<any>(
    this.scheduleWeek
  );

  constructor(private http: HttpClient) {}

  getAllWeeks(): Observable<any> {
    // return of(this.schedule);
    return this.http.get(this._HOST + '/schedule');
  }

  getSingleWeekGames(): Observable<any> {
    return this.singleweekgamesSubject.asObservable();
  }

  getSingleWeekAll(): Observable<any> {
    return this.singleweekallSubject.asObservable();
  }

  sendSingleWeek(singleweek: string) {
    this.getAllWeeks().subscribe(data => {
      this.selectedWeekData = data.filter(week => {
        return week.week === singleweek;
      });
      this.singleweekgamesSubject.next(this.selectedWeekData[0].games);
      this.singleweekResultsSubject.next(this.selectedWeekData[0].results);
      this.singleweekallSubject.next(this.selectedWeekData);
      this.byeTeamsSubject.next(this.selectedWeekData[0].byeteams);
    });
  }

  getByeTeamsWeek(): Observable<any> {
    return this.byeTeamsSubject.asObservable();
  }

  getSelectedWeek(): Observable<any> {
    return this.selectedweekSubject.asObservable();
  }

  sendSelectedWeek(singleweek: any) {
    this.selectedweekSubject.next(singleweek);
  }

  gameAdd(selectedweek: string, game: any): Observable<any> {
    const data = { week: selectedweek, game: game };
    return this.http.post(this._HOST + '/schedule/gameadd', data);
  }

  byeTeamAdd(selectedweek: string, team: any): Observable<any> {
    const data = { week: selectedweek, team: team };
    return this.http.post(this._HOST + '/schedule/byeadd', data);
  }

  resultsAdd(selectedweek: string, results: any): Observable<any> {
    console.log('updating results for week');
    const data = { week: selectedweek, results: results };
    return this.http.post(this._HOST + '/schedule/resultsadd', data);
  }

  setupSeason(): Observable<any> {
    console.log('setting up season');
    // const data = {
    //     week: '1',
    //     games: [],
    //     byeteams: []
    //     };
    console.log(this.setupSeasonWeeks);
    const data = this.setupSeasonWeeks;
    return this.http.post(this._HOST + '/schedule/setupSeason', data);
  }

  deleteSeason(): Observable<any> {
    console.log('deleting season');
    // const data = {
    //     week: '1',
    //     games: [],
    //     byeteams: []
    //     };
    console.log(this.setupSeasonWeeks);
    const data = this.setupSeasonWeeks;
    return this.http.post(this._HOST + '/schedule/deleteSeason', data);
  }

  getSingleWeekResults(): Observable<any> {
    return this.singleweekResultsSubject.asObservable();
  }

  setWeekClosed(selectedweek: string): Observable<any> {
    const closedata = { selectedweek: selectedweek };
    return this.http.post(this._HOST + '/schedule/weekClose', closedata);
  }

  setWeekActive(nextweek: string): Observable<any> {
    const activedata = { selectedweek: nextweek };
    return this.http.post(this._HOST + '/schedule/weekActive', activedata);
  }

}
