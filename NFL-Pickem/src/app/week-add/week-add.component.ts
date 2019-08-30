import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeekDataService } from '../week-data.service';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { GameAddComponent } from '../game-add/game-add.component';
import { ByeAddComponent } from '../bye-add/bye-add.component';
import { WeekAddFileComponent } from '../week-add-file/week-add-file.component';

@Component({
  selector: 'app-week-add',
  templateUrl: './week-add.component.html',
  styleUrls: ['./week-add.component.css']
})
export class WeekAddComponent implements OnInit, OnDestroy {
  selectedweek: string;
  allweeks = [];
  weeks = [];
  weekGames: any;

  byeteams: any = [];
  subscriptions: Subscription = new Subscription();

  addGameDialogRef: MatDialogRef<GameAddComponent>;
  addByeTeamsDialogRef: MatDialogRef<ByeAddComponent>;
  addWeekFromFileDialogRef: MatDialogRef<WeekAddFileComponent>;

  constructor(
    private weekdataService: WeekDataService,
    public dialog: MatDialog
  ) {
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
  }

  ngOnInit() {
    this.getAllWeeks();
  }

  getAllWeeks(): void {
    this.weekdataService.getAllWeeks().subscribe(weeks => {
      this.allweeks = weeks;
      for (const w of this.allweeks) {
        this.weeks.push(w.week);
      }
    });
  }

  weekSelected(selectedweek: string) {
    this.weekdataService.sendSelectedWeek(selectedweek);
    this.weekdataService.sendSingleWeek(selectedweek);
  }

  addGameDialog() {
    this.addGameDialogRef = this.dialog.open(GameAddComponent, {
      hasBackdrop: true,
      autoFocus: true,
      disableClose: true,
      data: { selectedweek: this.selectedweek }
    });
  }

  addByeTeamsDialog() {
    this.addByeTeamsDialogRef = this.dialog.open(ByeAddComponent, {
      hasBackdrop: true,
      autoFocus: true,
      disableClose: true,
      data: { selectedweek: this.selectedweek }
    });
  }

  addWeekFromFileDialog() {
    this.addWeekFromFileDialogRef = this.dialog.open(WeekAddFileComponent, {
      hasBackdrop: true,
      autoFocus: true,
      disableClose: true,
      data: { selectedweek: this.selectedweek }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
