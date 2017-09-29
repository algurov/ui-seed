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
import { LoadingComponent } from './widgets/loading/loading.component';
import { PasswordFlowComponent } from './widgets/loading/password.flow.component';
import { PasswordRecoverComponent } from './views/password/password-recover.component';
import { PasswordEmailComponent } from './views/password/password-email.component';
import { SetPasswordFlowComponent } from './widgets/loading/set.password.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main'},

  { path: 'main', component: MainViewComponent, //canActivate: [AuthGuard],
    children: [
      { path: 'user', component: UserListComponent},
      { path: 'user/edit/:id', component: UserEditComponent},
      { path: 'user/add', component: UserEditComponent}
  ]
  },
  { path: 'registrationCompletionByLink', component: LoadingComponent},
  { path: 'startPasswordRecovery', component: PasswordFlowComponent},
  { path: 'passwordResetByLink', component: SetPasswordFlowComponent},

  { path: 'login', redirectTo: 'main'},

  { path: 'password', component: PasswordViewComponent},
  { path: 'password-recovery', component: PasswordRecoverComponent},
  { path: 'password-email', component: PasswordEmailComponent}
];
