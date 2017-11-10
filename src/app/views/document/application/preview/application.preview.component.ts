import { Component } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { SettingsService } from '../../../../services/settings.service';
import { PartnerService } from '../../../../services/partner.service';
import { DialogService } from '../../../../services/dialog.service';
import { DocumentService } from '../../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'application-preview',
  templateUrl: './application.preview.component.html',
  styleUrls: ['./application.preview.component.scss']
})
export class ApplicationPreviewComponent {
  id: number;
  data: any = {};
  actList: Array<any> = new Array<any>();
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
    this.dialogService.showBlocker();
    this.documentService.deleteAct(act).subscribe(res => {

    this.actList.splice(this.actList.findIndex(item => item.id == act.id), 1);
    this.dialogService.hideBlocker();
    });
  }

  openAct(id) {
    this.router.navigate(['main/document/act/' + id]);
  }

  ngOnInit() {
    this.documentService.getActList().subscribe(res => {
       this.actList = res.content;
    });
  }

}
