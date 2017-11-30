import { Injectable, EventEmitter } from '@angular/core';



@Injectable()
export class MainService {


  public toggleSidenav: EventEmitter<any> = new EventEmitter<any>();
  public partnerAdded: EventEmitter<any> = new EventEmitter<any>();
  public partnerUpdated: EventEmitter<any> = new EventEmitter<any>();
  public partnerDeleted: EventEmitter<any> = new EventEmitter<any>();

  public partnerSelectedForUser: EventEmitter<any> = new EventEmitter<any>();
  public branchOfficeSelectedForUser: EventEmitter<any> = new EventEmitter<any>();

  public populateSettings: EventEmitter<any> = new EventEmitter<any>();

  public menuActionPerformed: EventEmitter<any> = new EventEmitter<any>();

  public productParamAdded: EventEmitter<any> = new EventEmitter<any>();

  public standardParameterAdded: EventEmitter<any> = new EventEmitter<any>();

  public applicationRemoved: EventEmitter<any> = new EventEmitter<any>();
  public applicationLoaded: EventEmitter<any> = new EventEmitter<any>();

  public actLoaded: EventEmitter<any> = new EventEmitter<any>();
  public protocolLoaded: EventEmitter<any> = new EventEmitter<any>();

  public directionLoaded: EventEmitter<any> = new EventEmitter<any>();

  public updateAssignmentTreeItem: EventEmitter<any> = new EventEmitter<any>();
  public standardChecked: EventEmitter<any> = new EventEmitter<any>();
  public contractChecked: EventEmitter<any> = new EventEmitter<any>();

  public menuChange: EventEmitter<any> = new EventEmitter<any>();

}
