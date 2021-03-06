/**
 * This module is the entry for your App.
 *
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.
 */

import { ApplicationRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { Store } from '@ngrx/store';

import { APP_DECLARATIONS } from './app.declarations';
import { APP_ENTRY_COMPONENTS } from './app.entry-components';
import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';
import { MATERIAL_COMPATIBILITY_MODE , MAT_DATE_LOCALE } from '@angular/material';
import { routes } from './app.routing';

import { AppComponent } from './app.component';

import { AppState } from './reducers';
import { SeedMaterialModule } from './seed.material.module';
import { TagInputModule } from 'ngx-chips';
import { MatPaginatorModule, MatPaginatorIntl} from '@angular/material';
import { PaginatorRu } from './paginator.ru';

@NgModule({
  declarations: [
    AppComponent,
    APP_DECLARATIONS
  ],
  entryComponents: [APP_ENTRY_COMPONENTS],
  imports: [
    TagInputModule,
    CommonModule,
    HttpModule,
    SeedMaterialModule,
    APP_IMPORTS,
    IdlePreloadModule.forRoot(), // forRoot ensures the providers are only created once
    RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  providers: [APP_PROVIDERS,{provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}, {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}, { provide: MatPaginatorIntl, useClass: PaginatorRu}]
})

export class AppModule {
  constructor(public appRef: ApplicationRef,
    private _store: Store<AppState>) { }

  hmrOnInit(store) {
    if (!store || !store.rootState) return;

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this._store.take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
