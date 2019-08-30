import { Component, OnInit } from '@angular/core';
import { WeekDataService } from '../week-data.service';
import { UserService } from '../user.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-week-selection',
  templateUrl: './week-selection.component.html',
  styleUrls: ['./week-selection.component.css']
})
export class WeekSelectionComponent implements OnInit {
  selectedweek: string;
  allweeks = [];
  weeks = [];
  activeWeek: string;

  constructor(
    private weekdataService: WeekDataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllWeeks();
  }

  getAllWeeks(): void {
    this.weekdataService.getAllWeeks().subscribe(weeks => {
      console.log(weeks);
      this.allweeks = weeks;
      for (const w of this.allweeks) {
        this.weeks.push(w.week);
        if (!w.active) continue;
        this.activeWeek = w.week;
        this.currentWeek();
      }
    });
  }

  currentWeek() {
    this.selectedweek = this.activeWeek;
    this.weekSelected();
  }

  weekSelected() {
    this.weekdataService.sendSingleWeek(this.selectedweek);
    this.weekdataService.sendSelectedWeek(this.selectedweek);
    this.userService.sendSingleUserWeek(this.selectedweek);
  }
}
