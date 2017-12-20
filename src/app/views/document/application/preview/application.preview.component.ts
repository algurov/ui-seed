import { Component } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { SettingsService } from '../../../../services/settings.service';
import { PartnerService } from '../../../../services/partner.service';
import { DialogService } from '../../../../services/dialog.service';
import { DocumentService } from '../../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  certificateList: Array<any> = new Array<any>();
  analysisCardList: Array<any> = new Array<any>();
  observableGroup: Observable<any> = new Observable<any>();
  subscriptions = [];
  signList = [];
  actSign = {};
  certificateSign = {};
  protocolSign = {};
  assignmentSign = {};
  analysisCardSign = {};
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer) {
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
         this.documentService.getSignListByDocumentId(this.id).subscribe(res => {
           this.signList = res.content;
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

  removeCertificate(certificate) {
    this.dialogService.showConfirm('Удаление сертификата', 'Подтвердиде удаление сертификата').subscribe(res => {
      if (res) {
        this.dialogService.showBlocker();
        this.documentService.deleteCertificate(certificate).subscribe(res => {
        this.certificateList.splice(this.certificateList.findIndex(item => item.id == certificate.id), 1);
        this.dialogService.hideBlocker();
        });
      }
    });
  }

  removeAnalysisCard(analysisCard) {
    this.dialogService.showConfirm('Удаление карточки анализа', 'Подтвердиде удаление карточки анализа').subscribe(res => {
      if (res) {
        this.dialogService.showBlocker();
        this.documentService.deleteAnalysisCard(analysisCard).subscribe(res => {
        this.analysisCardList.splice(this.analysisCardList.findIndex(item => item.id == analysisCard.id), 1);
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

  openAnalysisCard(id) {
    this.router.navigate(['main/document/analysis-card/' + id]);
  }

  openCertificate(id) {
    this.router.navigate(['main/document/certificate/'+ id]);
  }

  createPdfReport(act) {
      this.documentService.createPdfReport(act).subscribe(res => {
    //     var blob = new Blob([res._body], { type: 'application/pdf'});
    // var url= window.URL.createObjectURL(blob);
    // window.open(url);
//         console.log(res);
        const pdfUrl = (window.URL || window['webkitURL']).createObjectURL(new Blob([res._body], { type: 'application/pdf' }));
const anchor = document.createElement('a');
anchor.href = pdfUrl;
anchor.setAttribute("download", 'samplingAct'+ act.id +'.pdf');
anchor.click();
        // let url = window.URL.createObjectURL(new Blob([res], {type: 'application/pdf'}));
        // this.sanitizer.bypassSecurityTrustUrl(url);
      });
  }

  addCertificate(act) {
    this.dialogService.showCertificateType().subscribe(res => {
      if (res) {
        this.dialogService.showBlocker();
        this.documentService.createCerificate(act.id, res).subscribe(created => {
          this.dialogService.hideBlocker();
          this.router.navigate(['main/document/certificate/', created.id]);
        });
      }
    });
  }

  addAnalysisCard(assignment) {
    this.dialogService.showAnalysisCardType().subscribe(res => {
      if (res) {
        this.dialogService.showBlocker();
        this.documentService.createAnalysisCard(assignment.id, res).subscribe(created => {
          this.dialogService.hideBlocker();
          this.router.navigate(['main/document/analysis-card/', created.id]);
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  ngOnInit() {
    this.mainService.menuChange.emit({name: 'APPLICATION_VIEW'});
    this.dialogService.showBlocker();
    this.documentService.getActListForApplication(this.id).subscribe(res => {
       this.actList = res.content;
       this.actList.forEach(act => {
         this.documentService.getSignListByDocumentId(act.id).subscribe(signs => {
           this.actSign[act.id] = signs.content;
         });
       });
    });
    this.documentService.getAssignmentListByApplication(this.id).subscribe(res => {
      this.assignmentList = res.content;
      this.assignmentList.forEach(ass => {
        this.documentService.getSignListByDocumentId(ass.id).subscribe(signs => {
          this.assignmentSign[ass.id] = signs.content;
        });
      });
    });
    this.documentService.getAnalysisCardListByApplicationId(this.id).subscribe(res => {
      this.analysisCardList = res.content;
      this.analysisCardList.forEach(ass => {
        this.documentService.getSignListByDocumentId(ass.id).subscribe(signs => {
          this.analysisCardSign[ass.id] = signs.content;
        });
      });
    });
    this.documentService.getProtocolListByApplication(this.id).subscribe(res => {
      this.protocolList = res.content;
      this.protocolList.forEach(protocol => {
        this.documentService.getSignListByDocumentId(protocol.id).subscribe(signs => {
          this.protocolSign[protocol.id] = signs.content;
        });
      });
      this.dialogService.hideBlocker();
    });
    this.documentService.getCertificateListByApplicationId(this.id).subscribe(res => {
      this.certificateList = res.content;
      this.certificateList.forEach(certificate => {
        this.documentService.getSignListByDocumentId(certificate.id).subscribe(signs => {
          this.certificateSign[certificate.id] = signs.content;
        });
      });
      this.dialogService.hideBlocker();
    });
  }

}
