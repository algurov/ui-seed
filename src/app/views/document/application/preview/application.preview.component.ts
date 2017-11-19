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
  observableGroup: Observable<any> = new Observable<any>();
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router) {
      this.dialogService.showBlocker();
      this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.documentService.getApplicationById(this.id).subscribe(res=> {
           this.data = res;
           this.dialogService.block = false;
         });
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

  ngOnInit() {
    this.dialogService.showBlocker();
    this.documentService.getActListForApplication(this.id).subscribe(res => {
       this.actList = res.content;
    });
    this.documentService.getAssignmentListByApplication(this.id).subscribe(res => {
      this.assignmentList = res.content;
      this.dialogService.hideBlocker();
    });
  }

}
