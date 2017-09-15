import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class MainService {

  public toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
}
