import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeekDataService } from '../week-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-week-games',
  templateUrl: './week-games.component.html',
  styleUrls: ['./week-games.component.css']
})
export class WeekGamesComponent implements OnInit, OnDestroy {
  games: any = [];


  scheduleWeekSub: Subscription;

  constructor(private weekdataService: WeekDataService) {
    this.scheduleWeekSub = this.weekdataService.getSingleWeekGames().subscribe(
      (games: any) => {
        this.games = games;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.scheduleWeekSub.unsubscribe();
  }
}
