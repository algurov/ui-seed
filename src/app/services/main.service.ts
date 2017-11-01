import { Injectable, EventEmitter } from '@angular/core';



@Injectable()
export class MainService {


  public toggleSidenav: EventEmitter<any> = new EventEmitter<any>();
  public partnerAdded: EventEmitter<any> = new EventEmitter<any>();
  public partnerUpdated: EventEmitter<any> = new EventEmitter<any>();
  public partnerDeleted: EventEmitter<any> = new EventEmitter<any>();
  public partnerSelectedForUser: EventEmitter<any> = new EventEmitter<any>();
  public populateSettings: EventEmitter<any> = new EventEmitter<any>();

  public menuActionPerformed: EventEmitter<any> = new EventEmitter<any>();

  public productParamAdded: EventEmitter<any> = new EventEmitter<any>();

  public standardParameterAdded: EventEmitter<any> = new EventEmitter<any>();

  public applicationRemoved: EventEmitter<any> = new EventEmitter<any>();
  public applicationLoaded: EventEmitter<any> = new EventEmitter<any>();

}
