import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { WeekDataService } from '../week-data.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TEAMS } from '../mock-teams';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {
  gameAddForm: FormGroup;
  teams = TEAMS;
  awayfilteredOptions: Observable<string[]>;
  homefilteredOptions: Observable<string[]>;

  constructor(
    private weekdataService: WeekDataService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public selectedweek: any,
    public dialogRef: MatDialogRef<GameAddComponent>
  ) { }

  ngOnInit() {
    console.log(this.selectedweek);
    this.gameAddForm = this.formBuilder.group({
      date: ['', Validators.required],
      start: ['', Validators.required],
      away: ['', Validators.required],
      home: ['', Validators.required]
    });
    this.awayfilteredOptions = this.gameAddForm.controls['away'].valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ?  this._filter(value) : [])
    );
    this.homefilteredOptions = this.gameAddForm.controls['home'].valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ?  this._filter(value) : [])
    );
  }

  saveGame() {
    this.weekdataService.gameAdd(this.selectedweek, this.gameAddForm.value).subscribe(
      res => {
        this.dialogRef.close();
        this.weekdataService.sendSingleWeek(this.selectedweek.selectedweek);
      },
      err => {}
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.teams.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  close() {
    this.dialogRef.close();
  }
}
