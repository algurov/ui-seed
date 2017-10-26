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
import { PartnerListComponent } from './views/partner/list/partner.list.component';
import { TaxonomyAllListComponent } from './views/taxonomy/taxonomy.all.list.component';
import { TaxonomyComponent } from './views/taxonomy/taxonomy.component/taxonomy.component';
import { TaxonomyItemComponent } from './views/taxonomy/taxonomy.item/taxonomy.item.component';
import { DocumentListComponent } from './views/document/document.list.component';
import { ApplicationComponent } from './views/document/application/application.component';
import { SettingsListComponent } from './views/settings/settings.list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main'},

  { path: 'main', component: MainViewComponent, canActivate: [AuthGuard],
    data: {breadcrumb: 'Кабинет'},
    children: [
      { path: 'settings', component: SettingsListComponent, data: {breadcrumb: 'Настройки'}},
      { path: 'settings/user', component: UserListComponent,  data: {breadcrumb: 'Пользователи'}},
      { path: 'settings/user/edit/:id', component: UserEditComponent},
      { path: 'settings/user/add', component: UserEditComponent},
      { path: 'agent', component: PartnerListComponent,  data: {breadcrumb: 'Контрагенты'}},
      { path: 'settings/taxonomy', component: TaxonomyAllListComponent, data: {breadcrumb: 'Справочники'}},
      { path: 'settings/taxonomy/:tax', component: TaxonomyItemComponent},
      { path: 'document', component: DocumentListComponent, data: {breadcrumb: 'Документы'}},
      { path: 'document/application', component: ApplicationComponent, data: {breadcrumb: 'Заявка'}},
      { path: 'document/application/:id', component: ApplicationComponent, data: {breadcrumb: 'Заявка'}}
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
