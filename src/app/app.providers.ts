import { UserService } from './services/user.service';
import { StringService } from './services/string.service';
import { DialogService } from './services/dialog.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { MainService } from './services/main.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { FlowService } from './services/flow.service';
import { PartnerService } from './services/partner.service';
import { SettingsService } from './services/settings.service';
import { TaxonomyService } from './services/taxonomy.service';
import { ApplicationService } from './services/application.service';
import { DataService } from './services/data.service';
import { RoleService } from './services/role.service';

export const APP_PROVIDERS = [
  UserService,
  StringService,
  AuthGuard,
  DialogService,
  AuthService,
  MainService,
  OAuthService,
  FlowService,
  PartnerService,
  SettingsService,
  TaxonomyService,
  ApplicationService,
  DataService,
  RoleService
];
