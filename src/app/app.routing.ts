/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { LoginViewComponent } from './views/login/login-view.component';
import { NotFound404Component } from './not-found404.component';
import { AuthGuard } from './services/auth.guard';
import { MainViewComponent } from './views/main/main-view.component';
import { PasswordViewComponent } from './views/password/password-view.component';
import { PanelComponent } from './views/panel/panel.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},

  { path: 'main', component: MainViewComponent, canActivate: [AuthGuard],
    children: [{ path: 'sub', component: PanelComponent}]
  },

  { path: 'login', component: LoginViewComponent},

  { path: 'password', component: PasswordViewComponent}
];
