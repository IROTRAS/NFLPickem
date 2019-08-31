import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserWeekPicksComponent } from './user-week-picks/user-week-picks.component';
import { HomeComponent } from './home/home.component';
import { WeekAddComponent } from './week-add/week-add.component';
import { ResultsComponent } from './results/results.component';
import { SeasonsComponent } from './seasons/seasons.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'picks/:username/:week', component: UserWeekPicksComponent },
  { path: 'weeks', component: WeekAddComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
