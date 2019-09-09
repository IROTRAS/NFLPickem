import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatButtonModule,
  MatDialogModule,
  MatDialog,
  MatToolbar,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatMenuModule,
  MatSidenavModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatTableModule
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { WeekDataService } from './week-data.service';
import { UserService } from './user.service';

import { WeekSelectionComponent } from './week-selection/week-selection.component';
import { WeekGamesComponent } from './week-games/week-games.component';
import { WeekByeComponent } from './week-bye/week-bye.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RemoveUserComponent } from './remove-user/remove-user.component';
import { UserWeekPicksComponent } from './user-week-picks/user-week-picks.component';
import { HomeComponent } from './home/home.component';
import { WeekAddComponent } from './week-add/week-add.component';
import { ByeAddComponent } from './bye-add/bye-add.component';
import { ResultsComponent } from './results/results.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { GameAddComponent } from './game-add/game-add.component';
import { CommishLoginComponent } from './commish-login/commish-login.component';
import { WeekAddFileComponent } from './week-add-file/week-add-file.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    WeekSelectionComponent,
    WeekGamesComponent,
    WeekByeComponent,
    UsersComponent,
    AddUserComponent,
    RemoveUserComponent,
    UserWeekPicksComponent,
    HomeComponent,
    WeekAddComponent,
    ByeAddComponent,
    ResultsComponent,
    SeasonsComponent,
    GameAddComponent,
    CommishLoginComponent,
    WeekAddFileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTableModule,
    MatAutocompleteModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTableModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AddUserComponent,
    GameAddComponent,
    ByeAddComponent,
    LoginComponent,
    RemoveUserComponent,
    CommishLoginComponent,
    WeekAddFileComponent
  ],
  providers: [
    WeekDataService,
    UserService,
    AuthService,
    MatDialogModule,
    MatDialog,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
