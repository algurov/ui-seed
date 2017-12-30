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
import { RoleListComponent } from './views/role/role.list.component';
import { ActComponent } from './views/document/act/act.component';
import { ApplicationPreviewComponent } from './views/document/application/preview/application.preview.component';
import { DirectionComponent } from './views/document/direction/direction.component';
import { ProtocolComponent } from './views/document/protocol/protocol.component';
import { StandardEditComponent } from './views/taxonomy/standard/standard.edit.component';
import { PropertyEditComponent } from './views/taxonomy/standard/property.edit.component';
import { StandardListComponent } from './views/taxonomy/standard/standard.list.component';
import { CertificateComponent } from './views/document/certificate/certificate.component';
import { PropertyListComponent } from './views/taxonomy/property/property.list.component';
import { GenaralPropertyEditComponent } from './views/taxonomy/property/general.property.edit.component';
import { UnitListComponent } from './views/taxonomy/unit/unit.list.component';
import { UnitEditComponent } from './views/taxonomy/unit/unit.edit.component';
import { AnalysisCardComponent } from './views/document/analysis/card/analysis.card.component';
import { CalculationComponent } from './views/document/calculation/calculation.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main'},

  { path: 'main', component: MainViewComponent, canActivate: [AuthGuard],
    data: {breadcrumb: 'Кабинет'},
    children: [
      { path: 'settings', component: SettingsListComponent, data: {breadcrumb: 'Настройки'}},
      { path: 'settings/roles', component: RoleListComponent, data: {breadcrumb: 'Роли'}},
      { path: 'settings/locations', redirectTo: 'settings'},
      { path: 'settings/user', component: UserListComponent,  data: {breadcrumb: 'Пользователи'}},
      { path: 'settings/user/edit/:id', component: UserEditComponent},
      { path: 'settings/user/add', component: UserEditComponent},
      { path: 'agent', component: PartnerListComponent,  data: {breadcrumb: 'Контрагенты'}},
      { path: 'settings/taxonomy', component: TaxonomyAllListComponent, data: {breadcrumb: 'Справочники'}},
      //{ path: 'settings/taxonomy/:tax', component: TaxonomyItemComponent},
      { path: 'settings/taxonomy/standard-list', component: StandardListComponent},
        { path: 'settings/taxonomy/standard/:id', component: StandardEditComponent},
        { path: 'settings/taxonomy/standard/:id/property', component: PropertyEditComponent},
          { path: 'settings/taxonomy/standard', component: StandardEditComponent},
      { path: 'settings/taxonomy/property-list', component: PropertyListComponent},
      { path: 'settings/taxonomy/general-property', component: GenaralPropertyEditComponent},
      { path: 'settings/taxonomy/general-property/:id', component: GenaralPropertyEditComponent},
      { path: 'settings/taxonomy/unit-list', component: UnitListComponent},
      { path: 'settings/taxonomy/unit', component: UnitEditComponent},
      { path: 'settings/taxonomy/unit/:id', component: UnitEditComponent},
      { path: 'document', component: DocumentListComponent, data: {breadcrumb: 'Документы'}},
      { path: 'document/application', component: ApplicationComponent, data: {breadcrumb: 'Заявка'}},
      { path: 'document/application/:id', component: ApplicationComponent, data: {breadcrumb: 'Заявка'}},
      { path: 'document/application/:id/view', component: ApplicationPreviewComponent, data: {breadcrumb: 'Заявка'}},
      { path: 'document/act', component: ActComponent, data: {breadcrumb: 'Акт пробы'}},
      { path: 'document/act/:id', component: ActComponent, data: {breadcrumb: 'Акт пробы'}},
      { path: 'document/certificate', component: CertificateComponent, data: {breadcrumb: 'Сертификат'}},
      { path: 'document/certificate/:id', component: CertificateComponent, data: {breadcrumb: 'Сертификат'}},
      { path: 'document/assignment/:id', component: DirectionComponent, data: {breadcrumb: 'Направление'}},
      { path: 'document/assignment', component: DirectionComponent, data: {breadcrumb: 'Направление'}},
      { path: 'document/protocol/:id', component: ProtocolComponent, data: {breadcrumb: 'Протокол'}},
      { path: 'document/protocol', component: ProtocolComponent, data: {breadcrumb: 'Протокол'}},
      { path: 'document/analysis-card/:id', component: AnalysisCardComponent},
      { path: 'document/calculation', component: CalculationComponent}
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
