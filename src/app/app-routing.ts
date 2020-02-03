import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomepageComponent } from './homepage/homepage.component';

import { UserPanelComponent } from './user-panel/user-panel.component';
import { BetsComponent } from './bets/bets.component';
import { ResultsComponent } from './results/results.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { AuthGuardService } from './services/auth.guard.service';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: SigninComponent},
  {path: 'create', component: SignupComponent },
  {path: 'user-panel', component: UserPanelComponent, canActivate: [AuthGuardService], },
  {path: 'bets', component: BetsComponent, canActivate: [AuthGuardService], },
  {path: 'results', component: ResultsComponent, canActivate: [AuthGuardService], },
  {path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuardService], },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
