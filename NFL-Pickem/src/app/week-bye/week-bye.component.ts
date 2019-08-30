import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeekDataService } from '../week-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-week-bye',
  templateUrl: './week-bye.component.html',
  styleUrls: ['./week-bye.component.css']
})
export class WeekByeComponent implements OnInit, OnDestroy {
  byeteams: any = [];


  scheduleWeekByeSub: Subscription;

  constructor(private weekdataService: WeekDataService) {
    this.scheduleWeekByeSub = this.weekdataService.getByeTeamsWeek().subscribe(
      (byeteams: any) => {
        this.byeteams = byeteams;
      });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.scheduleWeekByeSub.unsubscribe();
  }
}
