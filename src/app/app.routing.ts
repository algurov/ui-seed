/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { LoginViewComponent } from './views/login/login-view.component';
import { NotFound404Component } from './not-found404.component';
import { AuthGuard } from './services/auth.guard';
import { MainViewComponent } from './views/main/main-view.component';
import { PasswordViewComponent } from './views/password/password-view.component';

export const routes: Routes = [
  { path: '', component: MainViewComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginViewComponent},
  { path: 'password', component: PasswordViewComponent}
];
