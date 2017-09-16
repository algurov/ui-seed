import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class MainService {

  public toggleSidenav: EventEmitter<any> = new EventEmitter<any>();
}
