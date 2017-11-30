import { Component } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { SettingsService } from '../../../../services/settings.service';
import { PartnerService } from '../../../../services/partner.service';
import { DialogService } from '../../../../services/dialog.service';
import { DocumentService } from '../../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'application-preview',
  templateUrl: './application.preview.component.html',
  styleUrls: ['./application.preview.component.scss']
})
export class ApplicationPreviewComponent {
  id: number;
  data: any = {};
  assignmentList: Array<any> = new Array<any>();
  actList: Array<any> = new Array<any>();
  protocolList: Array<any> = new Array<any>();
  observableGroup: Observable<any> = new Observable<any>();
  subscriptions = [];
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router) {
      this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
        if (action == 'ADD_ACT') {
          this.addAct();
        }
      }));
      this.dialogService.showBlocker();
      this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.documentService.getApplicationById(this.id).subscribe(res=> {
           this.data = res;
           this.dialogService.block = false;
         });
       } else {
         this.dialogService.hideBlocker();
       }
      });
    }

  addAct() {
    this.documentService.createAct(this.id).subscribe(res => {
      this.router.navigate(['main/document/act/' + res.id]);
    });
  }

  removeAct(act) {
    this.dialogService.showConfirm('Удаление акта отбора пробы', 'Подтвердиде удаление акта отбора пробы').subscribe(res => {
      if (res) {
        this.dialogService.showBlocker();
        this.documentService.deleteAct(act).subscribe(res => {

        this.actList.splice(this.actList.findIndex(item => item.id == act.id), 1);
        this.dialogService.hideBlocker();
        });
      }
    });

  }

  removeAssignment(assignment) {
    this.dialogService.showConfirm('Удаление направления', 'Подтвердиде удаление направления').subscribe(res => {
      if (res) {
        this.dialogService.showBlocker();
        this.documentService.deleteAssignment(assignment).subscribe(res => {

        this.assignmentList.splice(this.assignmentList.findIndex(item => item.id == assignment.id), 1);
        this.dialogService.hideBlocker();
        });
      }
    });
  }

  removeProtocol(protocol) {
      this.dialogService.showConfirm('Удаление направления', 'Подтвердиде удаление направления').subscribe(res => {
        if (res) {
          this.dialogService.showBlocker();
          this.documentService.deleteProtocol(protocol).subscribe(res => {
          this.protocolList.splice(this.protocolList.findIndex(item => item.id == protocol.id), 1);
          this.dialogService.hideBlocker();
          });
        }
      });

  }
  openProtocol(id) {
      this.router.navigate(['main/document/protocol/'+ id]);
  }

  addProtocol(act) {
      this.router.navigate(['main/document/protocol'], { queryParams: { actId: act.id } });
  }

  addDirection(act) {
    this.documentService.createAssignment(act.id).subscribe(res => {
        this.router.navigate(['main/document/assignment/' + res.id]);
    });
  }

  openAct(id) {
    this.router.navigate(['main/document/act/' + id]);
  }

  openAssignment(id) {
    this.router.navigate(['main/document/assignment/' + id]);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  ngOnInit() {
    this.mainService.menuChange.emit({name: 'APPLICATION_VIEW'});
    this.dialogService.showBlocker();
    this.documentService.getActListForApplication(this.id).subscribe(res => {
       this.actList = res.content;
    });
    this.documentService.getAssignmentListByApplication(this.id).subscribe(res => {
      this.assignmentList = res.content;
    });
    this.documentService.getProtocolListByApplication(this.id).subscribe(res => {
      this.protocolList = res.content;
      this.dialogService.hideBlocker();
    });
  }

}
