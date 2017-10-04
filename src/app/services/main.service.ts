import { Injectable, EventEmitter } from '@angular/core';



@Injectable()
export class MainService {


  public toggleSidenav: EventEmitter<any> = new EventEmitter<any>();
  public partnerAdded: EventEmitter<any> = new EventEmitter<any>();
  public partnerUpdated: EventEmitter<any> = new EventEmitter<any>();
  public partnerDeleted: EventEmitter<any> = new EventEmitter<any>();
}
