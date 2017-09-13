import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';
import { StringService } from './services/string-service';
import { AuthGuard } from './services/auth.guard';

export const APP_PROVIDERS = [
  UserActions,
  UserService,
  StringService,
  AuthGuard
];
