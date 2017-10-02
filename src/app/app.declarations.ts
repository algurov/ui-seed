
import { NotFound404Component } from './not-found404.component';
import { LoginViewComponent } from './views/login/login-view.component';
import { MainViewComponent } from './views/main/main-view.component';
import { PasswordViewComponent } from './views/password/password-view.component';
import { PanelComponent } from './views/panel/panel.component';
import { MessageDialogComponent } from './widgets/message-dialog/message-dialog.component';
import { UserEditComponent } from './views/user/user.edit.component';
import { UserCardComponent } from './widgets/user-card/user.card.component';
import { UserListComponent } from './views/user/list/user.list.component';
import { LoadingComponent } from './widgets/loading/loading.component';
import { TableComponent } from './widgets/table/table.component';
import { ConfirmDialog } from './widgets/confirm.dialog';
import { PasswordRecoverComponent } from './views/password/password-recover.component';
import { PasswordHeader } from './views/password/password-header';
import { PasswordEmailComponent } from './views/password/password-email.component';
import { PasswordFlowComponent } from './widgets/loading/password.flow.component';
import { SetPasswordFlowComponent } from './widgets/loading/set.password.component';
import { AddAgentComponent } from './views/agent/add.agent.component';
import { AgentListComponent } from './views/agent/list/agent.list.component';
import { AddAgentDialog } from './views/agent/add.agent.dialog';

export const APP_DECLARATIONS = [
  MainViewComponent,
  PasswordViewComponent,
  LoginViewComponent,
  NotFound404Component,
  PanelComponent,
  MessageDialogComponent,
  UserEditComponent,
  UserCardComponent,
  UserListComponent,
  LoadingComponent,
  TableComponent,
  ConfirmDialog,
  PasswordRecoverComponent,
  PasswordHeader,
  PasswordEmailComponent,
  PasswordFlowComponent,
  SetPasswordFlowComponent,
  AddAgentComponent,
  AgentListComponent,
  AddAgentDialog
];
