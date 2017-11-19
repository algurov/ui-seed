import { Component } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent {
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
         this.documentService.getAssignmentById(this.id).subscribe(res=> {
           this.data = res;
           console.log(JSON.stringify(this.data));
           this.mainService.directionLoaded.emit(this.data);
           this.dialogService.block = false;
         });
       }
      });
  }

  ngOnInit() {

  }

  beforeSave() {
    // if (this.data.agents) {
    //   if (this.data.agents.length > 0) {
    //     this.data.agents.forEach(item => {
    //       delete item.guid;
    //     });
    //   }
    // }
  }
  save() {
    this.beforeSave();
    this.dialogService.showBlocker();
    console.log('toSave');
    console.log(JSON.stringify(this.data));
    this.documentService.updateAssignment(this.data).subscribe(res => {
      this.data = res;
      console.log('response');
      console.log(JSON.stringify(this.data));
      this.dialogService.hideBlocker();
      this.router.navigate(['main/document/application/' + this.data.application.id + '/view']);
      this.dialogService.showNotification('Направление сохранено');
    });

  }
}
