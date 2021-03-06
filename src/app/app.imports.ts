import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';
//import { MaterialModule } from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { rootReducer } from './reducers';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TreeModule } from 'angular2-tree-component';
//import { TagInputModule } from 'ng2-tag-input';


const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
  // LoginViewComponent,
  // MainViewComponent,
  // PasswordViewComponent,
  //TagInputModule,
  BrowserAnimationsModule,
  //EffectsModule.run(UserEffects),
//  MaterialModule,
  TreeModule,
  ReactiveFormsModule,
  FormsModule,
  FlexLayoutModule,
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer),
  STORE_DEV_TOOLS_IMPORTS,
  //StoreDevToolsModule
];
