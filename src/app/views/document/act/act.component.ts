import { Component } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss']
})
export class ActComponent {
  id: number;
  data: any = {
  };
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router) {
      this.dialogService.showBlocker();
      this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.documentService.getActById(this.id).subscribe(res=> {
           this.data = res;
           this.mainService.actLoaded.emit(this.data);
           this.dialogService.block = false;
         });
       }
      });
  }

  ngOnInit() {

  }

  beforeSave() {
    if (this.data.agents) {
      if (this.data.agents.length > 0) {
        this.data.agents.forEach(item => {
          delete item.guid;
        });
      }
    }
  }
  save() {
    this.beforeSave();
    this.dialogService.showBlocker();
    console.log(this.data);
    this.documentService.updateAct(this.data).subscribe(res => {
      this.data = res;
      this.dialogService.hideBlocker();
      this.dialogService.showNotification('Акт сохранен');
    });

  }
}
