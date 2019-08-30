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
  selector: 'app-bye-add',
  templateUrl: './bye-add.component.html',
  styleUrls: ['./bye-add.component.css']
})
export class ByeAddComponent implements OnInit {
  byeAddForm: FormGroup;
  teams = TEAMS;
  teamfilteredOptions: Observable<string[]>;

  constructor(
    private weekdataService: WeekDataService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public selectedweek: any,
    public dialogRef: MatDialogRef<ByeAddComponent>
  ) { }

  ngOnInit() {
    console.log(this.selectedweek);
    this.byeAddForm = this.formBuilder.group({
      team: ['', Validators.required]
    });
    this.teamfilteredOptions = this.byeAddForm.controls['team'].valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ?  this._filter(value) : [])
    );
  }

  saveByeTeam() {
    this.weekdataService.byeTeamAdd(this.selectedweek, this.byeAddForm.value).subscribe(
      res => {
        this.dialogRef.close();
        // this.weekdataService.sendByeTeams(this.selectedweek.selectedweek);
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
