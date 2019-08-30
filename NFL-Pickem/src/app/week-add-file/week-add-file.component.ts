import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeekDataService } from '../week-data.service';

@Component({
  selector: 'app-week-add-file',
  templateUrl: './week-add-file.component.html',
  styleUrls: ['./week-add-file.component.css']
})
export class WeekAddFileComponent implements OnInit {
  @ViewChild('file') file;
  public files: Set<File> = new Set();

  constructor(
    private weekdataService: WeekDataService,
    @Inject(MAT_DIALOG_DATA) public selectedweek: any,
    public dialogRef: MatDialogRef<WeekAddFileComponent>
    ) { }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
