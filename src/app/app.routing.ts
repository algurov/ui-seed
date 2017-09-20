/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { LoginViewComponent } from './views/login/login-view.component';
import { NotFound404Component } from './not-found404.component';
import { AuthGuard } from './services/auth.guard';
import { MainViewComponent } from './views/main/main-view.component';
import { PasswordViewComponent } from './views/password/password-view.component';
import { PanelComponent } from './views/panel/panel.component';
import { UserEditComponent } from './views/user/user.edit.component';
import { UserListComponent } from './views/user/list/user.list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main'},

  { path: 'main', component: MainViewComponent, canActivate: [AuthGuard],
    children: [
      { path: 'user', component: UserListComponent},
      { path: 'user/edit', component: UserEditComponent}
  ]
  },

  { path: 'login', redirectTo: 'main'},

  { path: 'password', component: PasswordViewComponent}
];
